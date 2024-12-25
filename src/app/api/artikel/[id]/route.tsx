import { NextRequest, NextResponse } from "next/server";
import moment from "moment-timezone";
import artikelModel from '@/models/artikelModel'
const res = NextResponse

export async function GET(req: NextRequest, context: any) {
    const { id } = await context.params;
    try {
        const data = await artikelModel.getArtikelById(id);
        if (!data || !Array.isArray(data) || data.length === 0) {
            return res.json({
                success: false,
                message: "Artikel tidak ditemukan!",
                data: []
    
            }, {status: 404})
        }
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

export async function PATCH(req: NextRequest, context: any) {
    const tanggal = moment().tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss');
    const { id } = await context.params;
    try {
        const body = await req.json();
        if (!body.judul || !body.penulis || !body.isi) {
            return res.json({
                success: false,
                message: "Format data salah!"
            }, {status: 400})
        }

        const result = await artikelModel.updateArtikel(body, id, tanggal)
        if (result === 0) {
            return res.json({
                success: false,
                data: 'Artikel tidak ditemukan!'
    
            }, {status: 404})
        }
        return res.json({
            success: true,
            message: 'Artikel berhasil diubah',
            affectedRows: result,
            data: [{
                id: id,
                judul: body.judul,
                penulis: body.penulis,
                isi: body.isi,
                gambar: body.gambar || null,
                last_edit: tanggal
            }]
        }, {status: 200})
    } catch (error) {
        console.log(error)
        return res.json({
            success: false,
            message: 'Internal Server Error'
        }, {status: 500})
    }
}

export async function DELETE(req: NextRequest, context: any) {
    const { id } = await context.params;
    try {
        const result = await artikelModel.deleteArtikel(id)
        if (result === 0) {
            return res.json({
                success: false,
                data: 'Artikel tidak ditemukan!'
    
            }, {status: 404})
        }
        return res.json({
            success: true,
            message: 'Artikel berhasil dihapus',
            affectedRows: result,
            data: []
        }, {status: 200})
    } catch (error) {
        console.log(error)
        return res.json({
            success: false,
            message: 'Internal Server Error'
        }, {status: 500})
    }
}