import { allEntriesQuery, singleEntryQueryWithUID } from './index';

export const whereInAllEntries = async (
  contentType: string,
  whereField: string,
  whereValues: string,
  referenceFields?: string[],
) => {
  const query = allEntriesQuery(contentType);
  try {
    if (referenceFields) {
      query.includeReference(referenceFields);
    }

    const result = await query.toJSON().where(whereField, whereValues).find();
    return result[0][0];
  } catch (err) {
    console.error('Error fetching data:', err);
  }
};

export const singleEntryWithUID = async (
  contentType: string,
  uid: string,
  referenceFields?: string[],
) => {
  const query = singleEntryQueryWithUID(contentType, uid);
  try {
    if (referenceFields) {
      query.includeReference(referenceFields);
    }
    const result = await query.toJSON().fetch();
    return result;
  } catch (err) {
    console.error('Error fetching data:', err);
  }
};

export const getAllEntries = async (contentType: string) => {
  const query = allEntriesQuery(contentType);
  try {
    const result = await query.includeCount().toJSON().find();
    return result;
  } catch (err) {
    console.error('Error fetching data:', err);
  }
};
