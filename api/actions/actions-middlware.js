// add middlewares here related to actions


// #### Actions

// | Field       | Data Type | Metadata                                                                                        |
// | ----------- | --------- | ----------------------------------------------------------------------------------------------- |
// | id          | number    | do not provide it when creating actions, the database will generate it                          |
// | project_id  | number    | required, must be the id of an existing project                                                 |
// | description | string    | required, up to 128 characters long                                                             |
// | notes       | string    | required, no size limit. Used to record additional notes or requirements to complete the action |
// | completed   | boolean   | not required, defaults to false when creating actions             