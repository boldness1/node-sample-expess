const {User} = require('../../models');
const { Expo } = require('expo-server-sdk')

 async function addUser(name,email,password,company){

    try{
        const userExists = await User.findOne({
            where: {
                email: email
            },
        });

        if(userExists){
            return {
                error:true,
                message:'User already exists!'

            };
        }

    }catch (err){
        console.log(err);
    }

    try{

        const user =  await User.create({name,email,password,company})

        return {
            success:true,
            message:'User created successfully',
            user:user
        }
    }catch (err){
        console.log(err);
    }
}

async function pushNotification(user_id){
    const user = await User.findOne({
        where: {
            id: user_id
        },
    });


    let expo = new Expo({ accessToken: process.env.EXPO_ACCESS_TOKEN });
    let messages = [];

    messages.push({
        to: user.expoToken,
        sound: 'default',
        body: 'This is a test notification'
        // data: { withSome: 'data' },
    })

    let chunks = expo.chunkPushNotifications(messages);
    // let tickets = [];
    await (async () => {
        // Send the chunks to the Expo push notification service. There are
        // different strategies you could use. A simple one is to send one chunk at a
        // time, which nicely spreads the load out over time:
        for (let chunk of chunks) {
            try {
                let ticketChunk = await expo.sendPushNotificationsAsync(chunk);

                // tickets.push(...ticketChunk);

                // NOTE: If a ticket contains an error code in ticket.details.error, you
                // must handle it appropriately. The error codes are listed in the Expo
                // documentation:
                // https://docs.expo.io/push-notifications/sending-notifications/#individual-errors

            } catch (error) {
                console.error(error);
            }
        }

    })();

    return {
        success:true,
        message:'notification Sent...',
        data:chunks
    }

    // let receiptIds = [];
    // for (let ticket of tickets) {
    //     // NOTE: Not all tickets have IDs; for example, tickets for notifications
    //     // that could not be enqueued will have error information and no receipt ID.
    //     if (ticket.id) {
    //         receiptIds.push(ticket.id);
    //     }
    // }
    //
    //  expo.chunkPushNotificationReceiptIds(receiptIds);

    // await (async () => {
    //     // Like sending notifications, there are different strategies you could use
    //     // to retrieve batches of receipts from the Expo service.
    //     for (let chunk of receiptIdChunks) {
    //         try {
    //             let receipts = await expo.getPushNotificationReceiptsAsync(chunk);
    //             console.log(receipts);
    //
    //             // The receipts specify whether Apple or Google successfully received the
    //             // notification and information about an error, if one occurred.
    //
    //             // for (let receiptId in receipts) {
    //             //     console.log(receipts, )
    //             //     let {status, message, details} = receipts[receiptId];
    //             //     if (status === 'ok') {
    //             //         continue;
    //             //     } else if (status === 'error') {
    //             //         console.error(
    //             //             `There was an error sending a notification: ${message}`
    //             //         );
    //             //         if (details && details.error) {
    //             //             // The error codes are listed in the Expo documentation:
    //             //             // https://docs.expo.io/push-notifications/sending-notifications/#individual-errors
    //             //             // You must handle the errors appropriately.
    //             //             console.error(`The error code is ${details.error}`);
    //             //         }
    //             //     }
    //             // }
    //         } catch (error) {
    //             console.error(error);
    //         }
    //     }
    // })();
}
 



module.exports = {addUser, pushNotification}