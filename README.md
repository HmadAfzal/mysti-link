# MystyLink

MystyLink is a mysterious messaging application that allows users to send and receive messages anonymously through generated links. Users can sign up or log in to the platform, get a unique link, and share it with others. The recipients can use this link to send messages back to the sender, including AI-generated messages, while maintaining sender's Identity. 

![App SS](/public/home.png)
## Features

- **User Authentication 🎃**: Users can sign up or log in to the platform securely.
- **Account verification 🔐**: Users can verify their account through email.
- **Unique Links 🔗**: Each user receives a unique link that can be shared with others for messaging.
- **Anonymous Messaging 👓**: Recipients can send messages anonymously using the provided link.
- **AI-Generated Messages 🤖**: Users can choose to send AI-generated messages.
- **Message Viewing 👀**: Senders can view received messages, but the sender's identity remains anonymous to the receiver.
  
## Getting Started

To get started with MystyLink, follow these steps:

1. Clone this repository to your local machine.
2. Install the necessary dependencies using `npm install`.
3. Set up your database and environment variables.
4. Run the application using `npm run dev`.
5. Access the application through `http://localhost:3000/`.

## Technologies Used

- **Frontend**: shadcn/ui, Tailwind-Css
- **Backend**:Next.js
- **Database**: MongoDB
- **Authentication**: NextAuth
- **Email verification**: resend.com
- **AI**: Verce/Ai

### Setup .env file

```js
NEXTAUTH_SECRET=''
MONGODB_URI=''
RESEND_API_KEY=''
OPENAI_API_KEY=''
```


![App SS](/public/signup.png)
![App SS](/public/verify.png)
![App SS](/public/dashboard.png)
![App SS](/public/publiclink.png)