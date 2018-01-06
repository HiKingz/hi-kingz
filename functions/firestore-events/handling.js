const functions = require('firebase-functions');

const EventTypes = require('./types');


exports.EventHandler = class {
  onCreate(event) {}
  onUpdate(event) {}
  onDelete(event) {}
  static get supportedEventTypes() {}
  static get firestoreDocumentReference() {}
};

exports.FirestoreEventManager = class {
  static attachEventHandlerFunctionsToExportsObject(entityName, eventHandlerClass, exportObject) {
    const eventHandler = new eventHandlerClass();
    const firestoreDocument = functions.firestore.document(eventHandlerClass.firestoreDocumentReference);
    const handlerFunctionBaseName = 'on' + entityName;

    if (eventHandlerClass.supportedEventTypes.indexOf(EventTypes.CREATE) !== -1) {
      exportObject[handlerFunctionBaseName + EventTypes.CREATE] = firestoreDocument.onCreate(
        event => eventHandler.onCreate(event)
      );
    }
    if (eventHandlerClass.supportedEventTypes.indexOf(EventTypes.UPDATE) !== -1) {
      exportObject[handlerFunctionBaseName + EventTypes.UPDATE] = firestoreDocument.onUpdate(
        event => eventHandler.onUpdate(event)
      );
    }
    if (eventHandlerClass.supportedEventTypes.indexOf(EventTypes.DELETE) !== -1) {
      exportObject[handlerFunctionBaseName + EventTypes.DELETE] = firestoreDocument.onDelete(
        event => eventHandler.onDelete(event)
      );
    }
  }
};