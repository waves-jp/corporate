const TOKEN_URI = {
  name: 'WAVES BusinessCard NFT v1',
  description:
    'フリーランスWeb開発者の羽田と申します。屋号「WAVES」としてWebアプリケーションの開発スキルを提供しています。また、個人開発も行なっています。',
  image: '',
  site: 'https://waves-jp.com',
}

export default async function tokenUriV1(req, res) {
  res.status(200).json(TOKEN_URI)
}
