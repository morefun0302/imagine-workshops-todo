var SDK = require('taskapi');

SDK.Authorization = "FziBC+dGnSKdo3cCZ8EXrqW8Teyyl3pC";

exports.definition = {
	config: {
		columns: {
			'id': 'string',
			'description': 'string',
			'completed': 'boolean'
		},
		URL: SDK.getURL('/api/task'),
		adapter: {
			type: 'restapi',
			collection_name: 'tasks',
			idAttribute: 'id'
		},
		headers: SDK.getDefaultHeaders,
		parentNode: SDK.parseParentNode
	},
	extendModel: function (Model) {
		_.extend(Model.prototype, {
			'query': _query,
			'create': _create,
			'deleteAll': _deleteAll,
			'count': _count,
			'findAll': _findAll,
			'findAndModify': _findAndModify,
			'upsert': _upsert,
			'findOne': _findOne,
			'findByID': _findByID,
			'update': _update,
			'delete': _delete,
			'distinct': _distinct
		});
		return Model;
	},
	extendCollection: function (Collection) {
		_.extend(Collection.prototype, {
			'query': _query,
			'create': _create,
			'deleteAll': _deleteAll,
			'count': _count,
			'findAll': _findAll,
			'findAndModify': _findAndModify,
			'upsert': _upsert,
			'findOne': _findOne,
			'findByID': _findByID,
			'update': _update,
			'delete': _delete,
			'distinct': _distinct
		});
		return Collection;
	}
};

function _query(query, callback, options) {
	if (_.isFunction(query)) {
		callback = query;
		query = {};
	}

	var url = SDK.getURL('/api/task/query');
	if (query) {
		url = SDK.appendQuery(url, query);
	}

					var cachePolicy = (options && options.cachePolicy) || this.cachePolicy || SDK.cachePolicy,
						cacheHash = SDK.getCacheHash('GET', url);
					// If we're using one of the policies that can use the cache...
					if (!!(cachePolicy.type & (SDK.Policy.CacheElseNetwork | SDK.Policy.CacheThenNetwork | SDK.Policy.CacheOnly))) {
						var cached = SDK.readCache(cacheHash);
						if (cached) {
							callback && callback(null, cached, null);
							// CacheElseNetwork or CacheOnly? Then we can return.
							if (cachePolicy.type !== SDK.Policy.CacheThenNetwork) {
								clean();
								return cached;
							}
							// CacheThenNetwork would carry on.
						}
						// CacheOnly will never hit the network; it wants to return, even if we don't find results.
						if (cachePolicy.type === SDK.Policy.CacheOnly) {
							callback && callback(new Error('No results have been cached yet.'), null, null);
							clean();
							return;
						}
					}

	var client = SDK.constructHTTP('GET', url, onLoad, onError);
	client.send();

	function onLoad() {
		if (!callback) {
			return;
		}
		var body = this.responseText;
		if (/^application\/(.*\\+)?json/.test(this.getResponseHeader('Content-Type'))) {
			try {
				body = JSON.parse(body);
				if (body.key && body[body.key] !== undefined) {
					body = body[body.key];
				}
			}
			catch (e) {
				console.error('Failed to parse the body from the server:');
				console.error(body);
				console.error(e);
			}
		}
		if (this.status >= 200 && this.status <= 299) {
						if (!!(cachePolicy.type & (SDK.Policy.CacheElseNetwork | SDK.Policy.NetworkElseCache | SDK.Policy.CacheThenNetwork | SDK.Policy.NetworkOnly))) {
							SDK.writeCache(cacheHash, cachePolicy.duration, body);
							// TODO: When we do a findAll, cache findByID, too.
							// TODO: Non-GETs should bust the cache for find, right?
						}
			callback(null, body, client);
		}
		else {
			callback(body, null, client);
		}
		clean();
	}

	function onError(e) {
		if (!callback) {
			return;
		}
						if (!!(cachePolicy.type & (SDK.Policy.NetworkElseCache))) {
							var cached = SDK.readCache(url);
							if (cached) {
								callback(null, cached, null);
								clean();
								return;
							}
						}
		callback(e.error, null, client);
		clean();
	}

	function clean() {
		query = callback = url = client = null;
	}
}function _create(body, callback, options) {
	if (_.isFunction(body)) {
		callback = body;
		body = {};
	}

	var url = SDK.getURL('/api/task');


	var client = SDK.constructHTTP('POST', url, onLoad, onError);
	client.send(body);

	function onLoad() {
		if (!callback) {
			return;
		}
		var body = this.responseText;
		if (/^application\/(.*\\+)?json/.test(this.getResponseHeader('Content-Type'))) {
			try {
				body = JSON.parse(body);
				if (body.key && body[body.key] !== undefined) {
					body = body[body.key];
				}
			}
			catch (e) {
				console.error('Failed to parse the body from the server:');
				console.error(body);
				console.error(e);
			}
		}
		if (this.status >= 200 && this.status <= 299) {
			callback(null, body, client);
		}
		else {
			callback(body, null, client);
		}
		clean();
	}

	function onError(e) {
		if (!callback) {
			return;
		}
		callback(e.error, null, client);
		clean();
	}

	function clean() {
		body = callback = url = client = null;
	}
}function _deleteAll(callback, options) {

	var url = SDK.getURL('/api/task');


	var client = SDK.constructHTTP('DELETE', url, onLoad, onError);
	client.send();

	function onLoad() {
		if (!callback) {
			return;
		}
		var body = this.responseText;
		if (/^application\/(.*\\+)?json/.test(this.getResponseHeader('Content-Type'))) {
			try {
				body = JSON.parse(body);
				if (body.key && body[body.key] !== undefined) {
					body = body[body.key];
				}
			}
			catch (e) {
				console.error('Failed to parse the body from the server:');
				console.error(body);
				console.error(e);
			}
		}
		if (this.status >= 200 && this.status <= 299) {
			callback(null, body, client);
		}
		else {
			callback(body, null, client);
		}
		clean();
	}

	function onError(e) {
		if (!callback) {
			return;
		}
		callback(e.error, null, client);
		clean();
	}

	function clean() {
		callback = url = client = null;
	}
}function _count(query, callback, options) {
	if (_.isFunction(query)) {
		callback = query;
		query = {};
	}

	var url = SDK.getURL('/api/task/count');
	if (query) {
		url = SDK.appendQuery(url, query);
	}

					var cachePolicy = (options && options.cachePolicy) || this.cachePolicy || SDK.cachePolicy,
						cacheHash = SDK.getCacheHash('GET', url);
					// If we're using one of the policies that can use the cache...
					if (!!(cachePolicy.type & (SDK.Policy.CacheElseNetwork | SDK.Policy.CacheThenNetwork | SDK.Policy.CacheOnly))) {
						var cached = SDK.readCache(cacheHash);
						if (cached) {
							callback && callback(null, cached, null);
							// CacheElseNetwork or CacheOnly? Then we can return.
							if (cachePolicy.type !== SDK.Policy.CacheThenNetwork) {
								clean();
								return cached;
							}
							// CacheThenNetwork would carry on.
						}
						// CacheOnly will never hit the network; it wants to return, even if we don't find results.
						if (cachePolicy.type === SDK.Policy.CacheOnly) {
							callback && callback(new Error('No results have been cached yet.'), null, null);
							clean();
							return;
						}
					}

	var client = SDK.constructHTTP('GET', url, onLoad, onError);
	client.send();

	function onLoad() {
		if (!callback) {
			return;
		}
		var body = this.responseText;
		if (/^application\/(.*\\+)?json/.test(this.getResponseHeader('Content-Type'))) {
			try {
				body = JSON.parse(body);
				if (body.key && body[body.key] !== undefined) {
					body = body[body.key];
				}
			}
			catch (e) {
				console.error('Failed to parse the body from the server:');
				console.error(body);
				console.error(e);
			}
		}
		if (this.status >= 200 && this.status <= 299) {
						if (!!(cachePolicy.type & (SDK.Policy.CacheElseNetwork | SDK.Policy.NetworkElseCache | SDK.Policy.CacheThenNetwork | SDK.Policy.NetworkOnly))) {
							SDK.writeCache(cacheHash, cachePolicy.duration, body);
							// TODO: When we do a findAll, cache findByID, too.
							// TODO: Non-GETs should bust the cache for find, right?
						}
			callback(null, body, client);
		}
		else {
			callback(body, null, client);
		}
		clean();
	}

	function onError(e) {
		if (!callback) {
			return;
		}
						if (!!(cachePolicy.type & (SDK.Policy.NetworkElseCache))) {
							var cached = SDK.readCache(url);
							if (cached) {
								callback(null, cached, null);
								clean();
								return;
							}
						}
		callback(e.error, null, client);
		clean();
	}

	function clean() {
		query = callback = url = client = null;
	}
}function _findAll(callback, options) {

	var url = SDK.getURL('/api/task');

					var cachePolicy = (options && options.cachePolicy) || this.cachePolicy || SDK.cachePolicy,
						cacheHash = SDK.getCacheHash('GET', url);
					// If we're using one of the policies that can use the cache...
					if (!!(cachePolicy.type & (SDK.Policy.CacheElseNetwork | SDK.Policy.CacheThenNetwork | SDK.Policy.CacheOnly))) {
						var cached = SDK.readCache(cacheHash);
						if (cached) {
							callback && callback(null, cached, null);
							// CacheElseNetwork or CacheOnly? Then we can return.
							if (cachePolicy.type !== SDK.Policy.CacheThenNetwork) {
								clean();
								return cached;
							}
							// CacheThenNetwork would carry on.
						}
						// CacheOnly will never hit the network; it wants to return, even if we don't find results.
						if (cachePolicy.type === SDK.Policy.CacheOnly) {
							callback && callback(new Error('No results have been cached yet.'), null, null);
							clean();
							return;
						}
					}

	var client = SDK.constructHTTP('GET', url, onLoad, onError);
	client.send();

	function onLoad() {
		if (!callback) {
			return;
		}
		var body = this.responseText;
		if (/^application\/(.*\\+)?json/.test(this.getResponseHeader('Content-Type'))) {
			try {
				body = JSON.parse(body);
				if (body.key && body[body.key] !== undefined) {
					body = body[body.key];
				}
			}
			catch (e) {
				console.error('Failed to parse the body from the server:');
				console.error(body);
				console.error(e);
			}
		}
		if (this.status >= 200 && this.status <= 299) {
						if (!!(cachePolicy.type & (SDK.Policy.CacheElseNetwork | SDK.Policy.NetworkElseCache | SDK.Policy.CacheThenNetwork | SDK.Policy.NetworkOnly))) {
							SDK.writeCache(cacheHash, cachePolicy.duration, body);
							// TODO: When we do a findAll, cache findByID, too.
							// TODO: Non-GETs should bust the cache for find, right?
						}
			callback(null, body, client);
		}
		else {
			callback(body, null, client);
		}
		clean();
	}

	function onError(e) {
		if (!callback) {
			return;
		}
						if (!!(cachePolicy.type & (SDK.Policy.NetworkElseCache))) {
							var cached = SDK.readCache(url);
							if (cached) {
								callback(null, cached, null);
								clean();
								return;
							}
						}
		callback(e.error, null, client);
		clean();
	}

	function clean() {
		callback = url = client = null;
	}
}function _findAndModify(query, body, callback, options) {
	if (_.isFunction(query)) {
		callback = query;
		query = {};
		body = {};
	}
	else if (_.isFunction(body)) {
		callback = body;
		body = {};
	}

	var url = SDK.getURL('/api/task/findAndModify');
	if (query) {
		url = SDK.appendQuery(url, query);
	}


	var client = SDK.constructHTTP('PUT', url, onLoad, onError);
	client.send(body);

	function onLoad() {
		if (!callback) {
			return;
		}
		var body = this.responseText;
		if (/^application\/(.*\\+)?json/.test(this.getResponseHeader('Content-Type'))) {
			try {
				body = JSON.parse(body);
				if (body.key && body[body.key] !== undefined) {
					body = body[body.key];
				}
			}
			catch (e) {
				console.error('Failed to parse the body from the server:');
				console.error(body);
				console.error(e);
			}
		}
		if (this.status >= 200 && this.status <= 299) {
			callback(null, body, client);
		}
		else {
			callback(body, null, client);
		}
		clean();
	}

	function onError(e) {
		if (!callback) {
			return;
		}
		callback(e.error, null, client);
		clean();
	}

	function clean() {
		query = body = callback = url = client = null;
	}
}function _upsert(body, callback, options) {
	if (_.isFunction(body)) {
		callback = body;
		body = {};
	}

	var url = SDK.getURL('/api/task/upsert');


	var client = SDK.constructHTTP('POST', url, onLoad, onError);
	client.send(body);

	function onLoad() {
		if (!callback) {
			return;
		}
		var body = this.responseText;
		if (/^application\/(.*\\+)?json/.test(this.getResponseHeader('Content-Type'))) {
			try {
				body = JSON.parse(body);
				if (body.key && body[body.key] !== undefined) {
					body = body[body.key];
				}
			}
			catch (e) {
				console.error('Failed to parse the body from the server:');
				console.error(body);
				console.error(e);
			}
		}
		if (this.status >= 200 && this.status <= 299) {
			callback(null, body, client);
		}
		else {
			callback(body, null, client);
		}
		clean();
	}

	function onError(e) {
		if (!callback) {
			return;
		}
		callback(e.error, null, client);
		clean();
	}

	function clean() {
		body = callback = url = client = null;
	}
}function _findOne(id, callback, options) {

	var url = SDK.getURL('/api/task/:id');
	url = url.replace(':id', id);

					var cachePolicy = (options && options.cachePolicy) || this.cachePolicy || SDK.cachePolicy,
						cacheHash = SDK.getCacheHash('GET', url);
					// If we're using one of the policies that can use the cache...
					if (!!(cachePolicy.type & (SDK.Policy.CacheElseNetwork | SDK.Policy.CacheThenNetwork | SDK.Policy.CacheOnly))) {
						var cached = SDK.readCache(cacheHash);
						if (cached) {
							callback && callback(null, cached, null);
							// CacheElseNetwork or CacheOnly? Then we can return.
							if (cachePolicy.type !== SDK.Policy.CacheThenNetwork) {
								clean();
								return cached;
							}
							// CacheThenNetwork would carry on.
						}
						// CacheOnly will never hit the network; it wants to return, even if we don't find results.
						if (cachePolicy.type === SDK.Policy.CacheOnly) {
							callback && callback(new Error('No results have been cached yet.'), null, null);
							clean();
							return;
						}
					}

	var client = SDK.constructHTTP('GET', url, onLoad, onError);
	client.send();

	function onLoad() {
		if (!callback) {
			return;
		}
		var body = this.responseText;
		if (/^application\/(.*\\+)?json/.test(this.getResponseHeader('Content-Type'))) {
			try {
				body = JSON.parse(body);
				if (body.key && body[body.key] !== undefined) {
					body = body[body.key];
				}
			}
			catch (e) {
				console.error('Failed to parse the body from the server:');
				console.error(body);
				console.error(e);
			}
		}
		if (this.status >= 200 && this.status <= 299) {
						if (!!(cachePolicy.type & (SDK.Policy.CacheElseNetwork | SDK.Policy.NetworkElseCache | SDK.Policy.CacheThenNetwork | SDK.Policy.NetworkOnly))) {
							SDK.writeCache(cacheHash, cachePolicy.duration, body);
							// TODO: When we do a findAll, cache findByID, too.
							// TODO: Non-GETs should bust the cache for find, right?
						}
			callback(null, body, client);
		}
		else {
			callback(body, null, client);
		}
		clean();
	}

	function onError(e) {
		if (!callback) {
			return;
		}
						if (!!(cachePolicy.type & (SDK.Policy.NetworkElseCache))) {
							var cached = SDK.readCache(url);
							if (cached) {
								callback(null, cached, null);
								clean();
								return;
							}
						}
		callback(e.error, null, client);
		clean();
	}

	function clean() {
		id = callback = url = client = null;
	}
}function _findByID(id, callback, options) {

	var url = SDK.getURL('/api/task/:id');
	url = url.replace(':id', id);

					var cachePolicy = (options && options.cachePolicy) || this.cachePolicy || SDK.cachePolicy,
						cacheHash = SDK.getCacheHash('GET', url);
					// If we're using one of the policies that can use the cache...
					if (!!(cachePolicy.type & (SDK.Policy.CacheElseNetwork | SDK.Policy.CacheThenNetwork | SDK.Policy.CacheOnly))) {
						var cached = SDK.readCache(cacheHash);
						if (cached) {
							callback && callback(null, cached, null);
							// CacheElseNetwork or CacheOnly? Then we can return.
							if (cachePolicy.type !== SDK.Policy.CacheThenNetwork) {
								clean();
								return cached;
							}
							// CacheThenNetwork would carry on.
						}
						// CacheOnly will never hit the network; it wants to return, even if we don't find results.
						if (cachePolicy.type === SDK.Policy.CacheOnly) {
							callback && callback(new Error('No results have been cached yet.'), null, null);
							clean();
							return;
						}
					}

	var client = SDK.constructHTTP('GET', url, onLoad, onError);
	client.send();

	function onLoad() {
		if (!callback) {
			return;
		}
		var body = this.responseText;
		if (/^application\/(.*\\+)?json/.test(this.getResponseHeader('Content-Type'))) {
			try {
				body = JSON.parse(body);
				if (body.key && body[body.key] !== undefined) {
					body = body[body.key];
				}
			}
			catch (e) {
				console.error('Failed to parse the body from the server:');
				console.error(body);
				console.error(e);
			}
		}
		if (this.status >= 200 && this.status <= 299) {
						if (!!(cachePolicy.type & (SDK.Policy.CacheElseNetwork | SDK.Policy.NetworkElseCache | SDK.Policy.CacheThenNetwork | SDK.Policy.NetworkOnly))) {
							SDK.writeCache(cacheHash, cachePolicy.duration, body);
							// TODO: When we do a findAll, cache findByID, too.
							// TODO: Non-GETs should bust the cache for find, right?
						}
			callback(null, body, client);
		}
		else {
			callback(body, null, client);
		}
		clean();
	}

	function onError(e) {
		if (!callback) {
			return;
		}
						if (!!(cachePolicy.type & (SDK.Policy.NetworkElseCache))) {
							var cached = SDK.readCache(url);
							if (cached) {
								callback(null, cached, null);
								clean();
								return;
							}
						}
		callback(e.error, null, client);
		clean();
	}

	function clean() {
		id = callback = url = client = null;
	}
}function _update(id, body, callback, options) {
	if (_.isFunction(body)) {
		callback = body;
		body = {};
	}

	var url = SDK.getURL('/api/task/:id');
	url = url.replace(':id', id);


	var client = SDK.constructHTTP('PUT', url, onLoad, onError);
	client.send(body);

	function onLoad() {
		if (!callback) {
			return;
		}
		var body = this.responseText;
		if (/^application\/(.*\\+)?json/.test(this.getResponseHeader('Content-Type'))) {
			try {
				body = JSON.parse(body);
				if (body.key && body[body.key] !== undefined) {
					body = body[body.key];
				}
			}
			catch (e) {
				console.error('Failed to parse the body from the server:');
				console.error(body);
				console.error(e);
			}
		}
		if (this.status >= 200 && this.status <= 299) {
			callback(null, body, client);
		}
		else {
			callback(body, null, client);
		}
		clean();
	}

	function onError(e) {
		if (!callback) {
			return;
		}
		callback(e.error, null, client);
		clean();
	}

	function clean() {
		id = body = callback = url = client = null;
	}
}function _delete(id, callback, options) {

	var url = SDK.getURL('/api/task/:id');
	url = url.replace(':id', id);


	var client = SDK.constructHTTP('DELETE', url, onLoad, onError);
	client.send();

	function onLoad() {
		if (!callback) {
			return;
		}
		var body = this.responseText;
		if (/^application\/(.*\\+)?json/.test(this.getResponseHeader('Content-Type'))) {
			try {
				body = JSON.parse(body);
				if (body.key && body[body.key] !== undefined) {
					body = body[body.key];
				}
			}
			catch (e) {
				console.error('Failed to parse the body from the server:');
				console.error(body);
				console.error(e);
			}
		}
		if (this.status >= 200 && this.status <= 299) {
			callback(null, body, client);
		}
		else {
			callback(body, null, client);
		}
		clean();
	}

	function onError(e) {
		if (!callback) {
			return;
		}
		callback(e.error, null, client);
		clean();
	}

	function clean() {
		id = callback = url = client = null;
	}
}function _distinct(field, query, callback, options) {
	if (_.isFunction(query)) {
		callback = query;
		query = {};
	}

	var url = SDK.getURL('/api/task/distinct/:field');
	url = url.replace(':field', field);
	if (query) {
		url = SDK.appendQuery(url, query);
	}

					var cachePolicy = (options && options.cachePolicy) || this.cachePolicy || SDK.cachePolicy,
						cacheHash = SDK.getCacheHash('GET', url);
					// If we're using one of the policies that can use the cache...
					if (!!(cachePolicy.type & (SDK.Policy.CacheElseNetwork | SDK.Policy.CacheThenNetwork | SDK.Policy.CacheOnly))) {
						var cached = SDK.readCache(cacheHash);
						if (cached) {
							callback && callback(null, cached, null);
							// CacheElseNetwork or CacheOnly? Then we can return.
							if (cachePolicy.type !== SDK.Policy.CacheThenNetwork) {
								clean();
								return cached;
							}
							// CacheThenNetwork would carry on.
						}
						// CacheOnly will never hit the network; it wants to return, even if we don't find results.
						if (cachePolicy.type === SDK.Policy.CacheOnly) {
							callback && callback(new Error('No results have been cached yet.'), null, null);
							clean();
							return;
						}
					}

	var client = SDK.constructHTTP('GET', url, onLoad, onError);
	client.send();

	function onLoad() {
		if (!callback) {
			return;
		}
		var body = this.responseText;
		if (/^application\/(.*\\+)?json/.test(this.getResponseHeader('Content-Type'))) {
			try {
				body = JSON.parse(body);
				if (body.key && body[body.key] !== undefined) {
					body = body[body.key];
				}
			}
			catch (e) {
				console.error('Failed to parse the body from the server:');
				console.error(body);
				console.error(e);
			}
		}
		if (this.status >= 200 && this.status <= 299) {
						if (!!(cachePolicy.type & (SDK.Policy.CacheElseNetwork | SDK.Policy.NetworkElseCache | SDK.Policy.CacheThenNetwork | SDK.Policy.NetworkOnly))) {
							SDK.writeCache(cacheHash, cachePolicy.duration, body);
							// TODO: When we do a findAll, cache findByID, too.
							// TODO: Non-GETs should bust the cache for find, right?
						}
			callback(null, body, client);
		}
		else {
			callback(body, null, client);
		}
		clean();
	}

	function onError(e) {
		if (!callback) {
			return;
		}
						if (!!(cachePolicy.type & (SDK.Policy.NetworkElseCache))) {
							var cached = SDK.readCache(url);
							if (cached) {
								callback(null, cached, null);
								clean();
								return;
							}
						}
		callback(e.error, null, client);
		clean();
	}

	function clean() {
		field = query = callback = url = client = null;
	}
}