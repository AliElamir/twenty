import { FieldMetadataItem } from '@/object-metadata/types/FieldMetadataItem';
import { isFieldValueEmpty } from '@/object-record/record-field/utils/isFieldValueEmpty';
import { getComputedDefaultValue } from '@/settings/data-model/fields/preview/utils/getComputedDefaultValue';
import { getSettingsFieldTypeConfig } from '@/settings/data-model/utils/getSettingsFieldTypeConfig';
import { isFieldTypeSupportedInSettings } from '@/settings/data-model/utils/isFieldTypeSupportedInSettings';
import { isDefined } from '~/utils/isDefined';

export const getFieldPreviewValue = ({
  fieldMetadataItem,
}: {
  fieldMetadataItem: Pick<FieldMetadataItem, 'type' | 'defaultValue'>;
}) => {
  if (!isFieldTypeSupportedInSettings(fieldMetadataItem.type)) return null;

  if (
    !isFieldValueEmpty({
      fieldDefinition: { type: fieldMetadataItem.type },
      fieldValue: fieldMetadataItem.defaultValue,
    })
  ) {
    return getComputedDefaultValue(fieldMetadataItem.defaultValue);
  }

  const fieldTypeConfig = getSettingsFieldTypeConfig(fieldMetadataItem.type);

  if (
    isDefined(fieldTypeConfig) &&
    'defaultValue' in fieldTypeConfig &&
    isDefined(fieldTypeConfig.defaultValue)
  ) {
    return getComputedDefaultValue(fieldTypeConfig.defaultValue);
  }

  return null;
};
