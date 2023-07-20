import blogFetch from "../axios/config";

export async function LoginRequest (email , password ) {
   
    try {
        const request = await blogFetch.post('login/autenticar',{email,password}) ;
       
        return request.data;

    } catch (error) {

       console.log(error);
    }
    
}