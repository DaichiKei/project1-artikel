import { NextRequest, NextResponse } from "next/server";
import moment from "moment-timezone";
import artikelModel from '@/models/artikelModel'
const res = NextResponse

export async function GET() {
    try {
        const data = await artikelModel.getAllArtikel();
        return res.json({
            success: true,
            data: data
        }, {status: 200})
    } catch (error) {
        console.log(error)
        return res.json({
            success: false,
            message: 'Internal Server Error'
        }, {status: 500})
    }
}

export async function POST(req: NextRequest) {
    const tanggal = moment().tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss');
    try {
        const body = await req.json();
        if (!body.judul || !body.penulis || !body.isi) {
            return res.json({
                success: false,
                message: "Format data salah!"
            }, {status: 400})
        }

        const result = await artikelModel.createArtikel(body, tanggal)
        return res.json({
            success: true,
            data: [{
                id: result,
                judul: body.judul,
                penulis: body.penulis,
                isi: body.isi,
                tanggal: tanggal,
                gambar: body.gambar || null
            }, {status: 200}]
        })
    } catch (error) {
        console.log(error)
        return res.json({
            success: false,
            message: 'Internal Server Error'
        }, {status: 500})
    }
}
