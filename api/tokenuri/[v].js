const TOKEN_URI = {
  name: 'WAVES BusinessCard NFT v1',
  description:
    'フリーランスWeb開発者の羽田と申します。屋号「WAVES」としてWebアプリケーションの開発スキルを提供しています。また、個人開発も行なっています。',
  image:
    'https://waves-jp.s3.ap-northeast-1.amazonaws.com/waves-business-card-v1.jpg',
  external_url: 'https://waves-jp.com',
  apiVersion: '1',
}

export default async function tokenUriV1(req, res) {
  res.status(200).json(TOKEN_URI)
}
