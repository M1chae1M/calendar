import nodemailer from 'nodemailer'

const sendMail=(mailTo,mail_message)=>{
    const {MAIL_login, MAIL_password}=process.env??''
    const transporter = nodemailer.createTransport({
        host:'smtp.wp.pl',
        port:465,
        secure:true,
        auth:{
            user:MAIL_login,
            pass:MAIL_password,
        }
    })
    const mailOptions={
        from:MAIL_login,
        to:mailTo,
        subject:mail_message?.subject??'',
        text:mail_message?.text??'',
    };
      
    transporter.sendMail(mailOptions, (error, info) => {
        if(error) console.log('Błąd wysyłania e-mailad:' + error);
        else console.log('E-mail został wysłanyd:' + info.response);
    })
}

export default sendMail