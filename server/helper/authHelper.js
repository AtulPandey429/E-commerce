import bcrypt from 'bcrypt';

export  const hashpassword = async(password)=>{
try {
    const saltRounds =10;
    const newPassword = await bcrypt.hash(password,saltRounds)
    return newPassword;
} catch (error) {
    console.log(error)
}
};

export const comparePassword = async(password,newPassword)=>{
    return await bcrypt.compare(password,newPassword);
}