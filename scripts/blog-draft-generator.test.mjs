import assert from 'node:assert/strict'
import test from 'node:test'

import {
  buildContentId,
  buildMicrocmsDraftUrl,
  escapeHtml,
  loadConfig,
  main,
  renderBody,
  validateDraft,
} from './blog-draft-generator.mjs'

const categories = [{ id: 'ai', name: 'AI活用' }]
const searchedUrls = new Set([
  'https://example.com/source-1',
  'https://example.com/source-2',
  'https://example.com/source-3',
])

function sampleDraft() {
  return {
    title: '企業のAI導入を成功させるための実践ガイド',
    description:
      'AI導入を検討する企業向けに、目的設定、検証、運用設計、社内定着までの進め方を、複数の公開情報の調査結果に基づいて実務的かつ具体的に整理します。',
    categoryId: 'ai',
    sections: [1, 2, 3].map((number) => ({
      heading: `セクション${number}`,
      paragraphs: [{ text: `検証済みの説明${number}`, citations: [number] }],
      bullets: [],
    })),
    sources: [1, 2, 3].map((number) => ({
      title: `資料${number}`,
      url: `https://example.com/source-${number}`,
      publisher: 'Example Organization',
      publishedDate: '2026-07-01',
    })),
    verificationNotes: [
      { claim: '検証対象の主張', result: '公開資料と一致', sourceNumbers: [1] },
    ],
    editorialWarnings: [],
  }
}

test('loadConfigは安全な既定値を使う', () => {
  const config = loadConfig({
    LINEAR_API_KEY: 'linear-key',
    OPENAI_API_KEY: 'openai-key',
    MICROCMS_SERVICE_DOMAIN: 'waves',
    MICROCMS_WRITE_API_KEY: 'microcms-key',
  })

  assert.equal(config.openaiModel, 'gpt-5.6-luna')
  assert.equal(config.linearWorkspaceName, 'WAVES')
  assert.equal(config.linearSourceStateName, 'Todo')
  assert.equal(config.linearReviewStateName, 'In Review')
  assert.equal(config.microcmsBlogEndpoint, 'blogs')
  assert.equal(config.dryRun, false)
})

test('microCMS URLには必ずdraftステータスが入る', () => {
  const url = buildMicrocmsDraftUrl(
    {
      microcmsServiceDomain: 'waves',
      microcmsBlogEndpoint: 'blogs',
    },
    'enterprise-ai-wav-123',
  )

  assert.equal(url.searchParams.get('status'), 'draft')
  assert.equal(url.pathname, '/api/v1/blogs/enterprise-ai-wav-123')
})

test('content IDはLinear識別子から決定的に生成する', () => {
  assert.equal(buildContentId('WAV-123'), 'linear-wav-123')
})

test('モデル出力由来の文字列はHTMLとしてエスケープされる', () => {
  assert.equal(
    escapeHtml('<script>alert("x")</script>'),
    '&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt;',
  )

  const draft = sampleDraft()
  draft.sections[0].paragraphs[0].text = '<img src=x onerror=alert(1)>'
  const body = renderBody(draft)

  assert.doesNotMatch(body, /<img\b/)
  assert.match(body, /&lt;img src=x onerror=alert\(1\)&gt;/)
  assert.match(body, /<h2 id="references">参考資料<\/h2>/)
})

test('Web Searchで取得していないURLを含む下書きは拒否する', () => {
  const draft = sampleDraft()
  draft.sources[2].url = 'https://unverified.example/source'

  assert.throws(
    () =>
      validateDraft(draft, categories, {
        urls: searchedUrls,
        webSearchCallCount: 1,
      }),
    /Web Searchの取得結果/,
  )
})

test('検証済みの構造化下書きを受け入れる', () => {
  assert.doesNotThrow(() =>
    validateDraft(sampleDraft(), categories, {
      urls: searchedUrls,
      webSearchCallCount: 1,
    }),
  )
})

test('箇条書きだけで構成された節を受け入れる', () => {
  const draft = sampleDraft()
  draft.sections[1].paragraphs = []
  draft.sections[1].bullets = [
    { text: '検証済みの箇条書きによる説明', citations: [2] },
  ]

  assert.doesNotThrow(() =>
    validateDraft(draft, categories, {
      urls: searchedUrls,
      webSearchCallCount: 1,
    }),
  )
})

test('一連の処理はmicroCMSへdraftの新規作成だけを行う', async () => {
  const originalFetch = globalThis.fetch
  const originalEnv = { ...process.env }
  const calls = []
  let createdContentId = ''

  Object.assign(process.env, {
    LINEAR_API_KEY: 'linear-key',
    LINEAR_WORKSPACE_NAME: 'WAVES',
    LINEAR_PROJECT_NAME: 'コンサル立ち上げ',
    LINEAR_POST_LABEL: 'post',
    LINEAR_SOURCE_STATE_NAME: 'Todo',
    LINEAR_REVIEW_STATE_NAME: 'In Review',
    OPENAI_API_KEY: 'openai-key',
    OPENAI_MODEL: 'gpt-5.6-luna',
    MICROCMS_SERVICE_DOMAIN: 'waves',
    MICROCMS_WRITE_API_KEY: 'microcms-key',
    DRY_RUN: 'false',
  })
  delete process.env.ISSUE_IDENTIFIER
  delete process.env.GITHUB_OUTPUT
  delete process.env.GITHUB_STEP_SUMMARY

  globalThis.fetch = async (input, init = {}) => {
    const url = new URL(input)
    const method = init.method || 'GET'
    calls.push({ url, method, body: init.body })

    if (url.href === 'https://api.linear.app/graphql') {
      const request = JSON.parse(init.body)
      if (request.operationName === 'BlogReviewState') {
        return Response.json({
          data: {
            team: {
              states: {
                nodes: [
                  { id: 'review-state-id', name: 'In Review', type: 'started' },
                ],
              },
            },
          },
        })
      }
      if (request.operationName === 'MoveBlogIssueToReview') {
        return Response.json({
          data: {
            issueUpdate: {
              success: true,
              issue: {
                id: 'linear-internal-id',
                identifier: 'WAV-123',
                state: { id: 'review-state-id', name: 'In Review' },
              },
            },
          },
        })
      }
      assert.equal(request.operationName, 'BlogSourceIssues')
      assert.equal(request.variables.sourceStateName, 'Todo')
      return Response.json({
        data: {
          organization: { name: 'WAVES' },
          issues: {
            nodes: [
              {
                id: 'linear-internal-id',
                identifier: 'WAV-123',
                title: 'AI導入の進め方を整理する',
                description:
                  '企業がAI導入を進める際の目的設定、検証、運用設計、社内定着の論点を具体的に整理するための十分な長さの原案です。',
                url: 'https://linear.app/waves/issue/WAV-123',
                createdAt: '2026-07-01T00:00:00Z',
                updatedAt: '2026-07-02T00:00:00Z',
                project: { name: 'コンサル立ち上げ' },
                state: { name: 'Todo', type: 'unstarted' },
                team: { id: 'team-id', name: 'WAVES Team' },
                labels: { nodes: [{ name: 'post' }] },
                comments: { nodes: [] },
              },
            ],
            pageInfo: { hasNextPage: false, endCursor: null },
          },
        },
      })
    }

    if (url.href === 'https://api.openai.com/v1/responses') {
      const draft = sampleDraft()
      return Response.json({
        status: 'completed',
        output: [
          {
            type: 'web_search_call',
            action: {
              sources: draft.sources.map(({ url: sourceUrl }) => ({
                type: 'url',
                url: sourceUrl,
              })),
            },
          },
          {
            type: 'message',
            content: [{ type: 'output_text', text: JSON.stringify(draft) }],
          },
        ],
      })
    }

    if (url.hostname === 'waves.microcms.io') {
      if (url.pathname === '/api/v1/categories') {
        return Response.json({ contents: categories })
      }
      if (url.pathname === '/api/v1/blogs' && method === 'GET') {
        return Response.json({ contents: [], totalCount: 0 })
      }
      if (url.pathname.startsWith('/api/v1/blogs/') && method === 'PUT') {
        assert.equal(url.searchParams.get('status'), 'draft')
        const content = JSON.parse(init.body)
        assert.deepEqual(Object.keys(content).sort(), [
          'body',
          'category',
          'description',
          'title',
        ])
        assert.equal('publishedAt' in content, false)
        createdContentId = decodeURIComponent(url.pathname.split('/').at(-1))
        return Response.json({ id: createdContentId }, { status: 201 })
      }
      if (url.pathname.startsWith('/api/v1/blogs/') && method === 'GET') {
        if (!createdContentId) {
          return Response.json({ message: 'Not found' }, { status: 404 })
        }
        return Response.json({ id: createdContentId })
      }
    }

    return Response.json({ message: 'unexpected request' }, { status: 500 })
  }

  try {
    await main()
    assert.equal(createdContentId, 'linear-wav-123')
    const microcmsMutations = calls.filter(
      ({ url, method }) =>
        url.hostname === 'waves.microcms.io' && method !== 'GET',
    )
    assert.deepEqual(
      microcmsMutations.map(({ method, url }) => [
        method,
        url.searchParams.get('status'),
      ]),
      [['PUT', 'draft']],
    )
    const linearUpdate = calls.find(({ body }) =>
      body?.includes('MoveBlogIssueToReview'),
    )
    assert.ok(linearUpdate)
  } finally {
    globalThis.fetch = originalFetch
    for (const key of Object.keys(process.env)) {
      if (!(key in originalEnv)) delete process.env[key]
    }
    Object.assign(process.env, originalEnv)
  }
})
