import createModel, { IProperties } from './create-model';

const modelProperties: IProperties = {
	name: { type: String, unique: true },
	permissions: [String],
};

export default createModel('roles', modelProperties);
