import {
	model,
	Schema,
	PaginateModel,
	SchemaDefinitionProperty,
} from 'mongoose';
import paginate from 'mongoose-paginate-v2';

export interface IProperties {
	[k: string]: SchemaDefinitionProperty;
}

function createModel(modelName, properties) {
	const schema = new Schema<typeof properties>(properties, {
		timestamps: true,
	});
	schema.plugin(paginate);

	return model<typeof properties, PaginateModel<typeof properties>>(
		modelName,
		schema
	);
}

export default createModel;
