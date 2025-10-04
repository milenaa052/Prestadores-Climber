import AddressModel from "./AddressModel.js";
import AdminModel from "./AdminModel.js";
import CategoryModel from "./CategoryModel.js";
import ContractorModel from "./ContractorModel.js";
import ContractServiceModel from "./ContractServiceModel.js";
import GaleryModel from "./GaleryModel.js";
import OpeningHoursModel from "./OpeningHoursModel.js";
import ProviderModel from "./ProviderModel.js";
import ReviewModel from "./ReviewModel.js";
import ServiceModel from "./ServiceModel.js";
import ServiceProviderModel from "./ServiceProviderModel.js";

AddressModel.hasMany(ProviderModel, {
  foreignKey: "addressId",
  as: "providers"
});
ProviderModel.belongsTo(AddressModel, {
  foreignKey: "addressId",
  as: "address"
});

AddressModel.hasMany(ContractorModel, {
  foreignKey: "addressId",
  as: "contractors"
});
ContractorModel.belongsTo(AddressModel, {
  foreignKey: "addressId",
  as: "address"
});


CategoryModel.hasMany(ServiceModel, {
  foreignKey: "categoryId",
  as: "services"
});
ServiceModel.belongsTo(CategoryModel, {
  foreignKey: "categoryId",
  as: "category"
});


ProviderModel.belongsToMany(ServiceModel, {
  through: ServiceProviderModel,
  foreignKey: "providerId",
  otherKey: "serviceId",
  as: "services"
});
ServiceModel.belongsToMany(ProviderModel, {
  through: ServiceProviderModel,
  foreignKey: "serviceId",
  otherKey: "providerId",
  as: "providers"
});


ProviderModel.hasMany(ServiceProviderModel, { 
    foreignKey: "providerId", 
    as: "serviceProviders" 
});
ServiceModel.hasMany(ServiceProviderModel, { 
    foreignKey: "serviceId", 
    as: "serviceProviders" 
});

ServiceProviderModel.belongsTo(ProviderModel, { 
    foreignKey: "providerId", 
    as: "provider" 
});
ServiceProviderModel.belongsTo(ServiceModel, {
    foreignKey: "serviceId", 
    as: "service" 
});


ProviderModel.hasMany(GaleryModel, {
  foreignKey: "providerId",
  as: "gallery"
});
GaleryModel.belongsTo(ProviderModel, {
  foreignKey: "providerId",
  as: "provider"
});


ProviderModel.hasMany(OpeningHoursModel, {
  foreignKey: "providerId",
  as: "openingHours"
});
OpeningHoursModel.belongsTo(ProviderModel, {
  foreignKey: "providerId",
  as: "provider"
});


ProviderModel.hasMany(ContractServiceModel, {
  foreignKey: "providerId",
  as: "contractsAsProvider"
});
ContractServiceModel.belongsTo(ProviderModel, {
  foreignKey: "providerId",
  as: "provider"
});

ContractorModel.hasMany(ContractServiceModel, {
  foreignKey: "customerId",
  as: "contractsAsCustomer"
});
ContractServiceModel.belongsTo(ContractorModel, {
  foreignKey: "customerId",
  as: "customer"
});

ServiceProviderModel.hasMany(ContractServiceModel, {
  foreignKey: "providerServiceId",
  as: "contracts"
});
ContractServiceModel.belongsTo(ServiceProviderModel, {
  foreignKey: "providerServiceId",
  as: "serviceProvider"
});


ContractServiceModel.hasOne(ReviewModel, {
  foreignKey: "contractId",
  as: "review"
});
ReviewModel.belongsTo(ContractServiceModel, {
  foreignKey: "contractId",
  as: "contract"
});


ProviderModel.hasMany(ReviewModel, {
  foreignKey: "serviceProviderReviewId",
  as: "providerReviews"
});
ReviewModel.belongsTo(ProviderModel, {
  foreignKey: "serviceProviderReviewId",
  as: "providerReviewer"
});

ContractorModel.hasMany(ReviewModel, {
  foreignKey: "clientReviewId",
  as: "clientReviews"
});
ReviewModel.belongsTo(ContractorModel, {
  foreignKey: "clientReviewId",
  as: "clientReviewer"
});

export {
  AddressModel,
  AdminModel,
  CategoryModel,
  ContractorModel,
  ContractServiceModel,
  GaleryModel,
  OpeningHoursModel,
  ProviderModel,
  ReviewModel,
  ServiceModel,
  ServiceProviderModel
};