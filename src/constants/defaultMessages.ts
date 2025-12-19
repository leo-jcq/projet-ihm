export interface SendedMessage {
    id: number;
    text?: string;
    image?: string;
    time: string;
    sendByUser: boolean;
}

const DEFAULT_MESSAGES: SendedMessage[] = [
    {
        id: 1,
        text: 'Salut ! Tu es dispo pour une session demain après-midi ?',
        time: '14:32',
        sendByUser: false
    },
    {
        id: 2,
        text: "J'ai vu qu'Arkose Nation a renouvelé les blocs",
        time: '14:32',
        sendByUser: false
    },
    {
        id: 3,
        text: 'Hello ! Oui carrément 👍',
        time: '14:35',
        sendByUser: true
    },
    {
        id: 4,
        text: 'Vers quelle heure tu pensais ?',
        time: '14:35',
        sendByUser: true
    },
    {
        id: 5,
        text: '15h ça te va ?',
        time: '14:36',
        sendByUser: false
    },
    {
        id: 6,
        text: 'Parfait pour moi !',
        time: '14:38',
        sendByUser: true
    },
    {
        id: 7,
        text: "On se retrouve à l'entrée",
        time: '14:38',
        sendByUser: true
    },
    {
        id: 8,
        text: "Au fait j'ai vu que t'avais passé Big Boss sur ton post",
        time: '14:39',
        sendByUser: true
    },
    {
        id: 9,
        text: 'Bravo ! 🔥',
        time: '14:39',
        sendByUser: true
    },
    {
        id: 10,
        text: 'Merci !!',
        time: '14:42',
        sendByUser: false
    },
    {
        id: 11,
        text: "Ça m'a pris 8 essais",
        time: '14:42',
        sendByUser: false
    },
    {
        id: 12,
        text: 'Mais ça valait le coup 😅',
        time: '14:42',
        sendByUser: false
    },
    {
        id: 13,
        text: 'Tu pourras me montrer la beta demain ?',
        time: '14:43',
        sendByUser: true
    },
    {
        id: 14,
        text: 'Je galère sur le crux',
        time: '14:43',
        sendByUser: true
    },
    {
        id: 15,
        text: 'Avec plaisir !',
        time: '14:45',
        sendByUser: false
    },
    {
        id: 16,
        text: "Le secret c'est le placement du pied gauche sur la volume",
        time: '14:45',
        sendByUser: false
    },
    {
        id: 17,
        text: "Après c'est plus facile",
        time: '14:45',
        sendByUser: false
    },
    {
        id: 18,
        text: 'Ah ok merci pour le tip !',
        time: '14:46',
        sendByUser: true
    },
    {
        id: 19,
        text: 'À demain alors 👍',
        time: '14:46',
        sendByUser: true
    },
    {
        id: 20,
        text: 'À demain !',
        time: '14:47',
        sendByUser: false
    }
];

export default DEFAULT_MESSAGES;
