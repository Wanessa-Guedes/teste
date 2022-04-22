import chalk from "chalk";
import express from "express";
import cors from "cors";

const app = express();
// Para receber objetos pelas requisições
app.use(express.json());
app.use(cors());

// Inicializando as variáveis
const Porta = 5000;
const usersInfo = [];
const infoTweets = [];
const tweets = [{
	username: "bobesponja",
	avatar: "https://s2.glbimg.com/1zleL_SY-4k9yhi9iFGuH1FsSmM=/e.glbimg.com/og/ed/f/original/2020/06/17/bobesponja_EqE9Kg7.jpg",
    tweet: "eu amo o hub",
}];
let userAvatar;
let indexSlice = 1;;

// Post de sign up
app.post("/sign-up", (req, res) =>{
    const {username, avatar} = req.body; // será um objeto 
    const userInfo = {
        username,
        avatar
    };
    usersInfo.push(userInfo);
    userAvatar = usersInfo.find(el => el.username == userInfo.username)
    res.send(userInfo);
})

// Post de Tweet
app.post("/tweets", (req, res) =>{
    const {username, tweet} = req.body; 
    const infoTweet = {
        username, 
        tweet
    }; 
    infoTweets.push(infoTweet);
    tweets.push({username, avatar:userAvatar.avatar, tweet})
    res.send(infoTweet);
})

// Get dos Tweets
app.get("/tweets", (req, res) =>{

    if(tweets.length > 10){
        res.send(tweets.slice(indexSlice));
        indexSlice++;
    } else {
        res.send(tweets);
    }
})

app.listen(Porta, () =>{
    console.log(chalk.green.bold(`Back-end on na porta ${Porta}`));
})