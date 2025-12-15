import axios from 'axios';
import dotenv from 'dotenv';
import { env } from '../../env';

dotenv.config();

interface Response {
    'user': {
        name: string;
        playcount: number;
        registered: {
            unixtime: string
        };
        url: string;
        image: {
            size: string,
            '#text': string
        }[]
    }
}

interface User {
    username: string;
    playcounts: number;
    profileUrl: string;
    image: string;
    registeredAt: Date;
}

const BASE_URL = 'http://ws.audioscrobbler.com/2.0/';
const user = 'T4RG'

getUserInfos(user)

export async function getUserInfos(username: string){
    try {
        const response = await axios.get<Response>(BASE_URL, {
            params: {
                method: 'user.getInfo',
                user: username,
                api_key: env.LASTFM_API_KEY,
                format: 'json'
            }
        });

        const rawData = response.data.user;

        const cover = rawData.image.find(img => img.size === 'extralarge')?.['#text'] || '';

        const userInfos: User = {
            username: rawData.name,
            playcounts: Number(rawData.playcount),
            profileUrl: rawData.url,
            image: cover,
            registeredAt: new Date(parseInt(rawData.registered.unixtime) * 1000)

        }

        return userInfos

    } catch(error){
        console.error("Erro ao acessar informações: ", error);
        return []
    }
}