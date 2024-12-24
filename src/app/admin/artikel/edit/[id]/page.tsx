import ArtikelEditForm from "@/app/components/admin/artikelEditForm/ArtikelEditForm"

const Edit = async (context:any)=>{
    const { id }= await context.params
    return (
        <ArtikelEditForm id={id} />
    )
}

export default Edit