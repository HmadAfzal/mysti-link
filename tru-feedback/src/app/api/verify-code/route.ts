import DBconnect from "@/lib/DBconnection";
import UserModel from "@/Models/User";

export async function POST(request:Request) {
   await DBconnect();

    try {
        
const {username, code}=await request.json();
let decodedUser=decodeURIComponent(username);
let user=await UserModel.findOne({username:decodedUser});
if(!user){
    return Response.json({
        success:false,
        message:'user with this username not found'
      },{status:500})
}

const isCodeValid= user.verifyCode === code ;
const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date();
if(isCodeValid && isCodeNotExpired){
    user.isVerified=true;
    await user.save();
    return Response.json({
        success:true,
        message:'account verified successfully'
      },{status:200})
} else if( !isCodeNotExpired){
    return Response.json({
        success:false,
        message:'verify code expired. please signup again to get a new code'
      },{status:400})
}else{
    return Response.json({
        success:false,
        message:'incorrect verification code'
      },{status:400})
}


    } catch (error) {
        console.log('error verifying code', error);
        return Response.json({
          success:false,
          message:'error verifying code'
        })
    
    }


}