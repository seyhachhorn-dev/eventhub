
const API_URL = import.meta.env.VITE_BASE_URL;

const deleteEventById = async (eventId:number):Promise<void> =>{

    const res = await fetch(`${API_URL}events/${eventId}`,{
        method: 'DELETE',
    })

    if(!res){
        throw new Error('fail to delete')
    }
}

export default deleteEventById