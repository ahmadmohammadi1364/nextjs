import { MongoClient } from 'mongodb';

async function handler(req, res){

    const eventId = req.query.eventId;

    
    const client = await MongoClient.connect('mongodb+srv://pistachannel:mRzKsrR70btQ1drg@cluster0.4zy8s.mongodb.net/?retryWrites=true&w=majority')

    if(req.method === 'POST') {
        const { email, name, text } = req.body;

        if(
            !email.include('@') ||
            !name ||
            name.trim() === '' ||
            !text ||
            text.trim() === ''
        ) {
            res.status(422).json({ message: 'Invalid input.' });
            return;
        }

        const newComment = {
            email,
            name,
            text,
            eventId
        };

        const db = client.db('events');

        const result  = await db.collection('comments').insertOne(newComment);

        console.log(result)
        console.log('finish')

        res.status(201).json({ message: 'Added comment!', comment: newComment})

    }
    if(req.method === 'GET') {
        const dummyList = [
            { id: 'c1', name: 'Hamed', text: 'Hamed Comment'},
            { id: 'c2', name: 'Sara', text: 'Sara Comment'},
        ];

        res.status(200).json({ comments: dummyList });
    }

    client.close();
}


export default handler;