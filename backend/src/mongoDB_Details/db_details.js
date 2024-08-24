/*
1. db.collection.find()
The find() method in MongoDB is one of the most commonly used methods to retrieve documents from a collection. It allows you to query a collection and return documents that match a given criteria(filter). It is powerful and flexible, supporting complex queries and projections.

Key Features of find()
1. Querying: You can specify criteria to filter the documents based on fields and value.
2. Projection: You can control which fields should be included or excluded in the returned documents.
3. Cursor: It returns a cursor, allowing you to iterate over large database efficiently.
4. Options: You can apply options like sorting, limiting and skipping documents

db.collection.find(query, projection)
a. query: The filter criteria for matching documents. It is an object where you specify the conditions.
b. projection: Optional! Specifies which fields to include or exclude in the returned documents.

Example 1: Basic Usage of find(): Suppose you have a users collection with the following documents.
users:
[
  { "_id": 1, "name": "Alice", "age": 25, "city": "New York" },
  { "_id": 2, "name": "Bob", "age": 30, "city": "San Francisco" },
  { "_id": 3, "name": "Charlie", "age": 35, "city": "New York" },
  { "_id": 4, "name": "David", "age": 40, "city": "Chicago" }
]
1. Retrieve All Documents: db.users.find({})
Ans: json->
[
  { "_id": 1, "name": "Alice", "age": 25, "city": "New York" },
  { "_id": 2, "name": "Bob", "age": 30, "city": "San Francisco" },
  { "_id": 3, "name": "Charlie", "age": 35, "city": "New York" },
  { "_id": 4, "name": "David", "age": 40, "city": "Chicago" }
]
Example 2: Using Query Filters
2. Find Document/Documents with a Specific Conditions: db.users.find({city: "Dhaka"})
Ans: json->
[
  { "_id": 1, "name": "Alice", "age": 25, "city": "New York" },
  { "_id": 3, "name": "Charlie", "age": 35, "city": "New York" }
]

Example 3: Projection
1. Retrieve Only Specific Fields: db.users.find({}, {name: 1, city: 1, _id: 0})
// To retrieve only the name and the city fields but not id for all users
Ans: json->
[
  { "name": "Alice", "city": "New York" },
  { "name": "Bob", "city": "San Francisco" },
  { "name": "Charlie", "city": "New York" },
  { "name": "David", "city": "Chicago" }
]
// Here, {_id: 0} excludes the _id field from the output

Example 4: Combining Query and Projection
// Find and Project
1. To find users aged 30 or more and show only their names: db.users.find({age: {$gte: 30}}, {name: 1, _id: 0})
Ans: json->
[
  { "name": "Bob" },
  { "name": "Charlie" },
  { "name": "David" }
]
// query: {age: {$gte: 30}} filters users with age greater than or equal to 30
// projection: {name: 1, _id: 0} returns only the name field

Example 5: Using find() with Sorting, Limiting and Skipping
1. Sorting: db.users.find().sort({age: -1})
// To sort the results by age in descending order
Ans: json->
[
  {_id: 4, name: 'David', age: 40, city: 'Chicago'},
  {_id: 3, name: 'Charlie', age: 35, city: 'New York'},
  {_id: 2, name: 'Bob', age: 30, city: 'San Francisco'},
  {_id: 1, name: 'Alice', age: 25, city: 'New York'}
]
2. Limiting: db.users.find().limit(2)
// To limit the result to first two documents
Ans: json->
[
  {_id: 1, name: 'Alice', age: 25, city: 'New York'}
  {_id: 2, name: 'Bob', age: 30, city: 'San Francisco'},
]
3. Skipping: db.users.find().skip(2)
// To skip the first 2 documents and return the rest
Ans: json->
[
  {_id: 3, name: 'Charlie', age: 35, city: 'New York'},
  {_id: 4, name: 'David', age: 40, city: 'Chicago'},
]

Why Use find()?
1. Retrieving Data: It is primary method for fetching data from MongoDB. Whether you need all documents, specific ones, or documents matching certain criteria, find() is your go-to-method.
2. Filtering Data: The ability to filter documents based on specific conditions is powerful for targeting the exact data you need.
3. Efficient Handling of Large Datasets: Since find() returns a cursor, it allows you to work efficienty with large datasets without loading all documents into memory at once.
4. Versatility: It supports a wide range of operations, including sorting, limiting, skipping, and projection, making it very flexible for different use cases.
*/

/*
2. db.collection.findOne()
The findOne() method in MongoDB is used to retrieve a single document from a collection that matches the specific query criteria. Unlike find(), which returns a cursor to a set of documents, findOne() immediately returns the first document that matches the query(or null if no document matches).

Key Features of findOne():
1. Returns a Single Document: findOne() is  designed to return exactly one document. If multiple documents match the query, only the first matching document(based on the natural order of the collection) is returned.
2. Simpler Syntax: Since it returns a single document, you do not need to work with a cursor. This makes findOne() a simpler and more convenient option when you know that you only need a single document.
3. Efficient For Single Document Retrieval: When you only need one document, findOne() can be more efficient than find() because it stops searching once it finds the first matching document.
4. Projection Support: Like find(), findOne() allows you to specify a projection to control which fields are returned in the document.

db.collection.findOne(query, projection)
Suppose you have a users collection with the following documents:
users: 
[
  { "_id": 1, "name": "Alice", "age": 25, "city": "New York" },
  { "_id": 2, "name": "Bob", "age": 30, "city": "San Francisco" },
  { "_id": 3, "name": "Charlie", "age": 35, "city": "New York" },
  { "_id": 4, "name": "David", "age": 40, "city": "Chicago" }
]
Example 1: Basic Usage: db.users.findOne({city: "New York"});
// To find the first user who lives in "New York",
Ans: json->
{ "_id": 1, "name": "Alice", "age": 25, "city": "New York" }
Example 2: Using Projections: db.users.findOne({city: "San Francisco"}, {name: 1, age: 1, _id: 0})
// You can also use findOne() with a projection to return only specific fields. For example, to find the first user from "San Francisco" and return only the name and the age fields
Ans: json-> 
{ "name": "Bob", "age": 30 }

Use Cases for findOne()
1. Retrieving a Specific Document by Unique Key: db.users.findOne({_id: 1})
a. If you are querying by a field that is unique(e.g. _id or another unique identifier), you expect only one document to match. In this case, findOne() is ideal beccause you only need a single document.
Ans: json->
  { "_id": 1, "name": "Alice", "age": 25, "city": "New York" },

2. Fetching a Configuration or Metadata Document: db.config.findOne({setting: "siteName"})
a. Often, you might store configuration settings or metadata as a single document in a collection. Using findOne() is a quick way to retrieve this document without worrying about multiple results.
3. When Only One Result Matters: db.orders.findOne({status: "pending"})
a. If you only care about the first matching document, and it does not matter if there are other matches, findOne() is the most straightforward option.
4. Checking for Existence:
a. findOne() can be used to check if a document exists with a certain condition. It it returns null, you know that no matching document exists.
const user = db.users.findOne({ email: "example@example.com" });
if (user) {
  // user exists
} else {
  // user doesn't exist
}

Comparison: findOne() vs find()
1. Return Value:-
a. findOne(): Returns a single document or null
b. find(): Returns a cursor to a set of documents
2. When to Use:-
a. findOne(): Use when you expect or only need a single document from your query
b. find(): Use when you need multiple documents or need to iterate over a larger set of results
3. Efficiency:-
a. findOne(): Stops searching as soon as it finds the first matching document, which can be more efficient in some cases
b. find(): Continues searching through the collection to retrieve all matching documents

* Retrieving a Single Document by Unique Field: db.users.findOne({email: "alice@example.com"})
Ans: This will return the document for the user with that email address. Since emails are unique, you know that there will only be one matching document, making findOne() the ideal mathod.
*/

/*
3. Model.findById()
The findById() method in MongoDB (commonly used through the Mongoose ODM in Node.js) is a specialized method for retrieving a single document by its unique_id field. This method simplifies the process of querying documents by their _id by automatically constructing the query and returning the document that matches the given ID.

When to Use findById()
1. Retrieving Documents by _id: The primary use case for findById() is when you need to fetch a document using its _id field, which is the unique identifier MongoDB assigns to each document.
2. Convenience and Readability: Instead of constructing a query manually with findOne({_id: id}), findById() privides a more convenient and readable way to achieve the same result.
3. Validation of ID Format: Mongoose's findById() automatically checks if the provided ID is valid(i.e. a valid MongoDB ObjectId). If the ID is not valid, it will not attempt to query the database, saving unnecessary operations.

In mongoose(a popular MongoDB ODM for Node.j), the syntax is:
Model.findById(id, [projection], [options])
a. Id: The _id of the document you want to retrieve.
b. Projection: Optional, specifies which fields to include or exclude in the returned document.
c. Options: Optional, additional options for the query.

Example Usage:
1. Suppose you have a users collection with documents like:
users: 
[
  { "_id": ObjectId("64f13cfd4523e9eacbf0d491"), "name": "Alice", "age": 25 },
  { "_id": ObjectId("64f13cfd4523e9eacbf0d492"), "name": "Bob", "age": 30 }
]

Example 1: Basic Usage of findById()
// To retriev the user with a specific _id, you can use:
const userId = "64f13cfd4523e9eacbf0d491"; // The _id of Alice
User.findById(userId, (err, user) => {
  if (err) {
    console.error(err);
  } else {
    console.log(user);
  }
});
Ans: json->
{ "_id": ObjectId("64f13cfd4523e9eacbf0d491"), "name": "Alice", "age": 25 }

Example 2: Using findById() with Projections
// If you only want to retrieve certain fields, like name and exclude _id, you can use projections:
User.findById(userId, { name: 1, _id: 0 }, (err, user) => {
  if (err) {
    console.error(err);
  } else {
    console.log(user); // Output: { "name": "Alice" }
  }
});

Differences Between findById() and Other Methods
1. findOne({_id: id}) vs findById(id)
a. Both methods can be used to retrieve a document by its _id, but findById() is a more concise and readable way to do it.
b. findById() automatically handles ObjectId conversion and validation, while with findOne(), you need to manually ensure that the _id is correctly formatted.
2. find() vs findById()
a. find() returns a cursor (or an array of documents) and is used for retrieving multiple documents.
b. findById() returns a single document or null if no document matches the given _id.
3. findOne() vs findById()
a. findOne() is a general method that allows you to search for a document based on any field or condition, including _id.
b. findById() is specialized for retrieving documents by the _id field only, and is generally more concise when used for this purpose.

Error Handling in findById()
// If the provided Id is not a valid ObjectId, Mongoose's findById() method will return null rather than throwing an error or querying the database. This is useful for catching invalid IDs early without incurring the cost of a database query.
const invalidId = "invalidObjectId";
User.findById(invalidId, (err, user) => {
  if (err) {
    console.error(err);
  } else if (!user) {
    console.log("No user found with this ID.");
  }
});

Example Use Cases
1. Fetching User Profile by ID:
a. When a user logs in, you might want to fetch their his profile information using his _id:
User.findById(userId, (err, user) => {
  if (user) {
    // Display user profile
  }
});
2. Retrieving a Post by ID:
a. If you have a blogging platform, you might want to retrieve a specific blog post by its ID:
Post.findById(postId, (err, post) => {
  if (post) {
    // Display the post
  }
});
3. Updating or Deleting a Document by ID:
a. You can use findById() to first retrieve a document before updating or deleting it:
User.findById(userId, (err, user) => {
  if (user) {
    user.name = "New Name";
    user.save();
  }
});
*/

/*
db.users.findOneAndDelete() or Model.findOneAndDelete()
The findOneAndDelete() method in MongoDB (and Mongoose) is useful function for finding and deleting a single document that matches a specific query. This method not only deletes the document but also returns the deleted document to the application, allowing you to access its data before it is removed from the collection.

Why Use findOneAndDelete()
1. Atomic Operations:
a. findOneAndDelete() is atomic, meaning the document is found and deleted in a single operation. This ensures that no other operations can modify the document between finding and deleting it, which can be crucial in a concurrent environment where multiple operations might try to access or modify
the same document.
2. Returning the Deleted Document:
a. Unlike the deleteOne() method, which only deletes the document and returns status, findOneAndDelete() also returns the deleted document. This can be useful when you need to access the data of the document that was just removed, perhaps for logging, further processing, or sending it back as a response to the client.
3. Selective Deletion:
a. If you want to delete a document based on certain criteria and ensure that only document is affected, findOneAndDelete() is ideal. For example, if you want to delete the first document that matches a specific condition, this method ensures that only one document is deleted, and you can verify which document was deleted.
Model.findOneAndDelete(filter, options)
a. Filter: The query to find the document.
b. Options: Optional! Additional options such as projection to specify the fields to return, or sort to determine which document to delete if multiple match the query.

Example Usage of findOneAndDelete()

Example 1: Basic Deletion
User.findOneAndDelete({ name: "Alice" }, (err, deletedUser) => {
  if (err) {
    console.error(err);
  } else {
    console.log("Deleted User:", deletedUser);
  }
});
a. The first document where the name is "Alice" will be deleted.
b. The deleted document is returned and logged, so you can see the details of the user that was removed.

Example 2: Using findOneAndDelete() with sorting
// It you have multiple documents that match the query, you can use sorting to determine which document is deleted. For example, delete the older user (based on age)
User.findOneAndDelete({}, { sort: { age: 1 } }, (err, deletedUser) => {
  if (err) {
    console.error(err);
  } else {
    console.log("Deleted User:", deletedUser);
  }
});
a. The sort option orders the documents by age in ascending order({age: 1}), so the oldest one of user documents is deleted.

Example 3: Using findOneAndDelete() with Projection
// If you want to delete a document but only return specific fields, you can use the projection option.
User.findOneAndDelete({ name: "Bob" }, { projection: { _id: 0, name: 1 } }, (err, deletedUser) => {
  if (err) {
    console.error(err);
  } else {
    console.log("Deleted User:", deletedUser); // Only the name field will be returned
  }
});
a. The document with the name "Bob" is deleted.
b. Only the name field is returned in the response

Key Use Cases for findOneAndDelete()
1. Removing a Specific Document with Feedback:
a. When you need to delete a document and aslo require confirmation of what was deleted, findOneAndDelete() is ideal. For example, when deleting a user account, you might want to return the deleted user's data to confirm the deletion.
2. Optimizing Concurrency:
a. In applications where multiple operations might attempt to delete or modify the same document simultaneously, findOneAndDelete() ensures that the document is safely deleted without risk of race confitions. Since the operation is atomic, there is no chance that another operation will modify the document after it has been found but before it is deleted.
3. Logging or Auditing:
a. If you need to log or audit deletions, using findOneAndDelete() allows you to capture the details of the deleted document. This can be important for tracking changes in the system or maintaining an audit trail.
4. Handling Cleanup Tasks:
a. In scenarios where you need to remove outdated or invalid data (e.g. old session records, expired promotions), findOneAndDelete() can help you remove these records one at a time while keeping track of what has been deleted.

Comparison with Other Mehtods
1. deletionOne() vs findOneAndDelete()
a. deleteOne() deletes a single document that matches the filter criteria but does not return the deleted document.
b. findOneAndDelete() deletes a single document and returns the deleted document, making it more suitable when you need to verify or use the data from the deleted document.
2. findOneAndRemove() vs findOneAndDelete()
a. These methods are functionally equivalent in Mongoose, with findOneAndRemove() being an older alias. It is recommended to use findOneAndDelete() as it is more consistent with other deletion methods like deleteOne() and deleteMany().
3. findOneAndUpdate() vs findOneAndDelete()
a. findOneAndUpdate() is used when you need to update a document and return the updated document, while findOneAndDelete() is used for deletion and returns the deleted document. Both methods can be used with sorting and projection options.

Example: Deleting an Expired Token
// Imagine you have a tokens collection that stores user tokens with expiration dates. You want to delete an expired token and return its details:
Token.findOneAndDelete({ expirationDate: { $lt: new Date() } }, (err, token) => {
  if (err) {
    console.error(err);
  } else if (token) {
    console.log("Deleted expired token:", token);
  } else {
    console.log("No expired tokens found.");
  }
});
a. The query finds the first token that has expired(i.e. expirationDate is less than the current date).
b. The findOneAndDelete() method deletes the token and returns its details.
*/

/*
Model.findOneAndReplace()
The findOneAndReplace() method in MongoDB(commonly used in Mongoose) is a specialized operation that allows you to find a single document that matches a specified query and replace it with a new document. This method is useful when you want to update an entire document while aslo retrieving the original document before the replacement.

Why Use findOneAndReplace()
1. Atomic Replacement:
a. findOneAndReplace performs the find and replace operations atomically. This means that the document is found and replaced in a single operation, ensuring that no other operations can modify the document between finding and replacing it. This atomicity is crucial in concurrent environments where multiple operations might affect the same document.
2. Returning the Original Document:
a. Unlike updateOne() or updateMany(), which modify a document without returning the original data, findOneAndReplace() returns the original document before it was replaced. This can be usefull for logging, auditing or validation purposes.
3. Complete Document Replacement:
a. findOneAndReplace() replaces the entire document with a new one. This is different from findOneAndUpdate(), which allows you to modify only specific fields of the document while leaving the rest unchanged. If you need to replace a document completely, findOneAndReplace() is the method to use.
4. Ensuring Document Integrity:
By using findOneAndReplace(), you can ensure that the replacement document completely adheres to the desired structure, as it entirely overwrites the existing document.

Syntax:
Model.findOneAndReplace(filter, replacement, options)
a. Filter: The query to find the document.
b. replacement: The new document to replace the found document with.
c. options: Optional. Additional options such as projection to specify which fields to return, or returnOriginal to determine whether to return the original or the replaced one.

Example Usage:
1. Example 1: Basic Replacement
// Suppose you have a users collection and you want to replace a user document with a specific _id:
const userId = "64f13cfd4523e9eacbf0d491";
const newUser = {
  _id: userId,
  name: "Alice",
  age: 26,
  email: "alice@example.com"
};

User.findOneAndReplace({ _id: userId }, newUser, (err, originalUser) => {
  if (err) {
    console.error(err);
  } else {
    console.log("Original User:", originalUser);
    console.log("User after Replacement:", newUser);
  }
});
a. The user with the specific_id is replaced with the newUser document.
b. The originalUser variable contains the document before it was replaced.

Example 2: Using findOneAndReplace() with Options
// To return the replaced document instead of the original document, you can use the returnDocument option(in Mongoose v5.7.1 and newer).
User.findOneAndReplace({ _id: userId }, newUser, { returnDocument: 'after' }, (err, replacedUser) => {
  if (err) {
    console.error(err);
  } else {
    console.log("User after Replacement:", replacedUser);
  }
});
a. returnDocument: 'after' ensures that the document returned is the one after the replacement.

Example 3: Validation and Structure Enforcement
// If you need to enforce a specific structure or validation on the document, replacing the entire document ensures that the new document adheres to the defined schema or validation rules:
const newUser = {
  _id: userId,
  name: "Alice",
  age: 26,  // Assuming age is mandatory and must be an integer
  email: "alice@example.com"
};

User.findOneAndReplace({ _id: userId }, newUser, { runValidators: true }, (err, originalUser) => {
  if (err) {
    console.error(err);
  } else {
    console.log("Original User:", originalUser);
    console.log("New User:", newUser);
  }
});
a. runValidators: true, ensures that Mongoose validates the newUser document according to the schema before replacing.

Comparison with Other Methods
1. findOneAndUpdate() vs. findOneAndReplace()
a. findOneAndUpdate(): Updates specific fields of a document while leaving other fields unchanged. It does not replace the entire document.
b. findOneAndReplace(): Replaces the entire document with a new one. Use this method when you need to fully overwrite the existing document.
2. updateOne() vs. findOneAndReplace()
a. updateOne(): Performs partial updates to documents matching a query. It does not return the original document, only an update status.
b. findOneAndReplace(): Replaces a single document and returns either the original or the new document, depending on options.
3. replaceOne() vs. findOneAndReplace()
a. replaceOne(): Replaces a single document matching a query, but does not return the original or new document by default.
b. findOneAndReplace(): Performs the replacement and returns the original document or the replaced document based on options.

Example Use Case: Updating User Profile:
// Imagine a scenario where a user profile needs to be completely updated based on new information received from the user:
const updatedProfile = {
  _id: userId,
  name: "Alice",
  age: 27,
  email: "alice.new@example.com",
  address: "123 New Street, New York, NY"
};

User.findOneAndReplace({ _id: userId }, updatedProfile, { returnDocument: 'after' }, (err, newProfile) => {
  if (err) {
    console.error(err);
  } else {
    console.log("Updated User Profile:", newProfile);
  }
});
a. The updatedProfile completely replaces the exiting user document.
b. The updated profile is returned and can be used for further processing or confirmation.
*/
