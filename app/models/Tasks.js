exports.definition = {
    config: {
        URL: 'http://localhost:8080/api/tasks',
        headers: {
            "Authorization": 'Basic ' + 
            Ti.Utils.base64encode('eBwoRxAQSNcsKijckNjURIijFJTzWPG6:'),
        },
		
        adapter: {
            type: 'restapi',
            collection_name: 'tasks',
            idAttribute: "id"
        },
        // Gets the parent node of our Array
        parentNode: function(data) {
            data = data || [];
            return data.tasks || data;
        }
    },
    extendModel: function(Model) {
        _.extend(Model.prototype, {});
        return Model;
    },
    extendCollection: function(Collection) {
        _.extend(Collection.prototype, {});
        return Collection;
    }
};

