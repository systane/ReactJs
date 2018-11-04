import PubSub from 'pubsub-js';

export default class HandlerError{
    publishError(err) {
        err.errors.forEach(error => {
            PubSub.publish('error-validation', error);
        });
    }
}