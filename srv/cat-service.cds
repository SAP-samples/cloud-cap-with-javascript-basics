using { sap.capire.bookshop as my } from '../db/schema';

@protocol: [
  'odata-v4',
  'graphql'
]
service CatalogService {

  /** For displaying lists of Books */
  @readonly entity ListOfBooks as projection on Books
  excluding { descr };

  @readonly entity Books as projection on my.Books { *,
    author.name as author
  } excluding { createdBy, modifiedBy };

  @requires: 'authenticated-user'
  action submitOrder ( book: Books:ID, quantity: Integer ) returns { stock: Integer };
  event OrderedBook : { book: Books:ID; quantity: Integer; buyer: String };
}
