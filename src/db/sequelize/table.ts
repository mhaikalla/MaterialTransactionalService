import {
    Transactionals
  } from '../../models/index';
  
  import { DataTypes, Model, Optional, CreationOptional, NOW, ModelDefined } from 'sequelize';
  import { getDb, getDataTypesChaining as _ } from '../sequelize/index';
  
  const defaultSetting = {
    underscored: true,
  };
  const baseEntity = {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    created_at: DataTypes.NOW,
    updated_at: _(DataTypes.DATE).isNullable().withDefault(null),
    deleted_at: _(DataTypes.DATE).isNullable().withDefault(null)
  }  
  
  export const TransactionalsTable = getDb().define<Model<Transactionals>>('transactionals', {
    ...baseEntity,
    name: _(DataTypes.STRING),
    user_id  : _(DataTypes.INTEGER),
    vendor_user_id  : _(DataTypes.INTEGER),
    material_id :  _(DataTypes.INTEGER),
    status : _(DataTypes.STRING),
  }, {...defaultSetting, freezeTableName: true})
  
