function Repository() {

}

Repository.prototype.add = add;
Repository.prototype.addBatch = addBatch;
Repository.prototype.getAll = getAll;
Repository.prototype.getAllItemsSortedByDate = getAllItemsSortedByDate;
Repository.prototype.getById = getById;
Repository.prototype.removeById = removeById;
Repository.prototype.updateFullObjectById = updateFullObjectById;
Repository.prototype.updatePropertiesById = updatePropertiesById;
Repository.prototype.updatePropertiesByIdAndReturn = updatePropertiesByIdAndReturn;

function add(data, callback) {
	var model = this.model,
		newItem = new model(data);
	newItem.save(callback);
}

function addBatch(batchToInsert, callback) {
	var query = this.model.create(batchToInsert, callback);
}

function getAll(callback) {
	var query = this.model.find();
	query.exec(callback);
}

function getAllItemsSortedByDate(callback) {
	var query = this.model.find({}).sort({
		date: 1
	});
	query.exec(callback);
}

function getById(id, callback) {
	var query = this.model.findOne({
		_id: id
	});
	query.exec(callback);
}

function removeById(id, callback) {
	var query = this.model.remove({
		_id: id
	});
	query.exec(callback);
}

function updateFullObjectById(id, newObj, callback) {
	var query = this.model.update({
		_id: id
	}, newObj, {
			multi: false
		});
	query.exec(callback);
}

function updatePropertiesById(id, dataToUpdate, callback) {
	var query = this.model.update({
		_id: id
	}, {
			$set: dataToUpdate
		}, {
			multi: false
		});
	query.exec(callback);
}

function updatePropertiesByIdAndReturn(id, dataToUpdate, callback) {
	var query = this.model.findOneAndUpdate(
		{
			_id: id
		},
		{
			$set: dataToUpdate
		}, {
			new: true
		});
	query.exec(callback);
}

module.exports = Repository;