
export const sendMessage=async(req,res)=>{
    
try {
    const{message}=req.body;
    const {id}=req.params;
    

    console.log("message sent")
    
} catch (error) {

    sonsole.log("Error in send message contolelr",error.nessage)
    res.status(500).json({error:"Internal server error"});
}
}