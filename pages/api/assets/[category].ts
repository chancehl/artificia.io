// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import { S3Client, ListObjectsCommand } from '@aws-sdk/client-s3'

type Data = {
    assets: any[]
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    const { category } = req.query

    const client = new S3Client({
        region: 'us-west-2',
        credentials: {
            accessKeyId: process.env.ACCESS_KEY_ID as string,
            secretAccessKey: process.env.SECRET_ACCESS_KEY as string,
        },
    })

    const data = await client.send(
        new ListObjectsCommand({
            Bucket: 'artificia.io',
            Prefix: category as string,
        }),
    )

    const filteredData = data.Contents?.filter((object) => {
        if (object.Key) {
            return /\.(jpg|png)/.test(object.Key)
        }

        return false
    })

    res.status(200).json({ assets: filteredData ?? [] })
}
