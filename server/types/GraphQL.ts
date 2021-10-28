export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  /** The `AnyScalar` type allows any scalar value by examining the input and passing the serialize, parseValue, and parseLiteral operations to their respective types. */
  AnyScalar: any
  /** DateTime custom scalar type */
  DateTime: any
  /** Object custom scalar type */
  Object: any
}

export type AccountPasswordInfoCollectionInput = {
  items?: Maybe<Array<Maybe<AccountPasswordInfoInput>>>
  totalCount: Scalars["Int"]
}

export type AccountPasswordInfoInput = {
  accountId: Scalars["Int"]
  passwordInfo?: Maybe<PasswordInfoInput>
  unlockAccount?: Maybe<Scalars["Boolean"]>
  userId?: Maybe<Scalars["String"]>
}

export type AccountSalesRep = {
  __typename?: "AccountSalesRep"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<AccountSalesRep>
  accountId: Scalars["Int"]
  adminUserId?: Maybe<Scalars["String"]>
}

export type AccountSalesRep_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type AccountSalesRepInput = {
  accountId: Scalars["Int"]
  adminUserId?: Maybe<Scalars["String"]>
}

export type ActiveDateRange = {
  __typename?: "ActiveDateRange"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<ActiveDateRange>
  endDate?: Maybe<Scalars["DateTime"]>
  startDate?: Maybe<Scalars["DateTime"]>
}

export type ActiveDateRange_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type ActiveDateRangeInput = {
  endDate?: Maybe<Scalars["DateTime"]>
  startDate?: Maybe<Scalars["DateTime"]>
}

export type AddressValidationRequestInput = {
  address?: Maybe<CuAddressInput>
}

export type AddressValidationResponse = {
  __typename?: "AddressValidationResponse"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<AddressValidationResponse>
  addressCandidates?: Maybe<Array<Maybe<CuAddress>>>
}

export type AddressValidationResponse_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type Adjustment = {
  __typename?: "Adjustment"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<Adjustment>
  amount?: Maybe<Scalars["Float"]>
  description?: Maybe<Scalars["String"]>
  internalComment?: Maybe<Scalars["String"]>
}

export type Adjustment_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type AdjustmentInput = {
  amount?: Maybe<Scalars["Float"]>
  description?: Maybe<Scalars["String"]>
  internalComment?: Maybe<Scalars["String"]>
}

export type AppeasementReasonInput = {
  description?: Maybe<Scalars["String"]>
  moreInfo?: Maybe<Scalars["String"]>
  reasonCode?: Maybe<Scalars["String"]>
}

export type AppliedLineItemProductDiscount = {
  __typename?: "AppliedLineItemProductDiscount"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<AppliedLineItemProductDiscount>
  appliesToSalePrice?: Maybe<Scalars["Boolean"]>
  discountQuantity: Scalars["Int"]
  impactPerUnit?: Maybe<Scalars["Float"]>
  productQuantity?: Maybe<Scalars["Int"]>
}

export type AppliedLineItemProductDiscount_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type AppliedLineItemProductDiscountInput = {
  appliesToSalePrice?: Maybe<Scalars["Boolean"]>
  discountQuantity: Scalars["Int"]
  impactPerUnit?: Maybe<Scalars["Float"]>
  productQuantity?: Maybe<Scalars["Int"]>
}

export type AppliedLineItemShippingDiscount = {
  __typename?: "AppliedLineItemShippingDiscount"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<AppliedLineItemShippingDiscount>
  discount?: Maybe<CrAppliedDiscount>
  discountQuantity: Scalars["Int"]
  impactPerUnit: Scalars["Float"]
  methodCode?: Maybe<Scalars["String"]>
}

export type AppliedLineItemShippingDiscount_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type AppliedLineItemShippingDiscountInput = {
  discount?: Maybe<CrAppliedDiscountInput>
  discountQuantity: Scalars["Int"]
  impactPerUnit: Scalars["Float"]
  methodCode?: Maybe<Scalars["String"]>
}

export type AttributeDetail = {
  __typename?: "AttributeDetail"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<AttributeDetail>
  allowFilteringAndSortingInStorefront?: Maybe<Scalars["Boolean"]>
  customWeightInStorefrontSearch?: Maybe<Scalars["Boolean"]>
  dataType?: Maybe<Scalars["String"]>
  dataTypeSequence: Scalars["Int"]
  description?: Maybe<Scalars["String"]>
  displayIntention?: Maybe<Scalars["String"]>
  indexValueWithCase?: Maybe<Scalars["Boolean"]>
  inputType?: Maybe<Scalars["String"]>
  name?: Maybe<Scalars["String"]>
  searchDisplayValue?: Maybe<Scalars["Boolean"]>
  searchableInStorefront?: Maybe<Scalars["Boolean"]>
  usageType?: Maybe<Scalars["String"]>
  validation?: Maybe<PrAttributeValidation>
  valueType?: Maybe<Scalars["String"]>
}

export type AttributeDetail_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type AttributeVocabularyValueDisplayInfo = {
  __typename?: "AttributeVocabularyValueDisplayInfo"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<AttributeVocabularyValueDisplayInfo>
  cmsId?: Maybe<Scalars["String"]>
  colorValue?: Maybe<Scalars["String"]>
  imageUrl?: Maybe<Scalars["String"]>
}

export type AttributeVocabularyValueDisplayInfo_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type AuditRecord = {
  __typename?: "AuditRecord"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<AuditRecord>
  auditInfo?: Maybe<CrAuditInfo>
  changes?: Maybe<Array<Maybe<AuditRecordChange>>>
  id?: Maybe<Scalars["String"]>
}

export type AuditRecord_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type AuditRecordChange = {
  __typename?: "AuditRecordChange"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<AuditRecordChange>
  fields?: Maybe<Array<Maybe<AuditRecordChangeField>>>
  path?: Maybe<Scalars["String"]>
  type?: Maybe<Scalars["String"]>
}

export type AuditRecordChange_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type AuditRecordChangeField = {
  __typename?: "AuditRecordChangeField"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<AuditRecordChangeField>
  name?: Maybe<Scalars["String"]>
  newValue?: Maybe<Scalars["String"]>
  oldValue?: Maybe<Scalars["String"]>
}

export type AuditRecordChangeField_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type AuditRecordChangeFieldInput = {
  name?: Maybe<Scalars["String"]>
  newValue?: Maybe<Scalars["String"]>
  oldValue?: Maybe<Scalars["String"]>
}

export type AuditRecordChangeInput = {
  fields?: Maybe<Array<Maybe<AuditRecordChangeFieldInput>>>
  path?: Maybe<Scalars["String"]>
  type?: Maybe<Scalars["String"]>
}

export type AuditRecordInput = {
  auditInfo?: Maybe<CrAuditInfoInput>
  changes?: Maybe<Array<Maybe<AuditRecordChangeInput>>>
  id?: Maybe<Scalars["String"]>
}

export type B2BAccount = {
  __typename?: "B2BAccount"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<B2BAccount>
  accountType?: Maybe<Scalars["String"]>
  approvalStatus?: Maybe<Scalars["String"]>
  attributes?: Maybe<Array<Maybe<CustomerAttribute>>>
  auditInfo?: Maybe<CuAuditInfo>
  commerceSummary?: Maybe<CommerceSummary>
  companyOrOrganization?: Maybe<Scalars["String"]>
  contacts?: Maybe<Array<Maybe<CustomerContact>>>
  customerSet?: Maybe<Scalars["String"]>
  customerSinceDate?: Maybe<Scalars["DateTime"]>
  externalId?: Maybe<Scalars["String"]>
  id: Scalars["Int"]
  isActive?: Maybe<Scalars["Boolean"]>
  notes?: Maybe<Array<Maybe<CustomerNote>>>
  parentAccountId?: Maybe<Scalars["Int"]>
  priceList?: Maybe<Scalars["String"]>
  rootAccountId?: Maybe<Scalars["Int"]>
  salesReps?: Maybe<Array<Maybe<AccountSalesRep>>>
  segments?: Maybe<Array<Maybe<CustomerSegment>>>
  taxId?: Maybe<Scalars["String"]>
  users?: Maybe<Array<Maybe<B2BUser>>>
}

export type B2BAccount_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type B2BAccountCollection = {
  __typename?: "B2BAccountCollection"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<B2BAccountCollection>
  items?: Maybe<Array<Maybe<B2BAccount>>>
  pageCount: Scalars["Int"]
  pageSize: Scalars["Int"]
  startIndex: Scalars["Int"]
  totalCount: Scalars["Int"]
}

export type B2BAccountCollection_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type B2BAccountInput = {
  accountType?: Maybe<Scalars["String"]>
  approvalStatus?: Maybe<Scalars["String"]>
  attributes?: Maybe<Array<Maybe<CustomerAttributeInput>>>
  auditInfo?: Maybe<CuAuditInfoInput>
  commerceSummary?: Maybe<CommerceSummaryInput>
  companyOrOrganization?: Maybe<Scalars["String"]>
  contacts?: Maybe<Array<Maybe<CustomerContactInput>>>
  customerSet?: Maybe<Scalars["String"]>
  customerSinceDate?: Maybe<Scalars["DateTime"]>
  externalId?: Maybe<Scalars["String"]>
  id: Scalars["Int"]
  isActive?: Maybe<Scalars["Boolean"]>
  notes?: Maybe<Array<Maybe<CustomerNoteInput>>>
  parentAccountId?: Maybe<Scalars["Int"]>
  priceList?: Maybe<Scalars["String"]>
  rootAccountId?: Maybe<Scalars["Int"]>
  salesReps?: Maybe<Array<Maybe<AccountSalesRepInput>>>
  segments?: Maybe<Array<Maybe<CustomerSegmentInput>>>
  taxId?: Maybe<Scalars["String"]>
  users?: Maybe<Array<Maybe<B2BUserInput>>>
}

export type B2BUser = {
  __typename?: "B2BUser"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<B2BUser>
  acceptsMarketing?: Maybe<Scalars["Boolean"]>
  emailAddress?: Maybe<Scalars["String"]>
  firstName?: Maybe<Scalars["String"]>
  hasExternalPassword?: Maybe<Scalars["Boolean"]>
  isActive?: Maybe<Scalars["Boolean"]>
  isLocked?: Maybe<Scalars["Boolean"]>
  isRemoved?: Maybe<Scalars["Boolean"]>
  lastName?: Maybe<Scalars["String"]>
  localeCode?: Maybe<Scalars["String"]>
  roles?: Maybe<Array<Maybe<UserRole>>>
  userId?: Maybe<Scalars["String"]>
  userName?: Maybe<Scalars["String"]>
}

export type B2BUser_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type B2BUserAndAuthInfoInput = {
  b2BUser?: Maybe<B2BUserInput>
  externalPassword?: Maybe<Scalars["String"]>
  isImport?: Maybe<Scalars["Boolean"]>
}

export type B2BUserCollection = {
  __typename?: "B2BUserCollection"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<B2BUserCollection>
  items?: Maybe<Array<Maybe<B2BUser>>>
  pageCount: Scalars["Int"]
  pageSize: Scalars["Int"]
  startIndex: Scalars["Int"]
  totalCount: Scalars["Int"]
}

export type B2BUserCollection_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type B2BUserInput = {
  acceptsMarketing?: Maybe<Scalars["Boolean"]>
  emailAddress?: Maybe<Scalars["String"]>
  firstName?: Maybe<Scalars["String"]>
  hasExternalPassword?: Maybe<Scalars["Boolean"]>
  isActive?: Maybe<Scalars["Boolean"]>
  isLocked?: Maybe<Scalars["Boolean"]>
  isRemoved?: Maybe<Scalars["Boolean"]>
  lastName?: Maybe<Scalars["String"]>
  localeCode?: Maybe<Scalars["String"]>
  roles?: Maybe<Array<Maybe<UserRoleInput>>>
  userId?: Maybe<Scalars["String"]>
  userName?: Maybe<Scalars["String"]>
}

export type BillingInfo = {
  __typename?: "BillingInfo"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<BillingInfo>
  auditInfo?: Maybe<CrAuditInfo>
  billingContact?: Maybe<Contact>
  card?: Maybe<PaymentCard>
  check?: Maybe<CheckPayment>
  customCreditType?: Maybe<Scalars["String"]>
  data?: Maybe<Scalars["Object"]>
  externalTransactionId?: Maybe<Scalars["String"]>
  isSameBillingShippingAddress?: Maybe<Scalars["Boolean"]>
  paymentType?: Maybe<Scalars["String"]>
  paymentWorkflow?: Maybe<Scalars["String"]>
  purchaseOrder?: Maybe<PurchaseOrderPayment>
  storeCreditCode?: Maybe<Scalars["String"]>
  storeCreditType?: Maybe<Scalars["String"]>
  token?: Maybe<PaymentToken>
}

export type BillingInfo_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type BillingInfoInput = {
  auditInfo?: Maybe<CrAuditInfoInput>
  billingContact?: Maybe<ContactInput>
  card?: Maybe<PaymentCardInput>
  check?: Maybe<CheckPaymentInput>
  customCreditType?: Maybe<Scalars["String"]>
  data?: Maybe<Scalars["Object"]>
  externalTransactionId?: Maybe<Scalars["String"]>
  isSameBillingShippingAddress?: Maybe<Scalars["Boolean"]>
  paymentType?: Maybe<Scalars["String"]>
  paymentWorkflow?: Maybe<Scalars["String"]>
  purchaseOrder?: Maybe<PurchaseOrderPaymentInput>
  storeCreditCode?: Maybe<Scalars["String"]>
  storeCreditType?: Maybe<Scalars["String"]>
  token?: Maybe<PaymentTokenInput>
}

export type BoxType = {
  __typename?: "BoxType"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<BoxType>
  height?: Maybe<Scalars["Float"]>
  length?: Maybe<Scalars["Float"]>
  name?: Maybe<Scalars["String"]>
  width?: Maybe<Scalars["Float"]>
}

export type BoxType_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type BpmConfiguration = {
  __typename?: "BpmConfiguration"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<BpmConfiguration>
  shipmentType?: Maybe<Scalars["String"]>
  workflowContainerId?: Maybe<Scalars["String"]>
  workflowProcessId?: Maybe<Scalars["String"]>
}

export type BpmConfiguration_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type BundledProductSummary = {
  __typename?: "BundledProductSummary"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<BundledProductSummary>
  creditValue?: Maybe<Scalars["Float"]>
  goodsType?: Maybe<Scalars["String"]>
  inventoryInfo?: Maybe<ProductInventoryInfo>
  isPackagedStandAlone?: Maybe<Scalars["Boolean"]>
  measurements?: Maybe<PrPackageMeasurements>
  optionAttributeFQN?: Maybe<Scalars["String"]>
  optionValue?: Maybe<Scalars["Object"]>
  productCode?: Maybe<Scalars["String"]>
  productName?: Maybe<Scalars["String"]>
  productShortDescription?: Maybe<Scalars["String"]>
  productType?: Maybe<Scalars["String"]>
  quantity: Scalars["Int"]
}

export type BundledProductSummary_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export enum BundlingStrategyEnum {
  ItemDependency = "ITEM_DEPENDENCY",
}

export type CancelReasonCollection = {
  __typename?: "CancelReasonCollection"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<CancelReasonCollection>
  items?: Maybe<Array<Maybe<CancelReasonItem>>>
  totalCount: Scalars["Int"]
}

export type CancelReasonCollection_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type CancelReasonItem = {
  __typename?: "CancelReasonItem"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<CancelReasonItem>
  name?: Maybe<Scalars["String"]>
  needsMoreInfo?: Maybe<Scalars["Boolean"]>
  reasonCode?: Maybe<Scalars["String"]>
}

export type CancelReasonItem_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type CanceledItem = {
  __typename?: "CanceledItem"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<CanceledItem>
  actualPrice: Scalars["Float"]
  auditInfo?: Maybe<CrAuditInfo>
  backorderReleaseDate?: Maybe<Scalars["DateTime"]>
  canceledReason?: Maybe<CanceledReason>
  childItemIds?: Maybe<Array<Scalars["String"]>>
  data?: Maybe<Scalars["Object"]>
  duty: Scalars["Float"]
  fulfillmentFields?: Maybe<Array<Maybe<FulfillmentField>>>
  fulfillmentLocationCode?: Maybe<Scalars["String"]>
  giftCards?: Maybe<Array<Maybe<GiftCard>>>
  handling: Scalars["Float"]
  handlingDiscount: Scalars["Float"]
  handlingTax: Scalars["Float"]
  imageUrl?: Maybe<Scalars["String"]>
  isAssemblyRequired?: Maybe<Scalars["Boolean"]>
  isPackagedStandAlone?: Maybe<Scalars["Boolean"]>
  isTaxable?: Maybe<Scalars["Boolean"]>
  itemDiscount: Scalars["Float"]
  itemTax: Scalars["Float"]
  lineId: Scalars["Int"]
  lineItemCost: Scalars["Float"]
  locatorName?: Maybe<Scalars["String"]>
  measurements?: Maybe<CrPackageMeasurements>
  name?: Maybe<Scalars["String"]>
  optionAttributeFQN?: Maybe<Scalars["String"]>
  options?: Maybe<Array<Maybe<CrProductOption>>>
  originalOrderItemId?: Maybe<Scalars["String"]>
  overridePrice?: Maybe<Scalars["Float"]>
  parentId?: Maybe<Scalars["String"]>
  parentItemId?: Maybe<Scalars["String"]>
  productCode?: Maybe<Scalars["String"]>
  quantity: Scalars["Int"]
  readyForPickupQuantity?: Maybe<Scalars["Int"]>
  shipping: Scalars["Float"]
  shippingDiscount: Scalars["Float"]
  shippingTax: Scalars["Float"]
  taxData?: Maybe<Scalars["Object"]>
  taxableHandling: Scalars["Float"]
  taxableLineItemCost: Scalars["Float"]
  taxableShipping: Scalars["Float"]
  unitPrice: Scalars["Float"]
  variationProductCode?: Maybe<Scalars["String"]>
  weightedDutyAdjustment: Scalars["Float"]
  weightedHandlingAdjustment: Scalars["Float"]
  weightedHandlingTaxAdjustment: Scalars["Float"]
  weightedLineItemTaxAdjustment: Scalars["Float"]
  weightedShipmentAdjustment: Scalars["Float"]
  weightedShippingAdjustment: Scalars["Float"]
  weightedShippingTaxAdjustment: Scalars["Float"]
}

export type CanceledItem_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type CanceledItemInput = {
  actualPrice: Scalars["Float"]
  auditInfo?: Maybe<CrAuditInfoInput>
  backorderReleaseDate?: Maybe<Scalars["DateTime"]>
  canceledReason?: Maybe<CanceledReasonInput>
  childItemIds?: Maybe<Array<Scalars["String"]>>
  data?: Maybe<Scalars["Object"]>
  duty: Scalars["Float"]
  fulfillmentFields?: Maybe<Array<Maybe<FulfillmentFieldInput>>>
  fulfillmentLocationCode?: Maybe<Scalars["String"]>
  giftCards?: Maybe<Array<Maybe<GiftCardInput>>>
  handling: Scalars["Float"]
  handlingDiscount: Scalars["Float"]
  handlingTax: Scalars["Float"]
  imageUrl?: Maybe<Scalars["String"]>
  isAssemblyRequired?: Maybe<Scalars["Boolean"]>
  isPackagedStandAlone?: Maybe<Scalars["Boolean"]>
  isTaxable?: Maybe<Scalars["Boolean"]>
  itemDiscount: Scalars["Float"]
  itemTax: Scalars["Float"]
  lineId: Scalars["Int"]
  lineItemCost: Scalars["Float"]
  locatorName?: Maybe<Scalars["String"]>
  measurements?: Maybe<CrPackageMeasurementsInput>
  name?: Maybe<Scalars["String"]>
  optionAttributeFQN?: Maybe<Scalars["String"]>
  options?: Maybe<Array<Maybe<CrProductOptionInput>>>
  originalOrderItemId?: Maybe<Scalars["String"]>
  overridePrice?: Maybe<Scalars["Float"]>
  parentId?: Maybe<Scalars["String"]>
  parentItemId?: Maybe<Scalars["String"]>
  productCode?: Maybe<Scalars["String"]>
  quantity: Scalars["Int"]
  readyForPickupQuantity?: Maybe<Scalars["Int"]>
  shipping: Scalars["Float"]
  shippingDiscount: Scalars["Float"]
  shippingTax: Scalars["Float"]
  taxData?: Maybe<Scalars["Object"]>
  taxableHandling: Scalars["Float"]
  taxableLineItemCost: Scalars["Float"]
  taxableShipping: Scalars["Float"]
  unitPrice: Scalars["Float"]
  variationProductCode?: Maybe<Scalars["String"]>
  weightedDutyAdjustment: Scalars["Float"]
  weightedHandlingAdjustment: Scalars["Float"]
  weightedHandlingTaxAdjustment: Scalars["Float"]
  weightedLineItemTaxAdjustment: Scalars["Float"]
  weightedShipmentAdjustment: Scalars["Float"]
  weightedShippingAdjustment: Scalars["Float"]
  weightedShippingTaxAdjustment: Scalars["Float"]
}

export type CanceledReason = {
  __typename?: "CanceledReason"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<CanceledReason>
  description?: Maybe<Scalars["String"]>
  moreInfo?: Maybe<Scalars["String"]>
  reasonCode?: Maybe<Scalars["String"]>
}

export type CanceledReason_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type CanceledReasonInput = {
  description?: Maybe<Scalars["String"]>
  moreInfo?: Maybe<Scalars["String"]>
  reasonCode?: Maybe<Scalars["String"]>
}

export type CapturableShipmentSummary = {
  __typename?: "CapturableShipmentSummary"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<CapturableShipmentSummary>
  amountApplied: Scalars["Float"]
  shipmentNumber: Scalars["Int"]
  shipmentTotal: Scalars["Float"]
}

export type CapturableShipmentSummary_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type CapturableShipmentSummaryInput = {
  amountApplied: Scalars["Float"]
  shipmentNumber: Scalars["Int"]
  shipmentTotal: Scalars["Float"]
}

export type Card = {
  __typename?: "Card"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<Card>
  cardNumberPart?: Maybe<Scalars["String"]>
  cardType?: Maybe<Scalars["String"]>
  contactId: Scalars["Int"]
  expireMonth?: Maybe<Scalars["Int"]>
  expireYear?: Maybe<Scalars["Int"]>
  id?: Maybe<Scalars["String"]>
  isDefaultPayMethod?: Maybe<Scalars["Boolean"]>
  nameOnCard?: Maybe<Scalars["String"]>
}

export type Card_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type CardCollection = {
  __typename?: "CardCollection"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<CardCollection>
  items?: Maybe<Array<Maybe<Card>>>
  totalCount: Scalars["Int"]
}

export type CardCollection_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type CardInput = {
  cardNumberPart?: Maybe<Scalars["String"]>
  cardType?: Maybe<Scalars["String"]>
  contactId: Scalars["Int"]
  expireMonth?: Maybe<Scalars["Int"]>
  expireYear?: Maybe<Scalars["Int"]>
  id?: Maybe<Scalars["String"]>
  isDefaultPayMethod?: Maybe<Scalars["Boolean"]>
  nameOnCard?: Maybe<Scalars["String"]>
}

export type Carrier = {
  __typename?: "Carrier"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<Carrier>
  carrierType?: Maybe<Scalars["String"]>
  isEnabled?: Maybe<Scalars["Boolean"]>
  shippingMethodMappings?: Maybe<ShippingMethodMappings>
}

export type Carrier_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type CarrierServiceGenerateLabelResponse = {
  __typename?: "CarrierServiceGenerateLabelResponse"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<CarrierServiceGenerateLabelResponse>
  imageURL?: Maybe<Scalars["String"]>
  integratorId?: Maybe<Scalars["String"]>
  price?: Maybe<Scalars["Float"]>
  trackingNumber?: Maybe<Scalars["String"]>
}

export type CarrierServiceGenerateLabelResponse_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type Cart = {
  __typename?: "Cart"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<Cart>
  auditInfo?: Maybe<CrAuditInfo>
  cartMessage?: Maybe<CartMessage>
  cartMessages?: Maybe<Array<Maybe<CartMessage>>>
  changeMessages?: Maybe<Array<Maybe<ChangeMessage>>>
  channelCode?: Maybe<Scalars["String"]>
  couponCodes?: Maybe<Array<Scalars["String"]>>
  currencyCode?: Maybe<Scalars["String"]>
  customerInteractionType?: Maybe<Scalars["String"]>
  data?: Maybe<Scalars["Object"]>
  discountThresholdMessages?: Maybe<Array<Maybe<ThresholdMessage>>>
  discountTotal?: Maybe<Scalars["Float"]>
  discountedSubtotal?: Maybe<Scalars["Float"]>
  discountedTotal?: Maybe<Scalars["Float"]>
  expirationDate?: Maybe<Scalars["DateTime"]>
  extendedProperties?: Maybe<Array<Maybe<ExtendedProperty>>>
  feeTotal?: Maybe<Scalars["Float"]>
  fulfillmentInfo?: Maybe<FulfillmentInfo>
  handlingAmount?: Maybe<Scalars["Float"]>
  handlingSubTotal?: Maybe<Scalars["Float"]>
  handlingTaxTotal?: Maybe<Scalars["Float"]>
  handlingTotal?: Maybe<Scalars["Float"]>
  id?: Maybe<Scalars["String"]>
  invalidCoupons?: Maybe<Array<Maybe<InvalidCoupon>>>
  itemTaxTotal?: Maybe<Scalars["Float"]>
  items?: Maybe<Array<Maybe<CartItem>>>
  lastValidationDate?: Maybe<Scalars["DateTime"]>
  lineItemSubtotalWithOrderAdjustments?: Maybe<Scalars["Float"]>
  orderDiscounts?: Maybe<Array<Maybe<CrAppliedDiscount>>>
  priceListCode?: Maybe<Scalars["String"]>
  rejectedDiscounts?: Maybe<Array<Maybe<SuggestedDiscount>>>
  shippingAmountBeforeDiscountsAndAdjustments?: Maybe<Scalars["Float"]>
  shippingSubTotal?: Maybe<Scalars["Float"]>
  shippingTaxTotal?: Maybe<Scalars["Float"]>
  shippingTotal?: Maybe<Scalars["Float"]>
  siteId?: Maybe<Scalars["Int"]>
  subtotal?: Maybe<Scalars["Float"]>
  suggestedDiscounts?: Maybe<Array<Maybe<SuggestedDiscount>>>
  taxData?: Maybe<Scalars["Object"]>
  taxTotal?: Maybe<Scalars["Float"]>
  tenantId?: Maybe<Scalars["Int"]>
  total?: Maybe<Scalars["Float"]>
  userId?: Maybe<Scalars["String"]>
  visitId?: Maybe<Scalars["String"]>
  webSessionId?: Maybe<Scalars["String"]>
}

export type Cart_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type CartChangeMessageCollection = {
  __typename?: "CartChangeMessageCollection"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<CartChangeMessageCollection>
  items?: Maybe<Array<Maybe<ChangeMessage>>>
  totalCount: Scalars["Int"]
}

export type CartChangeMessageCollection_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type CartInput = {
  auditInfo?: Maybe<CrAuditInfoInput>
  cartMessage?: Maybe<CartMessageInput>
  cartMessages?: Maybe<Array<Maybe<CartMessageInput>>>
  changeMessages?: Maybe<Array<Maybe<ChangeMessageInput>>>
  channelCode?: Maybe<Scalars["String"]>
  couponCodes?: Maybe<Array<Scalars["String"]>>
  currencyCode?: Maybe<Scalars["String"]>
  customerInteractionType?: Maybe<Scalars["String"]>
  data?: Maybe<Scalars["Object"]>
  discountThresholdMessages?: Maybe<Array<Maybe<ThresholdMessageInput>>>
  discountTotal?: Maybe<Scalars["Float"]>
  discountedSubtotal?: Maybe<Scalars["Float"]>
  discountedTotal?: Maybe<Scalars["Float"]>
  expirationDate?: Maybe<Scalars["DateTime"]>
  extendedProperties?: Maybe<Array<Maybe<ExtendedPropertyInput>>>
  feeTotal?: Maybe<Scalars["Float"]>
  fulfillmentInfo?: Maybe<FulfillmentInfoInput>
  handlingAmount?: Maybe<Scalars["Float"]>
  handlingSubTotal?: Maybe<Scalars["Float"]>
  handlingTaxTotal?: Maybe<Scalars["Float"]>
  handlingTotal?: Maybe<Scalars["Float"]>
  id?: Maybe<Scalars["String"]>
  invalidCoupons?: Maybe<Array<Maybe<InvalidCouponInput>>>
  itemTaxTotal?: Maybe<Scalars["Float"]>
  items?: Maybe<Array<Maybe<CartItemInput>>>
  lastValidationDate?: Maybe<Scalars["DateTime"]>
  lineItemSubtotalWithOrderAdjustments?: Maybe<Scalars["Float"]>
  orderDiscounts?: Maybe<Array<Maybe<CrAppliedDiscountInput>>>
  priceListCode?: Maybe<Scalars["String"]>
  rejectedDiscounts?: Maybe<Array<Maybe<SuggestedDiscountInput>>>
  shippingAmountBeforeDiscountsAndAdjustments?: Maybe<Scalars["Float"]>
  shippingSubTotal?: Maybe<Scalars["Float"]>
  shippingTaxTotal?: Maybe<Scalars["Float"]>
  shippingTotal?: Maybe<Scalars["Float"]>
  siteId?: Maybe<Scalars["Int"]>
  subtotal?: Maybe<Scalars["Float"]>
  suggestedDiscounts?: Maybe<Array<Maybe<SuggestedDiscountInput>>>
  taxData?: Maybe<Scalars["Object"]>
  taxTotal?: Maybe<Scalars["Float"]>
  tenantId?: Maybe<Scalars["Int"]>
  total?: Maybe<Scalars["Float"]>
  userId?: Maybe<Scalars["String"]>
  visitId?: Maybe<Scalars["String"]>
  webSessionId?: Maybe<Scalars["String"]>
}

export type CartItem = {
  __typename?: "CartItem"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<CartItem>
  adjustedLineItemSubtotal?: Maybe<Scalars["Float"]>
  auditInfo?: Maybe<CrAuditInfo>
  autoAddDiscountId?: Maybe<Scalars["Int"]>
  childItemIds?: Maybe<Array<Scalars["String"]>>
  data?: Maybe<Scalars["Object"]>
  discountTotal?: Maybe<Scalars["Float"]>
  discountedTotal?: Maybe<Scalars["Float"]>
  extendedTotal?: Maybe<Scalars["Float"]>
  feeTotal?: Maybe<Scalars["Float"]>
  fulfillmentLocationCode?: Maybe<Scalars["String"]>
  fulfillmentMethod?: Maybe<Scalars["String"]>
  handlingAmount?: Maybe<Scalars["Float"]>
  id?: Maybe<Scalars["String"]>
  isAssemblyRequired?: Maybe<Scalars["Boolean"]>
  isRecurring?: Maybe<Scalars["Boolean"]>
  isTaxable?: Maybe<Scalars["Boolean"]>
  itemTaxTotal?: Maybe<Scalars["Float"]>
  lineId?: Maybe<Scalars["Int"]>
  localeCode?: Maybe<Scalars["String"]>
  parentItemId?: Maybe<Scalars["String"]>
  product?: Maybe<CrProduct>
  productDiscount?: Maybe<AppliedLineItemProductDiscount>
  productDiscounts?: Maybe<Array<Maybe<AppliedLineItemProductDiscount>>>
  purchaseLocation?: Maybe<Scalars["String"]>
  quantity: Scalars["Int"]
  shippingAmountBeforeDiscountsAndAdjustments?: Maybe<Scalars["Float"]>
  shippingDiscounts?: Maybe<Array<Maybe<AppliedLineItemShippingDiscount>>>
  shippingTaxTotal?: Maybe<Scalars["Float"]>
  shippingTotal?: Maybe<Scalars["Float"]>
  subtotal?: Maybe<Scalars["Float"]>
  taxData?: Maybe<Scalars["Object"]>
  taxableTotal?: Maybe<Scalars["Float"]>
  total?: Maybe<Scalars["Float"]>
  totalWithWeightedShippingAndHandling?: Maybe<Scalars["Float"]>
  totalWithoutWeightedShippingAndHandling?: Maybe<Scalars["Float"]>
  unitPrice?: Maybe<CommerceUnitPrice>
  weightedOrderAdjustment?: Maybe<Scalars["Float"]>
  weightedOrderDiscount?: Maybe<Scalars["Float"]>
  weightedOrderDuty?: Maybe<Scalars["Float"]>
  weightedOrderHandlingAdjustment?: Maybe<Scalars["Float"]>
  weightedOrderHandlingFee?: Maybe<Scalars["Float"]>
  weightedOrderHandlingFeeDiscount?: Maybe<Scalars["Float"]>
  weightedOrderHandlingFeeTax?: Maybe<Scalars["Float"]>
  weightedOrderShipping?: Maybe<Scalars["Float"]>
  weightedOrderShippingDiscount?: Maybe<Scalars["Float"]>
  weightedOrderShippingManualAdjustment?: Maybe<Scalars["Float"]>
  weightedOrderShippingTax?: Maybe<Scalars["Float"]>
  weightedOrderTax?: Maybe<Scalars["Float"]>
}

export type CartItem_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type CartItemCollection = {
  __typename?: "CartItemCollection"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<CartItemCollection>
  items?: Maybe<Array<Maybe<CartItem>>>
  totalCount: Scalars["Int"]
}

export type CartItemCollection_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type CartItemInput = {
  adjustedLineItemSubtotal?: Maybe<Scalars["Float"]>
  auditInfo?: Maybe<CrAuditInfoInput>
  autoAddDiscountId?: Maybe<Scalars["Int"]>
  childItemIds?: Maybe<Array<Scalars["String"]>>
  data?: Maybe<Scalars["Object"]>
  discountTotal?: Maybe<Scalars["Float"]>
  discountedTotal?: Maybe<Scalars["Float"]>
  extendedTotal?: Maybe<Scalars["Float"]>
  feeTotal?: Maybe<Scalars["Float"]>
  fulfillmentLocationCode?: Maybe<Scalars["String"]>
  fulfillmentMethod?: Maybe<Scalars["String"]>
  handlingAmount?: Maybe<Scalars["Float"]>
  id?: Maybe<Scalars["String"]>
  isAssemblyRequired?: Maybe<Scalars["Boolean"]>
  isRecurring?: Maybe<Scalars["Boolean"]>
  isTaxable?: Maybe<Scalars["Boolean"]>
  itemTaxTotal?: Maybe<Scalars["Float"]>
  lineId?: Maybe<Scalars["Int"]>
  localeCode?: Maybe<Scalars["String"]>
  parentItemId?: Maybe<Scalars["String"]>
  product?: Maybe<CrProductInput>
  productDiscount?: Maybe<AppliedLineItemProductDiscountInput>
  productDiscounts?: Maybe<Array<Maybe<AppliedLineItemProductDiscountInput>>>
  purchaseLocation?: Maybe<Scalars["String"]>
  quantity: Scalars["Int"]
  shippingAmountBeforeDiscountsAndAdjustments?: Maybe<Scalars["Float"]>
  shippingDiscounts?: Maybe<Array<Maybe<AppliedLineItemShippingDiscountInput>>>
  shippingTaxTotal?: Maybe<Scalars["Float"]>
  shippingTotal?: Maybe<Scalars["Float"]>
  subtotal?: Maybe<Scalars["Float"]>
  taxData?: Maybe<Scalars["Object"]>
  taxableTotal?: Maybe<Scalars["Float"]>
  total?: Maybe<Scalars["Float"]>
  totalWithWeightedShippingAndHandling?: Maybe<Scalars["Float"]>
  totalWithoutWeightedShippingAndHandling?: Maybe<Scalars["Float"]>
  unitPrice?: Maybe<CommerceUnitPriceInput>
  weightedOrderAdjustment?: Maybe<Scalars["Float"]>
  weightedOrderDiscount?: Maybe<Scalars["Float"]>
  weightedOrderDuty?: Maybe<Scalars["Float"]>
  weightedOrderHandlingAdjustment?: Maybe<Scalars["Float"]>
  weightedOrderHandlingFee?: Maybe<Scalars["Float"]>
  weightedOrderHandlingFeeDiscount?: Maybe<Scalars["Float"]>
  weightedOrderHandlingFeeTax?: Maybe<Scalars["Float"]>
  weightedOrderShipping?: Maybe<Scalars["Float"]>
  weightedOrderShippingDiscount?: Maybe<Scalars["Float"]>
  weightedOrderShippingManualAdjustment?: Maybe<Scalars["Float"]>
  weightedOrderShippingTax?: Maybe<Scalars["Float"]>
  weightedOrderTax?: Maybe<Scalars["Float"]>
}

export type CartMessage = {
  __typename?: "CartMessage"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<CartMessage>
  message?: Maybe<Scalars["String"]>
  messageType?: Maybe<Scalars["String"]>
  productsRemoved?: Maybe<Array<Maybe<CrProduct>>>
}

export type CartMessage_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type CartMessageInput = {
  message?: Maybe<Scalars["String"]>
  messageType?: Maybe<Scalars["String"]>
  productsRemoved?: Maybe<Array<Maybe<CrProductInput>>>
}

export type CartSummary = {
  __typename?: "CartSummary"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<CartSummary>
  hasActiveCart?: Maybe<Scalars["Boolean"]>
  isExpired?: Maybe<Scalars["Boolean"]>
  itemCount?: Maybe<Scalars["Int"]>
  total?: Maybe<Scalars["Float"]>
  totalQuantity?: Maybe<Scalars["Int"]>
}

export type CartSummary_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type CategoryCollection = {
  __typename?: "CategoryCollection"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<CategoryCollection>
  items?: Maybe<Array<Maybe<PrCategory>>>
  totalCount: Scalars["Int"]
}

export type CategoryCollection_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type CategoryContent = {
  __typename?: "CategoryContent"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<CategoryContent>
  categoryImages?: Maybe<Array<Maybe<CategoryImage>>>
  description?: Maybe<Scalars["String"]>
  metaTagDescription?: Maybe<Scalars["String"]>
  metaTagKeywords?: Maybe<Scalars["String"]>
  metaTagTitle?: Maybe<Scalars["String"]>
  name?: Maybe<Scalars["String"]>
  pageTitle?: Maybe<Scalars["String"]>
  slug?: Maybe<Scalars["String"]>
}

export type CategoryContent_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type CategoryImage = {
  __typename?: "CategoryImage"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<CategoryImage>
  altText?: Maybe<Scalars["String"]>
  cmsId?: Maybe<Scalars["String"]>
  imageLabel?: Maybe<Scalars["String"]>
  imageUrl?: Maybe<Scalars["String"]>
  mediaType?: Maybe<Scalars["String"]>
  sequence?: Maybe<Scalars["Int"]>
  videoUrl?: Maybe<Scalars["String"]>
}

export type CategoryImage_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type CategoryPagedCollection = {
  __typename?: "CategoryPagedCollection"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<CategoryPagedCollection>
  items?: Maybe<Array<Maybe<PrCategory>>>
  pageCount: Scalars["Int"]
  pageSize: Scalars["Int"]
  startIndex: Scalars["Int"]
  totalCount: Scalars["Int"]
}

export type CategoryPagedCollection_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type ChangeMessage = {
  __typename?: "ChangeMessage"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<ChangeMessage>
  amount?: Maybe<Scalars["Float"]>
  appId?: Maybe<Scalars["String"]>
  appKey?: Maybe<Scalars["String"]>
  appName?: Maybe<Scalars["String"]>
  attributes?: Maybe<Scalars["Object"]>
  correlationId?: Maybe<Scalars["String"]>
  createDate?: Maybe<Scalars["DateTime"]>
  id?: Maybe<Scalars["String"]>
  identifier?: Maybe<Scalars["String"]>
  message?: Maybe<Scalars["String"]>
  metadata?: Maybe<Scalars["Object"]>
  newValue?: Maybe<Scalars["String"]>
  oldValue?: Maybe<Scalars["String"]>
  subject?: Maybe<Scalars["String"]>
  subjectType?: Maybe<Scalars["String"]>
  success?: Maybe<Scalars["Boolean"]>
  userFirstName?: Maybe<Scalars["String"]>
  userId?: Maybe<Scalars["String"]>
  userLastName?: Maybe<Scalars["String"]>
  userScopeType?: Maybe<Scalars["String"]>
  verb?: Maybe<Scalars["String"]>
}

export type ChangeMessage_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type ChangeMessageInput = {
  amount?: Maybe<Scalars["Float"]>
  appId?: Maybe<Scalars["String"]>
  appKey?: Maybe<Scalars["String"]>
  appName?: Maybe<Scalars["String"]>
  attributes?: Maybe<Scalars["Object"]>
  correlationId?: Maybe<Scalars["String"]>
  createDate?: Maybe<Scalars["DateTime"]>
  id?: Maybe<Scalars["String"]>
  identifier?: Maybe<Scalars["String"]>
  message?: Maybe<Scalars["String"]>
  metadata?: Maybe<Scalars["Object"]>
  newValue?: Maybe<Scalars["String"]>
  oldValue?: Maybe<Scalars["String"]>
  subject?: Maybe<Scalars["String"]>
  subjectType?: Maybe<Scalars["String"]>
  success?: Maybe<Scalars["Boolean"]>
  userFirstName?: Maybe<Scalars["String"]>
  userId?: Maybe<Scalars["String"]>
  userLastName?: Maybe<Scalars["String"]>
  userScopeType?: Maybe<Scalars["String"]>
  verb?: Maybe<Scalars["String"]>
}

export type ChangePasswordResult = {
  __typename?: "ChangePasswordResult"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<ChangePasswordResult>
  accountId: Scalars["Int"]
  errorMessage?: Maybe<Scalars["String"]>
  succeeded?: Maybe<Scalars["Boolean"]>
}

export type ChangePasswordResult_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type ChangePasswordResultCollection = {
  __typename?: "ChangePasswordResultCollection"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<ChangePasswordResultCollection>
  items?: Maybe<Array<Maybe<ChangePasswordResult>>>
  totalCount: Scalars["Int"]
}

export type ChangePasswordResultCollection_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type Channel = {
  __typename?: "Channel"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<Channel>
  auditInfo?: Maybe<CrAuditInfo>
  code?: Maybe<Scalars["String"]>
  countryCode?: Maybe<Scalars["String"]>
  groupCode?: Maybe<Scalars["String"]>
  name?: Maybe<Scalars["String"]>
  region?: Maybe<Scalars["String"]>
  siteIds?: Maybe<Array<Scalars["Int"]>>
  tenantId: Scalars["Int"]
}

export type Channel_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type ChannelCollection = {
  __typename?: "ChannelCollection"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<ChannelCollection>
  items?: Maybe<Array<Maybe<Channel>>>
  pageCount: Scalars["Int"]
  pageSize: Scalars["Int"]
  startIndex: Scalars["Int"]
  totalCount: Scalars["Int"]
}

export type ChannelCollection_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type ChannelGroup = {
  __typename?: "ChannelGroup"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<ChannelGroup>
  auditInfo?: Maybe<CrAuditInfo>
  code?: Maybe<Scalars["String"]>
  name?: Maybe<Scalars["String"]>
  tenantId: Scalars["Int"]
}

export type ChannelGroup_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type ChannelGroupCollection = {
  __typename?: "ChannelGroupCollection"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<ChannelGroupCollection>
  items?: Maybe<Array<Maybe<ChannelGroup>>>
  pageCount: Scalars["Int"]
  pageSize: Scalars["Int"]
  startIndex: Scalars["Int"]
  totalCount: Scalars["Int"]
}

export type ChannelGroupCollection_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type ChannelGroupInput = {
  auditInfo?: Maybe<CrAuditInfoInput>
  code?: Maybe<Scalars["String"]>
  name?: Maybe<Scalars["String"]>
  tenantId: Scalars["Int"]
}

export type ChannelInput = {
  auditInfo?: Maybe<CrAuditInfoInput>
  code?: Maybe<Scalars["String"]>
  countryCode?: Maybe<Scalars["String"]>
  groupCode?: Maybe<Scalars["String"]>
  name?: Maybe<Scalars["String"]>
  region?: Maybe<Scalars["String"]>
  siteIds?: Maybe<Array<Scalars["Int"]>>
  tenantId: Scalars["Int"]
}

export type CheckPayment = {
  __typename?: "CheckPayment"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<CheckPayment>
  checkNumber?: Maybe<Scalars["String"]>
}

export type CheckPayment_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type CheckPaymentInput = {
  checkNumber?: Maybe<Scalars["String"]>
}

export type Checkout = {
  __typename?: "Checkout"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<Checkout>
  acceptsMarketing?: Maybe<Scalars["Boolean"]>
  amountRemainingForPayment: Scalars["Float"]
  attributes?: Maybe<Array<Maybe<OrderAttribute>>>
  auditInfo?: Maybe<CrAuditInfo>
  availableActions?: Maybe<Array<Scalars["String"]>>
  channelCode?: Maybe<Scalars["String"]>
  couponCodes?: Maybe<Array<Scalars["String"]>>
  currencyCode?: Maybe<Scalars["String"]>
  customerAccountId?: Maybe<Scalars["Int"]>
  customerInteractionType?: Maybe<Scalars["String"]>
  customerTaxId?: Maybe<Scalars["String"]>
  data?: Maybe<Scalars["Object"]>
  destinations?: Maybe<Array<Maybe<Destination>>>
  discountThresholdMessages?: Maybe<Array<Maybe<ThresholdMessage>>>
  dutyTotal?: Maybe<Scalars["Float"]>
  email?: Maybe<Scalars["String"]>
  feeTotal: Scalars["Float"]
  groupings?: Maybe<Array<Maybe<CheckoutGrouping>>>
  handlingSubTotal: Scalars["Float"]
  handlingTaxTotal: Scalars["Float"]
  handlingTotal: Scalars["Float"]
  id?: Maybe<Scalars["String"]>
  invalidCoupons?: Maybe<Array<Maybe<InvalidCoupon>>>
  ipAddress?: Maybe<Scalars["String"]>
  isTaxExempt?: Maybe<Scalars["Boolean"]>
  itemLevelHandlingDiscountTotal: Scalars["Float"]
  itemLevelProductDiscountTotal: Scalars["Float"]
  itemLevelShippingDiscountTotal: Scalars["Float"]
  itemTaxTotal: Scalars["Float"]
  itemTotal: Scalars["Float"]
  items?: Maybe<Array<Maybe<CrOrderItem>>>
  locationCode?: Maybe<Scalars["String"]>
  number?: Maybe<Scalars["Int"]>
  orderDiscounts?: Maybe<Array<Maybe<CrAppliedDiscount>>>
  orderLevelHandlingDiscountTotal: Scalars["Float"]
  orderLevelProductDiscountTotal: Scalars["Float"]
  orderLevelShippingDiscountTotal: Scalars["Float"]
  originalCartId?: Maybe<Scalars["String"]>
  payments?: Maybe<Array<Maybe<Payment>>>
  priceListCode?: Maybe<Scalars["String"]>
  shippingSubTotal: Scalars["Float"]
  shippingTaxTotal: Scalars["Float"]
  shippingTotal: Scalars["Float"]
  shopperNotes?: Maybe<ShopperNotes>
  siteId: Scalars["Int"]
  sourceDevice?: Maybe<Scalars["String"]>
  subTotal: Scalars["Float"]
  submittedDate?: Maybe<Scalars["DateTime"]>
  suggestedDiscounts?: Maybe<Array<Maybe<SuggestedDiscount>>>
  taxData?: Maybe<Scalars["Object"]>
  tenantId: Scalars["Int"]
  total: Scalars["Float"]
  type?: Maybe<Scalars["String"]>
  visitId?: Maybe<Scalars["String"]>
  webSessionId?: Maybe<Scalars["String"]>
}

export type Checkout_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type CheckoutActionInput = {
  actionName?: Maybe<Scalars["String"]>
}

export type CheckoutCollection = {
  __typename?: "CheckoutCollection"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<CheckoutCollection>
  items?: Maybe<Array<Maybe<Checkout>>>
  pageCount: Scalars["Int"]
  pageSize: Scalars["Int"]
  startIndex: Scalars["Int"]
  totalCount: Scalars["Int"]
}

export type CheckoutCollection_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type CheckoutGroupRates = {
  __typename?: "CheckoutGroupRates"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<CheckoutGroupRates>
  groupingId?: Maybe<Scalars["String"]>
  shippingRates?: Maybe<Array<Maybe<ShippingRate>>>
}

export type CheckoutGroupRates_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type CheckoutGroupShippingMethodInput = {
  groupingId?: Maybe<Scalars["String"]>
  shippingRate?: Maybe<ShippingRateInput>
}

export type CheckoutGrouping = {
  __typename?: "CheckoutGrouping"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<CheckoutGrouping>
  destinationId?: Maybe<Scalars["String"]>
  dutyAmount?: Maybe<Scalars["Float"]>
  dutyTotal: Scalars["Float"]
  fulfillmentMethod?: Maybe<Scalars["String"]>
  handlingAmount?: Maybe<Scalars["Float"]>
  handlingDiscounts?: Maybe<Array<Maybe<CrAppliedDiscount>>>
  handlingSubTotal: Scalars["Float"]
  handlingTax?: Maybe<Scalars["Float"]>
  handlingTaxTotal: Scalars["Float"]
  handlingTotal: Scalars["Float"]
  id?: Maybe<Scalars["String"]>
  itemLevelHandlingDiscountTotal: Scalars["Float"]
  itemLevelShippingDiscountTotal: Scalars["Float"]
  orderItemIds?: Maybe<Array<Scalars["String"]>>
  orderLevelHandlingDiscountTotal: Scalars["Float"]
  orderLevelShippingDiscountTotal: Scalars["Float"]
  shippingAmount?: Maybe<Scalars["Float"]>
  shippingDiscounts?: Maybe<Array<Maybe<ShippingDiscount>>>
  shippingMethodCode?: Maybe<Scalars["String"]>
  shippingMethodName?: Maybe<Scalars["String"]>
  shippingSubTotal: Scalars["Float"]
  shippingTax?: Maybe<Scalars["Float"]>
  shippingTaxTotal: Scalars["Float"]
  shippingTotal: Scalars["Float"]
  standaloneGroup?: Maybe<Scalars["Boolean"]>
  taxData?: Maybe<Scalars["Object"]>
}

export type CheckoutGrouping_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type CheckoutGroupingInput = {
  destinationId?: Maybe<Scalars["String"]>
  dutyAmount?: Maybe<Scalars["Float"]>
  dutyTotal: Scalars["Float"]
  fulfillmentMethod?: Maybe<Scalars["String"]>
  handlingAmount?: Maybe<Scalars["Float"]>
  handlingDiscounts?: Maybe<Array<Maybe<CrAppliedDiscountInput>>>
  handlingSubTotal: Scalars["Float"]
  handlingTax?: Maybe<Scalars["Float"]>
  handlingTaxTotal: Scalars["Float"]
  handlingTotal: Scalars["Float"]
  id?: Maybe<Scalars["String"]>
  itemLevelHandlingDiscountTotal: Scalars["Float"]
  itemLevelShippingDiscountTotal: Scalars["Float"]
  orderItemIds?: Maybe<Array<Scalars["String"]>>
  orderLevelHandlingDiscountTotal: Scalars["Float"]
  orderLevelShippingDiscountTotal: Scalars["Float"]
  shippingAmount?: Maybe<Scalars["Float"]>
  shippingDiscounts?: Maybe<Array<Maybe<ShippingDiscountInput>>>
  shippingMethodCode?: Maybe<Scalars["String"]>
  shippingMethodName?: Maybe<Scalars["String"]>
  shippingSubTotal: Scalars["Float"]
  shippingTax?: Maybe<Scalars["Float"]>
  shippingTaxTotal: Scalars["Float"]
  shippingTotal: Scalars["Float"]
  standaloneGroup?: Maybe<Scalars["Boolean"]>
  taxData?: Maybe<Scalars["Object"]>
}

export type CheckoutInput = {
  acceptsMarketing?: Maybe<Scalars["Boolean"]>
  amountRemainingForPayment: Scalars["Float"]
  attributes?: Maybe<Array<Maybe<OrderAttributeInput>>>
  auditInfo?: Maybe<CrAuditInfoInput>
  availableActions?: Maybe<Array<Scalars["String"]>>
  channelCode?: Maybe<Scalars["String"]>
  couponCodes?: Maybe<Array<Scalars["String"]>>
  currencyCode?: Maybe<Scalars["String"]>
  customerAccountId?: Maybe<Scalars["Int"]>
  customerInteractionType?: Maybe<Scalars["String"]>
  customerTaxId?: Maybe<Scalars["String"]>
  data?: Maybe<Scalars["Object"]>
  destinations?: Maybe<Array<Maybe<DestinationInput>>>
  discountThresholdMessages?: Maybe<Array<Maybe<ThresholdMessageInput>>>
  dutyTotal?: Maybe<Scalars["Float"]>
  email?: Maybe<Scalars["String"]>
  feeTotal: Scalars["Float"]
  groupings?: Maybe<Array<Maybe<CheckoutGroupingInput>>>
  handlingSubTotal: Scalars["Float"]
  handlingTaxTotal: Scalars["Float"]
  handlingTotal: Scalars["Float"]
  id?: Maybe<Scalars["String"]>
  invalidCoupons?: Maybe<Array<Maybe<InvalidCouponInput>>>
  ipAddress?: Maybe<Scalars["String"]>
  isTaxExempt?: Maybe<Scalars["Boolean"]>
  itemLevelHandlingDiscountTotal: Scalars["Float"]
  itemLevelProductDiscountTotal: Scalars["Float"]
  itemLevelShippingDiscountTotal: Scalars["Float"]
  itemTaxTotal: Scalars["Float"]
  itemTotal: Scalars["Float"]
  items?: Maybe<Array<Maybe<CrOrderItemInput>>>
  locationCode?: Maybe<Scalars["String"]>
  number?: Maybe<Scalars["Int"]>
  orderDiscounts?: Maybe<Array<Maybe<CrAppliedDiscountInput>>>
  orderLevelHandlingDiscountTotal: Scalars["Float"]
  orderLevelProductDiscountTotal: Scalars["Float"]
  orderLevelShippingDiscountTotal: Scalars["Float"]
  originalCartId?: Maybe<Scalars["String"]>
  payments?: Maybe<Array<Maybe<PaymentInput>>>
  priceListCode?: Maybe<Scalars["String"]>
  shippingSubTotal: Scalars["Float"]
  shippingTaxTotal: Scalars["Float"]
  shippingTotal: Scalars["Float"]
  shopperNotes?: Maybe<ShopperNotesInput>
  siteId: Scalars["Int"]
  sourceDevice?: Maybe<Scalars["String"]>
  subTotal: Scalars["Float"]
  submittedDate?: Maybe<Scalars["DateTime"]>
  suggestedDiscounts?: Maybe<Array<Maybe<SuggestedDiscountInput>>>
  taxData?: Maybe<Scalars["Object"]>
  tenantId: Scalars["Int"]
  total: Scalars["Float"]
  type?: Maybe<Scalars["String"]>
  visitId?: Maybe<Scalars["String"]>
  webSessionId?: Maybe<Scalars["String"]>
}

export type CoHttpContentInput = {
  headers?: Maybe<Array<Maybe<KeyValuePair2Input>>>
}

export type CoHttpMethodInput = {
  method?: Maybe<Scalars["String"]>
}

export type CoHttpRequestMessageInput = {
  content?: Maybe<CoHttpContentInput>
  headers?: Maybe<Array<Maybe<KeyValuePair2Input>>>
  method?: Maybe<CoHttpMethodInput>
  properties?: Maybe<Scalars["Object"]>
  requestUri?: Maybe<Scalars["DateTime"]>
  version?: Maybe<Scalars["String"]>
}

export type CommerceSummary = {
  __typename?: "CommerceSummary"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<CommerceSummary>
  lastOrderDate?: Maybe<Scalars["DateTime"]>
  orderCount: Scalars["Int"]
  totalOrderAmount?: Maybe<CurrencyAmount>
  visitsCount: Scalars["Int"]
  wishlistCount: Scalars["Int"]
}

export type CommerceSummary_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type CommerceSummaryInput = {
  lastOrderDate?: Maybe<Scalars["DateTime"]>
  orderCount: Scalars["Int"]
  totalOrderAmount?: Maybe<CurrencyAmountInput>
  visitsCount: Scalars["Int"]
  wishlistCount: Scalars["Int"]
}

export type CommerceUnitPrice = {
  __typename?: "CommerceUnitPrice"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<CommerceUnitPrice>
  extendedAmount?: Maybe<Scalars["Float"]>
  listAmount?: Maybe<Scalars["Float"]>
  overrideAmount?: Maybe<Scalars["Float"]>
  saleAmount?: Maybe<Scalars["Float"]>
}

export type CommerceUnitPrice_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type CommerceUnitPriceInput = {
  extendedAmount?: Maybe<Scalars["Float"]>
  listAmount?: Maybe<Scalars["Float"]>
  overrideAmount?: Maybe<Scalars["Float"]>
  saleAmount?: Maybe<Scalars["Float"]>
}

export type ConfiguredProduct = {
  __typename?: "ConfiguredProduct"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<ConfiguredProduct>
  availableShippingDiscounts?: Maybe<Array<Maybe<PrDiscount>>>
  fulfillmentTypesSupported?: Maybe<Array<Scalars["String"]>>
  inventoryInfo?: Maybe<ProductInventoryInfo>
  measurements?: Maybe<PrPackageMeasurements>
  mfgPartNumber?: Maybe<Scalars["String"]>
  options?: Maybe<Array<Maybe<ProductOption>>>
  price?: Maybe<ProductPrice>
  priceListEntryTypeProperty?: Maybe<ProductProperty>
  priceRange?: Maybe<ProductPriceRange>
  productCode?: Maybe<Scalars["String"]>
  productImages?: Maybe<Array<Maybe<ProductImage>>>
  properties?: Maybe<Array<Maybe<ProductProperty>>>
  purchasableState?: Maybe<ProductPurchasableState>
  purchaseLocation?: Maybe<Scalars["String"]>
  upc?: Maybe<Scalars["String"]>
  variationProductCode?: Maybe<Scalars["String"]>
  volumePriceBands?: Maybe<Array<Maybe<ProductVolumePrice>>>
  volumePriceRange?: Maybe<ProductPriceRange>
}

export type ConfiguredProduct_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type ConfirmationInfoInput = {
  confirmationCode?: Maybe<Scalars["String"]>
  newPassword?: Maybe<Scalars["String"]>
  userName?: Maybe<Scalars["String"]>
}

export type Contact = {
  __typename?: "Contact"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<Contact>
  address?: Maybe<CrAddress>
  companyOrOrganization?: Maybe<Scalars["String"]>
  email?: Maybe<Scalars["String"]>
  firstName?: Maybe<Scalars["String"]>
  id?: Maybe<Scalars["Int"]>
  lastNameOrSurname?: Maybe<Scalars["String"]>
  middleNameOrInitial?: Maybe<Scalars["String"]>
  phoneNumbers?: Maybe<CrPhone>
}

export type Contact_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type ContactInput = {
  address?: Maybe<CrAddressInput>
  companyOrOrganization?: Maybe<Scalars["String"]>
  email?: Maybe<Scalars["String"]>
  firstName?: Maybe<Scalars["String"]>
  id?: Maybe<Scalars["Int"]>
  lastNameOrSurname?: Maybe<Scalars["String"]>
  middleNameOrInitial?: Maybe<Scalars["String"]>
  phoneNumbers?: Maybe<CrPhoneInput>
}

export type ContactType = {
  __typename?: "ContactType"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<ContactType>
  isPrimary?: Maybe<Scalars["Boolean"]>
  name?: Maybe<Scalars["String"]>
}

export type ContactType_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type ContactTypeInput = {
  isPrimary?: Maybe<Scalars["Boolean"]>
  name?: Maybe<Scalars["String"]>
}

export type Coordinates = {
  __typename?: "Coordinates"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<Coordinates>
  lat: Scalars["Float"]
  lng: Scalars["Float"]
}

export type Coordinates_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type CoordinatesInput = {
  lat: Scalars["Float"]
  lng: Scalars["Float"]
}

export type CrAddress = {
  __typename?: "CrAddress"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<CrAddress>
  address1?: Maybe<Scalars["String"]>
  address2?: Maybe<Scalars["String"]>
  address3?: Maybe<Scalars["String"]>
  address4?: Maybe<Scalars["String"]>
  addressType?: Maybe<Scalars["String"]>
  cityOrTown?: Maybe<Scalars["String"]>
  countryCode?: Maybe<Scalars["String"]>
  isValidated?: Maybe<Scalars["Boolean"]>
  postalOrZipCode?: Maybe<Scalars["String"]>
  stateOrProvince?: Maybe<Scalars["String"]>
}

export type CrAddress_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type CrAddressInput = {
  address1?: Maybe<Scalars["String"]>
  address2?: Maybe<Scalars["String"]>
  address3?: Maybe<Scalars["String"]>
  address4?: Maybe<Scalars["String"]>
  addressType?: Maybe<Scalars["String"]>
  cityOrTown?: Maybe<Scalars["String"]>
  countryCode?: Maybe<Scalars["String"]>
  isValidated?: Maybe<Scalars["Boolean"]>
  postalOrZipCode?: Maybe<Scalars["String"]>
  stateOrProvince?: Maybe<Scalars["String"]>
}

export type CrAppliedDiscount = {
  __typename?: "CrAppliedDiscount"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<CrAppliedDiscount>
  couponCode?: Maybe<Scalars["String"]>
  discount?: Maybe<CrDiscount>
  excluded?: Maybe<Scalars["Boolean"]>
  impact?: Maybe<Scalars["Float"]>
}

export type CrAppliedDiscount_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type CrAppliedDiscountInput = {
  couponCode?: Maybe<Scalars["String"]>
  discount?: Maybe<CrDiscountInput>
  excluded?: Maybe<Scalars["Boolean"]>
  impact?: Maybe<Scalars["Float"]>
}

export type CrAuditInfo = {
  __typename?: "CrAuditInfo"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<CrAuditInfo>
  createBy?: Maybe<Scalars["String"]>
  createDate?: Maybe<Scalars["DateTime"]>
  updateBy?: Maybe<Scalars["String"]>
  updateDate?: Maybe<Scalars["DateTime"]>
}

export type CrAuditInfo_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type CrAuditInfoInput = {
  createBy?: Maybe<Scalars["String"]>
  createDate?: Maybe<Scalars["DateTime"]>
  updateBy?: Maybe<Scalars["String"]>
  updateDate?: Maybe<Scalars["DateTime"]>
}

export type CrBundledProduct = {
  __typename?: "CrBundledProduct"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<CrBundledProduct>
  allocationExpiration?: Maybe<Scalars["DateTime"]>
  allocationId?: Maybe<Scalars["Int"]>
  creditValue?: Maybe<Scalars["Float"]>
  deltaPrice?: Maybe<Scalars["Float"]>
  description?: Maybe<Scalars["String"]>
  fulfillmentStatus?: Maybe<Scalars["String"]>
  goodsType?: Maybe<Scalars["String"]>
  isPackagedStandAlone?: Maybe<Scalars["Boolean"]>
  measurements?: Maybe<CrPackageMeasurements>
  name?: Maybe<Scalars["String"]>
  optionAttributeFQN?: Maybe<Scalars["String"]>
  optionValue?: Maybe<Scalars["Object"]>
  productCode?: Maybe<Scalars["String"]>
  productReservationId?: Maybe<Scalars["Int"]>
  quantity: Scalars["Int"]
  stock?: Maybe<ProductStock>
}

export type CrBundledProduct_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type CrBundledProductInput = {
  allocationExpiration?: Maybe<Scalars["DateTime"]>
  allocationId?: Maybe<Scalars["Int"]>
  creditValue?: Maybe<Scalars["Float"]>
  deltaPrice?: Maybe<Scalars["Float"]>
  description?: Maybe<Scalars["String"]>
  fulfillmentStatus?: Maybe<Scalars["String"]>
  goodsType?: Maybe<Scalars["String"]>
  isPackagedStandAlone?: Maybe<Scalars["Boolean"]>
  measurements?: Maybe<CrPackageMeasurementsInput>
  name?: Maybe<Scalars["String"]>
  optionAttributeFQN?: Maybe<Scalars["String"]>
  optionValue?: Maybe<Scalars["Object"]>
  productCode?: Maybe<Scalars["String"]>
  productReservationId?: Maybe<Scalars["Int"]>
  quantity: Scalars["Int"]
  stock?: Maybe<ProductStockInput>
}

export type CrCategory = {
  __typename?: "CrCategory"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<CrCategory>
  id?: Maybe<Scalars["Int"]>
  parent?: Maybe<CrCategory>
}

export type CrCategory_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type CrCategoryInput = {
  id?: Maybe<Scalars["Int"]>
  parent?: Maybe<CrCategoryInput>
}

export type CrDiscount = {
  __typename?: "CrDiscount"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<CrDiscount>
  expirationDate?: Maybe<Scalars["DateTime"]>
  hasMultipleTargetProducts?: Maybe<Scalars["Boolean"]>
  id: Scalars["Int"]
  itemIds?: Maybe<Array<Scalars["String"]>>
  name?: Maybe<Scalars["String"]>
}

export type CrDiscount_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type CrDiscountInput = {
  expirationDate?: Maybe<Scalars["DateTime"]>
  hasMultipleTargetProducts?: Maybe<Scalars["Boolean"]>
  id: Scalars["Int"]
  itemIds?: Maybe<Array<Scalars["String"]>>
  name?: Maybe<Scalars["String"]>
}

export type CrMeasurement = {
  __typename?: "CrMeasurement"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<CrMeasurement>
  unit?: Maybe<Scalars["String"]>
  value?: Maybe<Scalars["Float"]>
}

export type CrMeasurement_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type CrMeasurementInput = {
  unit?: Maybe<Scalars["String"]>
  value?: Maybe<Scalars["Float"]>
}

export type CrOrderItem = {
  __typename?: "CrOrderItem"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<CrOrderItem>
  adjustedLineItemSubtotal?: Maybe<Scalars["Float"]>
  auditInfo?: Maybe<CrAuditInfo>
  autoAddDiscountId?: Maybe<Scalars["Int"]>
  childItemIds?: Maybe<Array<Scalars["String"]>>
  data?: Maybe<Scalars["Object"]>
  destinationId?: Maybe<Scalars["String"]>
  discountTotal?: Maybe<Scalars["Float"]>
  discountedTotal?: Maybe<Scalars["Float"]>
  dutyAmount?: Maybe<Scalars["Float"]>
  expectedDeliveryDate?: Maybe<Scalars["DateTime"]>
  extendedTotal?: Maybe<Scalars["Float"]>
  feeTotal?: Maybe<Scalars["Float"]>
  fulfillmentLocationCode?: Maybe<Scalars["String"]>
  fulfillmentMethod?: Maybe<Scalars["String"]>
  handlingAmount?: Maybe<Scalars["Float"]>
  id?: Maybe<Scalars["String"]>
  isAssemblyRequired?: Maybe<Scalars["Boolean"]>
  isRecurring?: Maybe<Scalars["Boolean"]>
  isTaxable?: Maybe<Scalars["Boolean"]>
  itemTaxTotal?: Maybe<Scalars["Float"]>
  lineId?: Maybe<Scalars["Int"]>
  localeCode?: Maybe<Scalars["String"]>
  originalCartItemId?: Maybe<Scalars["String"]>
  parentItemId?: Maybe<Scalars["String"]>
  product?: Maybe<CrProduct>
  productDiscount?: Maybe<AppliedLineItemProductDiscount>
  productDiscounts?: Maybe<Array<Maybe<AppliedLineItemProductDiscount>>>
  purchaseLocation?: Maybe<Scalars["String"]>
  quantity: Scalars["Int"]
  shippingAmountBeforeDiscountsAndAdjustments?: Maybe<Scalars["Float"]>
  shippingDiscounts?: Maybe<Array<Maybe<AppliedLineItemShippingDiscount>>>
  shippingTaxTotal?: Maybe<Scalars["Float"]>
  shippingTotal?: Maybe<Scalars["Float"]>
  subtotal?: Maybe<Scalars["Float"]>
  taxData?: Maybe<Scalars["Object"]>
  taxableTotal?: Maybe<Scalars["Float"]>
  total?: Maybe<Scalars["Float"]>
  totalWithWeightedShippingAndHandling?: Maybe<Scalars["Float"]>
  totalWithoutWeightedShippingAndHandling?: Maybe<Scalars["Float"]>
  unitPrice?: Maybe<CommerceUnitPrice>
  weightedOrderAdjustment?: Maybe<Scalars["Float"]>
  weightedOrderDiscount?: Maybe<Scalars["Float"]>
  weightedOrderDuty?: Maybe<Scalars["Float"]>
  weightedOrderHandlingAdjustment?: Maybe<Scalars["Float"]>
  weightedOrderHandlingFee?: Maybe<Scalars["Float"]>
  weightedOrderHandlingFeeDiscount?: Maybe<Scalars["Float"]>
  weightedOrderHandlingFeeTax?: Maybe<Scalars["Float"]>
  weightedOrderShipping?: Maybe<Scalars["Float"]>
  weightedOrderShippingDiscount?: Maybe<Scalars["Float"]>
  weightedOrderShippingManualAdjustment?: Maybe<Scalars["Float"]>
  weightedOrderShippingTax?: Maybe<Scalars["Float"]>
  weightedOrderTax?: Maybe<Scalars["Float"]>
}

export type CrOrderItem_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type CrOrderItemInput = {
  adjustedLineItemSubtotal?: Maybe<Scalars["Float"]>
  auditInfo?: Maybe<CrAuditInfoInput>
  autoAddDiscountId?: Maybe<Scalars["Int"]>
  childItemIds?: Maybe<Array<Scalars["String"]>>
  data?: Maybe<Scalars["Object"]>
  destinationId?: Maybe<Scalars["String"]>
  discountTotal?: Maybe<Scalars["Float"]>
  discountedTotal?: Maybe<Scalars["Float"]>
  dutyAmount?: Maybe<Scalars["Float"]>
  expectedDeliveryDate?: Maybe<Scalars["DateTime"]>
  extendedTotal?: Maybe<Scalars["Float"]>
  feeTotal?: Maybe<Scalars["Float"]>
  fulfillmentLocationCode?: Maybe<Scalars["String"]>
  fulfillmentMethod?: Maybe<Scalars["String"]>
  handlingAmount?: Maybe<Scalars["Float"]>
  id?: Maybe<Scalars["String"]>
  isAssemblyRequired?: Maybe<Scalars["Boolean"]>
  isRecurring?: Maybe<Scalars["Boolean"]>
  isTaxable?: Maybe<Scalars["Boolean"]>
  itemTaxTotal?: Maybe<Scalars["Float"]>
  lineId?: Maybe<Scalars["Int"]>
  localeCode?: Maybe<Scalars["String"]>
  originalCartItemId?: Maybe<Scalars["String"]>
  parentItemId?: Maybe<Scalars["String"]>
  product?: Maybe<CrProductInput>
  productDiscount?: Maybe<AppliedLineItemProductDiscountInput>
  productDiscounts?: Maybe<Array<Maybe<AppliedLineItemProductDiscountInput>>>
  purchaseLocation?: Maybe<Scalars["String"]>
  quantity: Scalars["Int"]
  shippingAmountBeforeDiscountsAndAdjustments?: Maybe<Scalars["Float"]>
  shippingDiscounts?: Maybe<Array<Maybe<AppliedLineItemShippingDiscountInput>>>
  shippingTaxTotal?: Maybe<Scalars["Float"]>
  shippingTotal?: Maybe<Scalars["Float"]>
  subtotal?: Maybe<Scalars["Float"]>
  taxData?: Maybe<Scalars["Object"]>
  taxableTotal?: Maybe<Scalars["Float"]>
  total?: Maybe<Scalars["Float"]>
  totalWithWeightedShippingAndHandling?: Maybe<Scalars["Float"]>
  totalWithoutWeightedShippingAndHandling?: Maybe<Scalars["Float"]>
  unitPrice?: Maybe<CommerceUnitPriceInput>
  weightedOrderAdjustment?: Maybe<Scalars["Float"]>
  weightedOrderDiscount?: Maybe<Scalars["Float"]>
  weightedOrderDuty?: Maybe<Scalars["Float"]>
  weightedOrderHandlingAdjustment?: Maybe<Scalars["Float"]>
  weightedOrderHandlingFee?: Maybe<Scalars["Float"]>
  weightedOrderHandlingFeeDiscount?: Maybe<Scalars["Float"]>
  weightedOrderHandlingFeeTax?: Maybe<Scalars["Float"]>
  weightedOrderShipping?: Maybe<Scalars["Float"]>
  weightedOrderShippingDiscount?: Maybe<Scalars["Float"]>
  weightedOrderShippingManualAdjustment?: Maybe<Scalars["Float"]>
  weightedOrderShippingTax?: Maybe<Scalars["Float"]>
  weightedOrderTax?: Maybe<Scalars["Float"]>
}

export type CrPackageMeasurements = {
  __typename?: "CrPackageMeasurements"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<CrPackageMeasurements>
  height?: Maybe<CrMeasurement>
  length?: Maybe<CrMeasurement>
  weight?: Maybe<CrMeasurement>
  width?: Maybe<CrMeasurement>
}

export type CrPackageMeasurements_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type CrPackageMeasurementsInput = {
  height?: Maybe<CrMeasurementInput>
  length?: Maybe<CrMeasurementInput>
  weight?: Maybe<CrMeasurementInput>
  width?: Maybe<CrMeasurementInput>
}

export type CrPackageObj = {
  __typename?: "CrPackageObj"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<CrPackageObj>
  auditInfo?: Maybe<CrAuditInfo>
  availableActions?: Maybe<Array<Scalars["String"]>>
  carrier?: Maybe<Scalars["String"]>
  changeMessages?: Maybe<Array<Maybe<ChangeMessage>>>
  code?: Maybe<Scalars["String"]>
  fulfillmentDate?: Maybe<Scalars["DateTime"]>
  fulfillmentLocationCode?: Maybe<Scalars["String"]>
  hasLabel?: Maybe<Scalars["Boolean"]>
  id?: Maybe<Scalars["String"]>
  items?: Maybe<Array<Maybe<PackageItem>>>
  measurements?: Maybe<CrPackageMeasurements>
  packagingType?: Maybe<Scalars["String"]>
  shipmentId?: Maybe<Scalars["String"]>
  shippingMethodCode?: Maybe<Scalars["String"]>
  shippingMethodName?: Maybe<Scalars["String"]>
  signatureRequired?: Maybe<Scalars["Boolean"]>
  status?: Maybe<Scalars["String"]>
  trackingNumber?: Maybe<Scalars["String"]>
  trackingNumbers?: Maybe<Array<Scalars["String"]>>
  trackings?: Maybe<Array<Maybe<Tracking>>>
}

export type CrPackageObj_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type CrPackageObjInput = {
  auditInfo?: Maybe<CrAuditInfoInput>
  availableActions?: Maybe<Array<Scalars["String"]>>
  carrier?: Maybe<Scalars["String"]>
  changeMessages?: Maybe<Array<Maybe<ChangeMessageInput>>>
  code?: Maybe<Scalars["String"]>
  fulfillmentDate?: Maybe<Scalars["DateTime"]>
  fulfillmentLocationCode?: Maybe<Scalars["String"]>
  hasLabel?: Maybe<Scalars["Boolean"]>
  id?: Maybe<Scalars["String"]>
  items?: Maybe<Array<Maybe<PackageItemInput>>>
  measurements?: Maybe<CrPackageMeasurementsInput>
  packagingType?: Maybe<Scalars["String"]>
  shipmentId?: Maybe<Scalars["String"]>
  shippingMethodCode?: Maybe<Scalars["String"]>
  shippingMethodName?: Maybe<Scalars["String"]>
  signatureRequired?: Maybe<Scalars["Boolean"]>
  status?: Maybe<Scalars["String"]>
  trackingNumber?: Maybe<Scalars["String"]>
  trackingNumbers?: Maybe<Array<Scalars["String"]>>
  trackings?: Maybe<Array<Maybe<TrackingInput>>>
}

export type CrPhone = {
  __typename?: "CrPhone"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<CrPhone>
  home?: Maybe<Scalars["String"]>
  mobile?: Maybe<Scalars["String"]>
  work?: Maybe<Scalars["String"]>
}

export type CrPhone_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type CrPhoneInput = {
  home?: Maybe<Scalars["String"]>
  mobile?: Maybe<Scalars["String"]>
  work?: Maybe<Scalars["String"]>
}

export type CrProduct = {
  __typename?: "CrProduct"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<CrProduct>
  allocationExpiration?: Maybe<Scalars["DateTime"]>
  allocationId?: Maybe<Scalars["Int"]>
  bundledProducts?: Maybe<Array<Maybe<CrBundledProduct>>>
  categories?: Maybe<Array<Maybe<CrCategory>>>
  description?: Maybe<Scalars["String"]>
  discountsRestricted?: Maybe<Scalars["Boolean"]>
  discountsRestrictedEndDate?: Maybe<Scalars["DateTime"]>
  discountsRestrictedStartDate?: Maybe<Scalars["DateTime"]>
  fulfillmentFields?: Maybe<Array<Maybe<FulfillmentField>>>
  fulfillmentStatus?: Maybe<Scalars["String"]>
  fulfillmentTypesSupported?: Maybe<Array<Scalars["String"]>>
  goodsType?: Maybe<Scalars["String"]>
  imageAlternateText?: Maybe<Scalars["String"]>
  imageUrl?: Maybe<Scalars["String"]>
  isPackagedStandAlone?: Maybe<Scalars["Boolean"]>
  isRecurring?: Maybe<Scalars["Boolean"]>
  isTaxable?: Maybe<Scalars["Boolean"]>
  measurements?: Maybe<CrPackageMeasurements>
  mfgPartNumber?: Maybe<Scalars["String"]>
  name?: Maybe<Scalars["String"]>
  options?: Maybe<Array<Maybe<CrProductOption>>>
  price?: Maybe<CrProductPrice>
  productCode?: Maybe<Scalars["String"]>
  productReservationId?: Maybe<Scalars["Int"]>
  productType?: Maybe<Scalars["String"]>
  productUsage?: Maybe<Scalars["String"]>
  properties?: Maybe<Array<Maybe<CrProductProperty>>>
  sku?: Maybe<Scalars["String"]>
  stock?: Maybe<ProductStock>
  upc?: Maybe<Scalars["String"]>
  variationProductCode?: Maybe<Scalars["String"]>
}

export type CrProduct_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type CrProductInput = {
  allocationExpiration?: Maybe<Scalars["DateTime"]>
  allocationId?: Maybe<Scalars["Int"]>
  bundledProducts?: Maybe<Array<Maybe<CrBundledProductInput>>>
  categories?: Maybe<Array<Maybe<CrCategoryInput>>>
  description?: Maybe<Scalars["String"]>
  discountsRestricted?: Maybe<Scalars["Boolean"]>
  discountsRestrictedEndDate?: Maybe<Scalars["DateTime"]>
  discountsRestrictedStartDate?: Maybe<Scalars["DateTime"]>
  fulfillmentFields?: Maybe<Array<Maybe<FulfillmentFieldInput>>>
  fulfillmentStatus?: Maybe<Scalars["String"]>
  fulfillmentTypesSupported?: Maybe<Array<Scalars["String"]>>
  goodsType?: Maybe<Scalars["String"]>
  imageAlternateText?: Maybe<Scalars["String"]>
  imageUrl?: Maybe<Scalars["String"]>
  isPackagedStandAlone?: Maybe<Scalars["Boolean"]>
  isRecurring?: Maybe<Scalars["Boolean"]>
  isTaxable?: Maybe<Scalars["Boolean"]>
  measurements?: Maybe<CrPackageMeasurementsInput>
  mfgPartNumber?: Maybe<Scalars["String"]>
  name?: Maybe<Scalars["String"]>
  options?: Maybe<Array<Maybe<CrProductOptionInput>>>
  price?: Maybe<CrProductPriceInput>
  productCode?: Maybe<Scalars["String"]>
  productReservationId?: Maybe<Scalars["Int"]>
  productType?: Maybe<Scalars["String"]>
  productUsage?: Maybe<Scalars["String"]>
  properties?: Maybe<Array<Maybe<CrProductPropertyInput>>>
  sku?: Maybe<Scalars["String"]>
  stock?: Maybe<ProductStockInput>
  upc?: Maybe<Scalars["String"]>
  variationProductCode?: Maybe<Scalars["String"]>
}

export type CrProductOption = {
  __typename?: "CrProductOption"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<CrProductOption>
  attributeFQN?: Maybe<Scalars["String"]>
  dataType?: Maybe<Scalars["String"]>
  name?: Maybe<Scalars["String"]>
  shopperEnteredValue?: Maybe<Scalars["Object"]>
  stringValue?: Maybe<Scalars["String"]>
  value?: Maybe<Scalars["Object"]>
}

export type CrProductOption_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type CrProductOptionInput = {
  attributeFQN?: Maybe<Scalars["String"]>
  dataType?: Maybe<Scalars["String"]>
  name?: Maybe<Scalars["String"]>
  shopperEnteredValue?: Maybe<Scalars["Object"]>
  stringValue?: Maybe<Scalars["String"]>
  value?: Maybe<Scalars["Object"]>
}

export type CrProductPrice = {
  __typename?: "CrProductPrice"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<CrProductPrice>
  creditValue?: Maybe<Scalars["Float"]>
  msrp?: Maybe<Scalars["Float"]>
  price?: Maybe<Scalars["Float"]>
  priceListCode?: Maybe<Scalars["String"]>
  priceListEntryMode?: Maybe<Scalars["String"]>
  salePrice?: Maybe<Scalars["Float"]>
  tenantOverridePrice?: Maybe<Scalars["Float"]>
}

export type CrProductPrice_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type CrProductPriceInput = {
  creditValue?: Maybe<Scalars["Float"]>
  msrp?: Maybe<Scalars["Float"]>
  price?: Maybe<Scalars["Float"]>
  priceListCode?: Maybe<Scalars["String"]>
  priceListEntryMode?: Maybe<Scalars["String"]>
  salePrice?: Maybe<Scalars["Float"]>
  tenantOverridePrice?: Maybe<Scalars["Float"]>
}

export type CrProductProperty = {
  __typename?: "CrProductProperty"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<CrProductProperty>
  attributeFQN?: Maybe<Scalars["String"]>
  dataType?: Maybe<Scalars["String"]>
  isMultiValue?: Maybe<Scalars["Boolean"]>
  name?: Maybe<Scalars["String"]>
  values?: Maybe<Array<Maybe<CrProductPropertyValue>>>
}

export type CrProductProperty_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type CrProductPropertyInput = {
  attributeFQN?: Maybe<Scalars["String"]>
  dataType?: Maybe<Scalars["String"]>
  isMultiValue?: Maybe<Scalars["Boolean"]>
  name?: Maybe<Scalars["String"]>
  values?: Maybe<Array<Maybe<CrProductPropertyValueInput>>>
}

export type CrProductPropertyValue = {
  __typename?: "CrProductPropertyValue"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<CrProductPropertyValue>
  stringValue?: Maybe<Scalars["String"]>
  value?: Maybe<Scalars["Object"]>
}

export type CrProductPropertyValue_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type CrProductPropertyValueInput = {
  stringValue?: Maybe<Scalars["String"]>
  value?: Maybe<Scalars["Object"]>
}

export type Credit = {
  __typename?: "Credit"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<Credit>
  amount: Scalars["Float"]
  auditInfo?: Maybe<CrAuditInfo>
  giftCard?: Maybe<GatewayGiftCard>
  id?: Maybe<Scalars["String"]>
  parentPaymentId?: Maybe<Scalars["String"]>
  parentPaymentInteractionId?: Maybe<Scalars["String"]>
}

export type Credit_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type CreditAuditEntry = {
  __typename?: "CreditAuditEntry"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<CreditAuditEntry>
  activityType?: Maybe<Scalars["String"]>
  activityTypeId: Scalars["Int"]
  auditInfo?: Maybe<CuAuditInfo>
  details?: Maybe<Scalars["String"]>
}

export type CreditAuditEntry_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type CreditAuditEntryCollection = {
  __typename?: "CreditAuditEntryCollection"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<CreditAuditEntryCollection>
  items?: Maybe<Array<Maybe<CreditAuditEntry>>>
  pageCount: Scalars["Int"]
  pageSize: Scalars["Int"]
  startIndex: Scalars["Int"]
  totalCount: Scalars["Int"]
}

export type CreditAuditEntryCollection_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type CreditCollection = {
  __typename?: "CreditCollection"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<CreditCollection>
  items?: Maybe<Array<Maybe<CuCredit>>>
  pageCount: Scalars["Int"]
  pageSize: Scalars["Int"]
  startIndex: Scalars["Int"]
  totalCount: Scalars["Int"]
}

export type CreditCollection_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type CreditInput = {
  amount: Scalars["Float"]
  auditInfo?: Maybe<CrAuditInfoInput>
  giftCard?: Maybe<GatewayGiftCardInput>
  id?: Maybe<Scalars["String"]>
  parentPaymentId?: Maybe<Scalars["String"]>
  parentPaymentInteractionId?: Maybe<Scalars["String"]>
}

export type CreditTransaction = {
  __typename?: "CreditTransaction"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<CreditTransaction>
  auditInfo?: Maybe<CuAuditInfo>
  comments?: Maybe<Scalars["String"]>
  data?: Maybe<Scalars["Object"]>
  id?: Maybe<Scalars["Int"]>
  impactAmount?: Maybe<Scalars["Float"]>
  orderId?: Maybe<Scalars["String"]>
  transactionType?: Maybe<Scalars["String"]>
}

export type CreditTransaction_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type CreditTransactionCollection = {
  __typename?: "CreditTransactionCollection"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<CreditTransactionCollection>
  items?: Maybe<Array<Maybe<CreditTransaction>>>
  pageCount: Scalars["Int"]
  pageSize: Scalars["Int"]
  startIndex: Scalars["Int"]
  totalCount: Scalars["Int"]
}

export type CreditTransactionCollection_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type CreditTransactionInput = {
  auditInfo?: Maybe<CuAuditInfoInput>
  comments?: Maybe<Scalars["String"]>
  data?: Maybe<Scalars["Object"]>
  id?: Maybe<Scalars["Int"]>
  impactAmount?: Maybe<Scalars["Float"]>
  orderId?: Maybe<Scalars["String"]>
  transactionType?: Maybe<Scalars["String"]>
}

export type CuAddress = {
  __typename?: "CuAddress"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<CuAddress>
  address1?: Maybe<Scalars["String"]>
  address2?: Maybe<Scalars["String"]>
  address3?: Maybe<Scalars["String"]>
  address4?: Maybe<Scalars["String"]>
  addressType?: Maybe<Scalars["String"]>
  cityOrTown?: Maybe<Scalars["String"]>
  countryCode?: Maybe<Scalars["String"]>
  isValidated?: Maybe<Scalars["Boolean"]>
  postalOrZipCode?: Maybe<Scalars["String"]>
  stateOrProvince?: Maybe<Scalars["String"]>
}

export type CuAddress_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type CuAddressInput = {
  address1?: Maybe<Scalars["String"]>
  address2?: Maybe<Scalars["String"]>
  address3?: Maybe<Scalars["String"]>
  address4?: Maybe<Scalars["String"]>
  addressType?: Maybe<Scalars["String"]>
  cityOrTown?: Maybe<Scalars["String"]>
  countryCode?: Maybe<Scalars["String"]>
  isValidated?: Maybe<Scalars["Boolean"]>
  postalOrZipCode?: Maybe<Scalars["String"]>
  stateOrProvince?: Maybe<Scalars["String"]>
}

export type CuAttribute = {
  __typename?: "CuAttribute"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<CuAttribute>
  adminName?: Maybe<Scalars["String"]>
  attributeCode: Scalars["String"]
  attributeFQN?: Maybe<Scalars["String"]>
  attributeMetadata?: Maybe<Array<Maybe<CuAttributeMetadataItem>>>
  auditInfo?: Maybe<CuAuditInfo>
  content?: Maybe<CuAttributeLocalizedContent>
  dataType?: Maybe<Scalars["String"]>
  displayGroup: Scalars["String"]
  id?: Maybe<Scalars["Int"]>
  inputType?: Maybe<Scalars["String"]>
  isActive?: Maybe<Scalars["Boolean"]>
  isMultiValued?: Maybe<Scalars["Boolean"]>
  isReadOnly?: Maybe<Scalars["Boolean"]>
  isRequired?: Maybe<Scalars["Boolean"]>
  isVisible?: Maybe<Scalars["Boolean"]>
  namespace?: Maybe<Scalars["String"]>
  order?: Maybe<Scalars["Int"]>
  validation?: Maybe<CuAttributeValidation>
  valueType: Scalars["String"]
  vocabularyValues?: Maybe<Array<Maybe<CuAttributeVocabularyValue>>>
}

export type CuAttribute_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type CuAttributeCollection = {
  __typename?: "CuAttributeCollection"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<CuAttributeCollection>
  items?: Maybe<Array<Maybe<CuAttribute>>>
  pageCount: Scalars["Int"]
  pageSize: Scalars["Int"]
  startIndex: Scalars["Int"]
  totalCount: Scalars["Int"]
}

export type CuAttributeCollection_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type CuAttributeInput = {
  adminName?: Maybe<Scalars["String"]>
  attributeCode: Scalars["String"]
  attributeFQN?: Maybe<Scalars["String"]>
  attributeMetadata?: Maybe<Array<Maybe<CuAttributeMetadataItemInput>>>
  auditInfo?: Maybe<CuAuditInfoInput>
  content?: Maybe<CuAttributeLocalizedContentInput>
  dataType?: Maybe<Scalars["String"]>
  displayGroup: Scalars["String"]
  id?: Maybe<Scalars["Int"]>
  inputType?: Maybe<Scalars["String"]>
  isActive?: Maybe<Scalars["Boolean"]>
  isMultiValued?: Maybe<Scalars["Boolean"]>
  isReadOnly?: Maybe<Scalars["Boolean"]>
  isRequired?: Maybe<Scalars["Boolean"]>
  isVisible?: Maybe<Scalars["Boolean"]>
  namespace?: Maybe<Scalars["String"]>
  order?: Maybe<Scalars["Int"]>
  validation?: Maybe<CuAttributeValidationInput>
  valueType: Scalars["String"]
  vocabularyValues?: Maybe<Array<Maybe<CuAttributeVocabularyValueInput>>>
}

export type CuAttributeLocalizedContent = {
  __typename?: "CuAttributeLocalizedContent"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<CuAttributeLocalizedContent>
  localeCode?: Maybe<Scalars["String"]>
  value?: Maybe<Scalars["String"]>
}

export type CuAttributeLocalizedContent_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type CuAttributeLocalizedContentInput = {
  localeCode?: Maybe<Scalars["String"]>
  value?: Maybe<Scalars["String"]>
}

export type CuAttributeMetadataItem = {
  __typename?: "CuAttributeMetadataItem"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<CuAttributeMetadataItem>
  key: Scalars["String"]
  value: Scalars["String"]
}

export type CuAttributeMetadataItem_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type CuAttributeMetadataItemInput = {
  key: Scalars["String"]
  value: Scalars["String"]
}

export type CuAttributeValidation = {
  __typename?: "CuAttributeValidation"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<CuAttributeValidation>
  maxDateTime?: Maybe<Scalars["DateTime"]>
  maxNumericValue?: Maybe<Scalars["Float"]>
  maxStringLength?: Maybe<Scalars["Int"]>
  minDateTime?: Maybe<Scalars["DateTime"]>
  minNumericValue?: Maybe<Scalars["Float"]>
  minStringLength?: Maybe<Scalars["Int"]>
  regularExpression?: Maybe<Scalars["String"]>
}

export type CuAttributeValidation_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type CuAttributeValidationInput = {
  maxDateTime?: Maybe<Scalars["DateTime"]>
  maxNumericValue?: Maybe<Scalars["Float"]>
  maxStringLength?: Maybe<Scalars["Int"]>
  minDateTime?: Maybe<Scalars["DateTime"]>
  minNumericValue?: Maybe<Scalars["Float"]>
  minStringLength?: Maybe<Scalars["Int"]>
  regularExpression?: Maybe<Scalars["String"]>
}

export type CuAttributeValueLocalizedContent = {
  __typename?: "CuAttributeValueLocalizedContent"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<CuAttributeValueLocalizedContent>
  localeCode: Scalars["String"]
  value: Scalars["String"]
}

export type CuAttributeValueLocalizedContent_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type CuAttributeValueLocalizedContentInput = {
  localeCode: Scalars["String"]
  value: Scalars["String"]
}

export type CuAttributeVocabularyValue = {
  __typename?: "CuAttributeVocabularyValue"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<CuAttributeVocabularyValue>
  content?: Maybe<CuAttributeValueLocalizedContent>
  isHidden?: Maybe<Scalars["Boolean"]>
  sequence?: Maybe<Scalars["Int"]>
  value: Scalars["String"]
}

export type CuAttributeVocabularyValue_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type CuAttributeVocabularyValueInput = {
  content?: Maybe<CuAttributeValueLocalizedContentInput>
  isHidden?: Maybe<Scalars["Boolean"]>
  sequence?: Maybe<Scalars["Int"]>
  value: Scalars["String"]
}

export type CuAuditInfo = {
  __typename?: "CuAuditInfo"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<CuAuditInfo>
  createBy?: Maybe<Scalars["String"]>
  createDate?: Maybe<Scalars["DateTime"]>
  updateBy?: Maybe<Scalars["String"]>
  updateDate?: Maybe<Scalars["DateTime"]>
}

export type CuAuditInfo_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type CuAuditInfoInput = {
  createBy?: Maybe<Scalars["String"]>
  createDate?: Maybe<Scalars["DateTime"]>
  updateBy?: Maybe<Scalars["String"]>
  updateDate?: Maybe<Scalars["DateTime"]>
}

export type CuCredit = {
  __typename?: "CuCredit"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<CuCredit>
  activationDate?: Maybe<Scalars["DateTime"]>
  auditInfo?: Maybe<CuAuditInfo>
  code?: Maybe<Scalars["String"]>
  creditType?: Maybe<Scalars["String"]>
  creditTypeId: Scalars["Int"]
  currencyCode?: Maybe<Scalars["String"]>
  currentBalance?: Maybe<Scalars["Float"]>
  customCreditType?: Maybe<Scalars["String"]>
  customerId?: Maybe<Scalars["Int"]>
  expirationDate?: Maybe<Scalars["DateTime"]>
  initialBalance?: Maybe<Scalars["Float"]>
}

export type CuCredit_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type CuCreditInput = {
  activationDate?: Maybe<Scalars["DateTime"]>
  auditInfo?: Maybe<CuAuditInfoInput>
  code?: Maybe<Scalars["String"]>
  creditType?: Maybe<Scalars["String"]>
  creditTypeId: Scalars["Int"]
  currencyCode?: Maybe<Scalars["String"]>
  currentBalance?: Maybe<Scalars["Float"]>
  customCreditType?: Maybe<Scalars["String"]>
  customerId?: Maybe<Scalars["Int"]>
  expirationDate?: Maybe<Scalars["DateTime"]>
  initialBalance?: Maybe<Scalars["Float"]>
}

export type CuPhone = {
  __typename?: "CuPhone"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<CuPhone>
  home?: Maybe<Scalars["String"]>
  mobile?: Maybe<Scalars["String"]>
  work?: Maybe<Scalars["String"]>
}

export type CuPhone_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type CuPhoneInput = {
  home?: Maybe<Scalars["String"]>
  mobile?: Maybe<Scalars["String"]>
  work?: Maybe<Scalars["String"]>
}

export type CurrencyAmount = {
  __typename?: "CurrencyAmount"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<CurrencyAmount>
  amount: Scalars["Float"]
  currencyCode?: Maybe<Scalars["String"]>
}

export type CurrencyAmount_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type CurrencyAmountInput = {
  amount: Scalars["Float"]
  currencyCode?: Maybe<Scalars["String"]>
}

export type CurrencyExchangeRate = {
  __typename?: "CurrencyExchangeRate"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<CurrencyExchangeRate>
  decimalPlaces?: Maybe<Scalars["Int"]>
  fromCurrencyCode?: Maybe<Scalars["String"]>
  multiplier?: Maybe<Scalars["Float"]>
  rate?: Maybe<Scalars["Float"]>
  referenceData?: Maybe<Scalars["String"]>
  roundingStrategy?: Maybe<Scalars["Int"]>
  toCurrencyCode?: Maybe<Scalars["String"]>
}

export type CurrencyExchangeRate_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type Customer = {
  __typename?: "Customer"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<Customer>
  customerContact?: Maybe<Contact>
  data?: Maybe<Scalars["Object"]>
  isDestinationCommercial?: Maybe<Scalars["Boolean"]>
}

export type Customer_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type CustomerAccount = {
  __typename?: "CustomerAccount"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<CustomerAccount>
  acceptsMarketing?: Maybe<Scalars["Boolean"]>
  accountType?: Maybe<Scalars["String"]>
  attributes?: Maybe<Array<Maybe<CustomerAttribute>>>
  auditInfo?: Maybe<CuAuditInfo>
  commerceSummary?: Maybe<CommerceSummary>
  companyOrOrganization?: Maybe<Scalars["String"]>
  contacts?: Maybe<Array<Maybe<CustomerContact>>>
  customerSet?: Maybe<Scalars["String"]>
  customerSinceDate?: Maybe<Scalars["DateTime"]>
  emailAddress?: Maybe<Scalars["String"]>
  externalId?: Maybe<Scalars["String"]>
  firstName?: Maybe<Scalars["String"]>
  hasExternalPassword?: Maybe<Scalars["Boolean"]>
  id: Scalars["Int"]
  isActive?: Maybe<Scalars["Boolean"]>
  isAnonymous?: Maybe<Scalars["Boolean"]>
  isLocked?: Maybe<Scalars["Boolean"]>
  lastName?: Maybe<Scalars["String"]>
  localeCode?: Maybe<Scalars["String"]>
  notes?: Maybe<Array<Maybe<CustomerNote>>>
  segments?: Maybe<Array<Maybe<CustomerSegment>>>
  taxId?: Maybe<Scalars["String"]>
  userId?: Maybe<Scalars["String"]>
  userName?: Maybe<Scalars["String"]>
}

export type CustomerAccount_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type CustomerAccountAndAuthInfoInput = {
  account?: Maybe<CustomerAccountInput>
  externalPassword?: Maybe<Scalars["String"]>
  isImport?: Maybe<Scalars["Boolean"]>
  password?: Maybe<Scalars["String"]>
}

export type CustomerAccountCollection = {
  __typename?: "CustomerAccountCollection"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<CustomerAccountCollection>
  items?: Maybe<Array<Maybe<CustomerAccount>>>
  pageCount: Scalars["Int"]
  pageSize: Scalars["Int"]
  startIndex: Scalars["Int"]
  totalCount: Scalars["Int"]
}

export type CustomerAccountCollection_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type CustomerAccountInput = {
  acceptsMarketing?: Maybe<Scalars["Boolean"]>
  accountType?: Maybe<Scalars["String"]>
  attributes?: Maybe<Array<Maybe<CustomerAttributeInput>>>
  auditInfo?: Maybe<CuAuditInfoInput>
  commerceSummary?: Maybe<CommerceSummaryInput>
  companyOrOrganization?: Maybe<Scalars["String"]>
  contacts?: Maybe<Array<Maybe<CustomerContactInput>>>
  customerSet?: Maybe<Scalars["String"]>
  customerSinceDate?: Maybe<Scalars["DateTime"]>
  emailAddress?: Maybe<Scalars["String"]>
  externalId?: Maybe<Scalars["String"]>
  firstName?: Maybe<Scalars["String"]>
  hasExternalPassword?: Maybe<Scalars["Boolean"]>
  id: Scalars["Int"]
  isActive?: Maybe<Scalars["Boolean"]>
  isAnonymous?: Maybe<Scalars["Boolean"]>
  isLocked?: Maybe<Scalars["Boolean"]>
  lastName?: Maybe<Scalars["String"]>
  localeCode?: Maybe<Scalars["String"]>
  notes?: Maybe<Array<Maybe<CustomerNoteInput>>>
  segments?: Maybe<Array<Maybe<CustomerSegmentInput>>>
  taxId?: Maybe<Scalars["String"]>
  userId?: Maybe<Scalars["String"]>
  userName?: Maybe<Scalars["String"]>
}

export type CustomerAttribute = {
  __typename?: "CustomerAttribute"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<CustomerAttribute>
  attributeDefinitionId?: Maybe<Scalars["Int"]>
  auditInfo?: Maybe<CuAuditInfo>
  fullyQualifiedName?: Maybe<Scalars["String"]>
  values?: Maybe<Array<Scalars["Object"]>>
}

export type CustomerAttribute_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type CustomerAttributeCollection = {
  __typename?: "CustomerAttributeCollection"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<CustomerAttributeCollection>
  items?: Maybe<Array<Maybe<CustomerAttribute>>>
  pageCount: Scalars["Int"]
  pageSize: Scalars["Int"]
  startIndex: Scalars["Int"]
  totalCount: Scalars["Int"]
}

export type CustomerAttributeCollection_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type CustomerAttributeInput = {
  attributeDefinitionId?: Maybe<Scalars["Int"]>
  auditInfo?: Maybe<CuAuditInfoInput>
  fullyQualifiedName?: Maybe<Scalars["String"]>
  values?: Maybe<Array<Scalars["Object"]>>
}

export type CustomerAuditEntry = {
  __typename?: "CustomerAuditEntry"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<CustomerAuditEntry>
  application?: Maybe<Scalars["String"]>
  customerAccountId: Scalars["Int"]
  customerAuditEntryId: Scalars["Int"]
  description?: Maybe<Scalars["String"]>
  entryDate: Scalars["DateTime"]
  entryUser?: Maybe<Scalars["String"]>
  fieldPath?: Maybe<Scalars["String"]>
  newValue?: Maybe<Scalars["String"]>
  oldValue?: Maybe<Scalars["String"]>
  site?: Maybe<Scalars["String"]>
}

export type CustomerAuditEntry_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type CustomerAuditEntryCollection = {
  __typename?: "CustomerAuditEntryCollection"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<CustomerAuditEntryCollection>
  items?: Maybe<Array<Maybe<CustomerAuditEntry>>>
  pageCount: Scalars["Int"]
  pageSize: Scalars["Int"]
  startIndex: Scalars["Int"]
  totalCount: Scalars["Int"]
}

export type CustomerAuditEntryCollection_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type CustomerAuthTicket = {
  __typename?: "CustomerAuthTicket"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<CustomerAuthTicket>
  accessToken?: Maybe<Scalars["String"]>
  accessTokenExpiration: Scalars["DateTime"]
  customerAccount?: Maybe<CustomerAccount>
  jwtAccessToken?: Maybe<Scalars["String"]>
  refreshToken?: Maybe<Scalars["String"]>
  refreshTokenExpiration: Scalars["DateTime"]
  userId?: Maybe<Scalars["String"]>
}

export type CustomerAuthTicket_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type CustomerContact = {
  __typename?: "CustomerContact"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<CustomerContact>
  accountId: Scalars["Int"]
  address?: Maybe<CuAddress>
  auditInfo?: Maybe<CuAuditInfo>
  companyOrOrganization?: Maybe<Scalars["String"]>
  email?: Maybe<Scalars["String"]>
  faxNumber?: Maybe<Scalars["String"]>
  firstName?: Maybe<Scalars["String"]>
  id?: Maybe<Scalars["Int"]>
  label?: Maybe<Scalars["String"]>
  lastNameOrSurname?: Maybe<Scalars["String"]>
  middleNameOrInitial?: Maybe<Scalars["String"]>
  phoneNumbers?: Maybe<CuPhone>
  types?: Maybe<Array<Maybe<ContactType>>>
}

export type CustomerContact_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type CustomerContactCollection = {
  __typename?: "CustomerContactCollection"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<CustomerContactCollection>
  items?: Maybe<Array<Maybe<CustomerContact>>>
  pageCount: Scalars["Int"]
  pageSize: Scalars["Int"]
  startIndex: Scalars["Int"]
  totalCount: Scalars["Int"]
}

export type CustomerContactCollection_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type CustomerContactInput = {
  accountId: Scalars["Int"]
  address?: Maybe<CuAddressInput>
  auditInfo?: Maybe<CuAuditInfoInput>
  companyOrOrganization?: Maybe<Scalars["String"]>
  email?: Maybe<Scalars["String"]>
  faxNumber?: Maybe<Scalars["String"]>
  firstName?: Maybe<Scalars["String"]>
  id?: Maybe<Scalars["Int"]>
  label?: Maybe<Scalars["String"]>
  lastNameOrSurname?: Maybe<Scalars["String"]>
  middleNameOrInitial?: Maybe<Scalars["String"]>
  phoneNumbers?: Maybe<CuPhoneInput>
  types?: Maybe<Array<Maybe<ContactTypeInput>>>
}

export type CustomerInput = {
  customerContact?: Maybe<ContactInput>
  data?: Maybe<Scalars["Object"]>
  isDestinationCommercial?: Maybe<Scalars["Boolean"]>
}

export type CustomerLoginInfoInput = {
  emailAddress?: Maybe<Scalars["String"]>
  externalPassword?: Maybe<Scalars["String"]>
  isImport?: Maybe<Scalars["Boolean"]>
  password?: Maybe<Scalars["String"]>
  username?: Maybe<Scalars["String"]>
}

export type CustomerNote = {
  __typename?: "CustomerNote"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<CustomerNote>
  auditInfo?: Maybe<CuAuditInfo>
  content?: Maybe<Scalars["String"]>
  id: Scalars["Int"]
}

export type CustomerNote_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type CustomerNoteCollection = {
  __typename?: "CustomerNoteCollection"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<CustomerNoteCollection>
  items?: Maybe<Array<Maybe<CustomerNote>>>
  pageCount: Scalars["Int"]
  pageSize: Scalars["Int"]
  startIndex: Scalars["Int"]
  totalCount: Scalars["Int"]
}

export type CustomerNoteCollection_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type CustomerNoteInput = {
  auditInfo?: Maybe<CuAuditInfoInput>
  content?: Maybe<Scalars["String"]>
  id: Scalars["Int"]
}

export type CustomerPurchaseOrderAccount = {
  __typename?: "CustomerPurchaseOrderAccount"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<CustomerPurchaseOrderAccount>
  accountId: Scalars["Int"]
  auditInfo?: Maybe<CuAuditInfo>
  availableBalance: Scalars["Float"]
  creditLimit: Scalars["Float"]
  customerPurchaseOrderPaymentTerms?: Maybe<
    Array<Maybe<CustomerPurchaseOrderPaymentTerm>>
  >
  id: Scalars["Int"]
  isEnabled?: Maybe<Scalars["Boolean"]>
  overdraftAllowance?: Maybe<Scalars["Float"]>
  overdraftAllowanceType?: Maybe<Scalars["String"]>
  totalAvailableBalance: Scalars["Float"]
}

export type CustomerPurchaseOrderAccount_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type CustomerPurchaseOrderAccountCollection = {
  __typename?: "CustomerPurchaseOrderAccountCollection"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<CustomerPurchaseOrderAccountCollection>
  items?: Maybe<Array<Maybe<CustomerPurchaseOrderAccount>>>
  pageCount: Scalars["Int"]
  pageSize: Scalars["Int"]
  startIndex: Scalars["Int"]
  totalCount: Scalars["Int"]
}

export type CustomerPurchaseOrderAccountCollection_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type CustomerPurchaseOrderAccountInput = {
  accountId: Scalars["Int"]
  auditInfo?: Maybe<CuAuditInfoInput>
  availableBalance: Scalars["Float"]
  creditLimit: Scalars["Float"]
  customerPurchaseOrderPaymentTerms?: Maybe<
    Array<Maybe<CustomerPurchaseOrderPaymentTermInput>>
  >
  id: Scalars["Int"]
  isEnabled?: Maybe<Scalars["Boolean"]>
  overdraftAllowance?: Maybe<Scalars["Float"]>
  overdraftAllowanceType?: Maybe<Scalars["String"]>
  totalAvailableBalance: Scalars["Float"]
}

export type CustomerPurchaseOrderPaymentTerm = {
  __typename?: "CustomerPurchaseOrderPaymentTerm"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<CustomerPurchaseOrderPaymentTerm>
  auditInfo?: Maybe<CuAuditInfo>
  code?: Maybe<Scalars["String"]>
  description?: Maybe<Scalars["String"]>
  siteId: Scalars["Int"]
}

export type CustomerPurchaseOrderPaymentTerm_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type CustomerPurchaseOrderPaymentTermInput = {
  auditInfo?: Maybe<CuAuditInfoInput>
  code?: Maybe<Scalars["String"]>
  description?: Maybe<Scalars["String"]>
  siteId: Scalars["Int"]
}

export type CustomerSegment = {
  __typename?: "CustomerSegment"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<CustomerSegment>
  auditInfo?: Maybe<CuAuditInfo>
  code?: Maybe<Scalars["String"]>
  description?: Maybe<Scalars["String"]>
  id: Scalars["Int"]
  name?: Maybe<Scalars["String"]>
}

export type CustomerSegment_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type CustomerSegmentCollection = {
  __typename?: "CustomerSegmentCollection"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<CustomerSegmentCollection>
  items?: Maybe<Array<Maybe<CustomerSegment>>>
  pageCount: Scalars["Int"]
  pageSize: Scalars["Int"]
  startIndex: Scalars["Int"]
  totalCount: Scalars["Int"]
}

export type CustomerSegmentCollection_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type CustomerSegmentInput = {
  auditInfo?: Maybe<CuAuditInfoInput>
  code?: Maybe<Scalars["String"]>
  description?: Maybe<Scalars["String"]>
  id: Scalars["Int"]
  name?: Maybe<Scalars["String"]>
}

export type CustomerSet = {
  __typename?: "CustomerSet"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<CustomerSet>
  aggregateInfo?: Maybe<CustomerSetAggregateInfo>
  auditInfo?: Maybe<CuAuditInfo>
  code?: Maybe<Scalars["String"]>
  description?: Maybe<Scalars["String"]>
  isDefault?: Maybe<Scalars["Boolean"]>
  name?: Maybe<Scalars["String"]>
  sites?: Maybe<Array<Maybe<CustomerSetSite>>>
}

export type CustomerSet_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type CustomerSetAggregateInfo = {
  __typename?: "CustomerSetAggregateInfo"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<CustomerSetAggregateInfo>
  customerCount: Scalars["Int"]
}

export type CustomerSetAggregateInfo_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type CustomerSetCollection = {
  __typename?: "CustomerSetCollection"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<CustomerSetCollection>
  items?: Maybe<Array<Maybe<CustomerSet>>>
  pageCount: Scalars["Int"]
  pageSize: Scalars["Int"]
  startIndex: Scalars["Int"]
  totalCount: Scalars["Int"]
}

export type CustomerSetCollection_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type CustomerSetSite = {
  __typename?: "CustomerSetSite"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<CustomerSetSite>
  customerSetCode?: Maybe<Scalars["String"]>
  name?: Maybe<Scalars["String"]>
  siteId: Scalars["Int"]
}

export type CustomerSetSite_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type CustomerUserAuthInfoInput = {
  password?: Maybe<Scalars["String"]>
  username?: Maybe<Scalars["String"]>
}

export type Destination = {
  __typename?: "Destination"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<Destination>
  data?: Maybe<Scalars["Object"]>
  destinationContact?: Maybe<Contact>
  id?: Maybe<Scalars["String"]>
  isDestinationCommercial?: Maybe<Scalars["Boolean"]>
}

export type Destination_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type DestinationInput = {
  data?: Maybe<Scalars["Object"]>
  destinationContact?: Maybe<ContactInput>
  id?: Maybe<Scalars["String"]>
  isDestinationCommercial?: Maybe<Scalars["Boolean"]>
}

export type DigitalPackage = {
  __typename?: "DigitalPackage"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<DigitalPackage>
  auditInfo?: Maybe<CrAuditInfo>
  availableActions?: Maybe<Array<Scalars["String"]>>
  changeMessages?: Maybe<Array<Maybe<ChangeMessage>>>
  code?: Maybe<Scalars["String"]>
  fulfillmentDate?: Maybe<Scalars["DateTime"]>
  fulfillmentLocationCode?: Maybe<Scalars["String"]>
  id?: Maybe<Scalars["String"]>
  items?: Maybe<Array<Maybe<DigitalPackageItem>>>
  status?: Maybe<Scalars["String"]>
}

export type DigitalPackage_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type DigitalPackageInput = {
  auditInfo?: Maybe<CrAuditInfoInput>
  availableActions?: Maybe<Array<Scalars["String"]>>
  changeMessages?: Maybe<Array<Maybe<ChangeMessageInput>>>
  code?: Maybe<Scalars["String"]>
  fulfillmentDate?: Maybe<Scalars["DateTime"]>
  fulfillmentLocationCode?: Maybe<Scalars["String"]>
  id?: Maybe<Scalars["String"]>
  items?: Maybe<Array<Maybe<DigitalPackageItemInput>>>
  status?: Maybe<Scalars["String"]>
}

export type DigitalPackageItem = {
  __typename?: "DigitalPackageItem"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<DigitalPackageItem>
  fulfillmentItemType?: Maybe<Scalars["String"]>
  giftCardCode?: Maybe<Scalars["String"]>
  lineId?: Maybe<Scalars["Int"]>
  optionAttributeFQN?: Maybe<Scalars["String"]>
  productCode?: Maybe<Scalars["String"]>
  quantity: Scalars["Int"]
}

export type DigitalPackageItem_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type DigitalPackageItemInput = {
  fulfillmentItemType?: Maybe<Scalars["String"]>
  giftCardCode?: Maybe<Scalars["String"]>
  lineId?: Maybe<Scalars["Int"]>
  optionAttributeFQN?: Maybe<Scalars["String"]>
  productCode?: Maybe<Scalars["String"]>
  quantity: Scalars["Int"]
}

export type DigitalWalletInput = {
  cartId?: Maybe<Scalars["String"]>
  digitalWalletData?: Maybe<Scalars["String"]>
}

export type DiscountSelectionsInput = {
  discountIds?: Maybe<Array<Scalars["Int"]>>
}

export type DiscountValidationSummary = {
  __typename?: "DiscountValidationSummary"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<DiscountValidationSummary>
  applicableDiscounts?: Maybe<Array<Maybe<PrDiscount>>>
}

export type DiscountValidationSummary_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type Document = {
  __typename?: "Document"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<Document>
  activeDateRange?: Maybe<ActiveDateRange>
  contentLength?: Maybe<Scalars["Int"]>
  contentMimeType?: Maybe<Scalars["String"]>
  contentUpdateDate?: Maybe<Scalars["DateTime"]>
  documentTypeFQN?: Maybe<Scalars["String"]>
  extension?: Maybe<Scalars["String"]>
  id?: Maybe<Scalars["String"]>
  insertDate?: Maybe<Scalars["DateTime"]>
  listFQN?: Maybe<Scalars["String"]>
  name?: Maybe<Scalars["String"]>
  path?: Maybe<Scalars["String"]>
  properties?: Maybe<Scalars["Object"]>
  publishSetCode?: Maybe<Scalars["String"]>
  publishState?: Maybe<Scalars["String"]>
  updateDate?: Maybe<Scalars["DateTime"]>
}

export type Document_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type DocumentCollection = {
  __typename?: "DocumentCollection"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<DocumentCollection>
  items?: Maybe<Array<Maybe<Document>>>
  pageCount: Scalars["Int"]
  pageSize: Scalars["Int"]
  startIndex: Scalars["Int"]
  subPaths?: Maybe<Array<Scalars["String"]>>
  totalCount: Scalars["Int"]
}

export type DocumentCollection_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type DocumentDraftSummary = {
  __typename?: "DocumentDraftSummary"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<DocumentDraftSummary>
  activeUpdateDate?: Maybe<Scalars["DateTime"]>
  activeUpdatedBy?: Maybe<Scalars["String"]>
  catalogId?: Maybe<Scalars["Int"]>
  documentTypeFQN?: Maybe<Scalars["String"]>
  draftUpdateDate: Scalars["DateTime"]
  id?: Maybe<Scalars["String"]>
  listFQN?: Maybe<Scalars["String"]>
  masterCatalogId?: Maybe<Scalars["Int"]>
  name?: Maybe<Scalars["String"]>
  publishSetCode?: Maybe<Scalars["String"]>
  publishType?: Maybe<Scalars["String"]>
  siteId?: Maybe<Scalars["Int"]>
  updatedBy?: Maybe<Scalars["String"]>
}

export type DocumentDraftSummary_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type DocumentDraftSummaryPagedCollection = {
  __typename?: "DocumentDraftSummaryPagedCollection"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<DocumentDraftSummaryPagedCollection>
  items?: Maybe<Array<Maybe<DocumentDraftSummary>>>
  pageCount: Scalars["Int"]
  pageSize: Scalars["Int"]
  startIndex: Scalars["Int"]
  totalCount: Scalars["Int"]
}

export type DocumentDraftSummaryPagedCollection_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type DocumentInput = {
  activeDateRange?: Maybe<ActiveDateRangeInput>
  contentLength?: Maybe<Scalars["Int"]>
  contentMimeType?: Maybe<Scalars["String"]>
  contentUpdateDate?: Maybe<Scalars["DateTime"]>
  documentTypeFQN?: Maybe<Scalars["String"]>
  extension?: Maybe<Scalars["String"]>
  id?: Maybe<Scalars["String"]>
  insertDate?: Maybe<Scalars["DateTime"]>
  listFQN?: Maybe<Scalars["String"]>
  name?: Maybe<Scalars["String"]>
  path?: Maybe<Scalars["String"]>
  properties?: Maybe<Scalars["Object"]>
  publishSetCode?: Maybe<Scalars["String"]>
  publishState?: Maybe<Scalars["String"]>
  updateDate?: Maybe<Scalars["DateTime"]>
}

export type DocumentInstallation = {
  __typename?: "DocumentInstallation"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<DocumentInstallation>
  documentTypeFQN?: Maybe<Scalars["String"]>
  locale?: Maybe<Scalars["String"]>
  name?: Maybe<Scalars["String"]>
  properties?: Maybe<Scalars["Object"]>
}

export type DocumentInstallation_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type DocumentInstallationInput = {
  documentTypeFQN?: Maybe<Scalars["String"]>
  locale?: Maybe<Scalars["String"]>
  name?: Maybe<Scalars["String"]>
  properties?: Maybe<Scalars["Object"]>
}

export type DocumentList = {
  __typename?: "DocumentList"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<DocumentList>
  documentListType?: Maybe<Scalars["String"]>
  documentTypes?: Maybe<Array<Scalars["String"]>>
  enableActiveDateRanges?: Maybe<Scalars["Boolean"]>
  enablePublishing?: Maybe<Scalars["Boolean"]>
  listFQN?: Maybe<Scalars["String"]>
  metadata?: Maybe<Scalars["Object"]>
  name?: Maybe<Scalars["String"]>
  namespace?: Maybe<Scalars["String"]>
  scopeId?: Maybe<Scalars["Int"]>
  scopeType?: Maybe<Scalars["String"]>
  security?: Maybe<Scalars["String"]>
  supportsActiveDateRanges?: Maybe<Scalars["Boolean"]>
  supportsPublishing?: Maybe<Scalars["Boolean"]>
  usages?: Maybe<Array<Scalars["String"]>>
  views?: Maybe<Array<Maybe<View>>>
}

export type DocumentList_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type DocumentListCollection = {
  __typename?: "DocumentListCollection"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<DocumentListCollection>
  items?: Maybe<Array<Maybe<DocumentList>>>
  pageCount: Scalars["Int"]
  pageSize: Scalars["Int"]
  startIndex: Scalars["Int"]
  totalCount: Scalars["Int"]
}

export type DocumentListCollection_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type DocumentListInput = {
  documentListType?: Maybe<Scalars["String"]>
  documentTypes?: Maybe<Array<Scalars["String"]>>
  enableActiveDateRanges?: Maybe<Scalars["Boolean"]>
  enablePublishing?: Maybe<Scalars["Boolean"]>
  listFQN?: Maybe<Scalars["String"]>
  metadata?: Maybe<Scalars["Object"]>
  name?: Maybe<Scalars["String"]>
  namespace?: Maybe<Scalars["String"]>
  scopeId?: Maybe<Scalars["Int"]>
  scopeType?: Maybe<Scalars["String"]>
  security?: Maybe<Scalars["String"]>
  supportsActiveDateRanges?: Maybe<Scalars["Boolean"]>
  supportsPublishing?: Maybe<Scalars["Boolean"]>
  usages?: Maybe<Array<Scalars["String"]>>
  views?: Maybe<Array<Maybe<ViewInput>>>
}

export type DocumentListType = {
  __typename?: "DocumentListType"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<DocumentListType>
  defaultDocuments?: Maybe<Array<Maybe<DocumentInstallation>>>
  documentListTypeFQN?: Maybe<Scalars["String"]>
  documentTypeFQNs?: Maybe<Array<Scalars["String"]>>
  enableActiveDateRanges?: Maybe<Scalars["Boolean"]>
  enablePublishing?: Maybe<Scalars["Boolean"]>
  installationPackage?: Maybe<Scalars["String"]>
  metadata?: Maybe<Scalars["Object"]>
  name?: Maybe<Scalars["String"]>
  namespace?: Maybe<Scalars["String"]>
  scopeType?: Maybe<Scalars["String"]>
  supportsActiveDateRanges?: Maybe<Scalars["Boolean"]>
  supportsPublishing?: Maybe<Scalars["Boolean"]>
  usages?: Maybe<Array<Scalars["String"]>>
  version?: Maybe<Scalars["String"]>
  views?: Maybe<Array<Maybe<View>>>
}

export type DocumentListType_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type DocumentListTypeCollection = {
  __typename?: "DocumentListTypeCollection"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<DocumentListTypeCollection>
  items?: Maybe<Array<Maybe<DocumentListType>>>
  pageCount: Scalars["Int"]
  pageSize: Scalars["Int"]
  startIndex: Scalars["Int"]
  totalCount: Scalars["Int"]
}

export type DocumentListTypeCollection_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type DocumentListTypeInput = {
  defaultDocuments?: Maybe<Array<Maybe<DocumentInstallationInput>>>
  documentListTypeFQN?: Maybe<Scalars["String"]>
  documentTypeFQNs?: Maybe<Array<Scalars["String"]>>
  enableActiveDateRanges?: Maybe<Scalars["Boolean"]>
  enablePublishing?: Maybe<Scalars["Boolean"]>
  installationPackage?: Maybe<Scalars["String"]>
  metadata?: Maybe<Scalars["Object"]>
  name?: Maybe<Scalars["String"]>
  namespace?: Maybe<Scalars["String"]>
  scopeType?: Maybe<Scalars["String"]>
  supportsActiveDateRanges?: Maybe<Scalars["Boolean"]>
  supportsPublishing?: Maybe<Scalars["Boolean"]>
  usages?: Maybe<Array<Scalars["String"]>>
  version?: Maybe<Scalars["String"]>
  views?: Maybe<Array<Maybe<ViewInput>>>
}

export type DocumentType = {
  __typename?: "DocumentType"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<DocumentType>
  adminName?: Maybe<Scalars["String"]>
  documentTypeFQN?: Maybe<Scalars["String"]>
  installationPackage?: Maybe<Scalars["String"]>
  metadata?: Maybe<Scalars["Object"]>
  name?: Maybe<Scalars["String"]>
  namespace?: Maybe<Scalars["String"]>
  properties?: Maybe<Array<Maybe<Property>>>
  version?: Maybe<Scalars["String"]>
}

export type DocumentType_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type DocumentTypeCollection = {
  __typename?: "DocumentTypeCollection"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<DocumentTypeCollection>
  items?: Maybe<Array<Maybe<DocumentType>>>
  pageCount: Scalars["Int"]
  pageSize: Scalars["Int"]
  startIndex: Scalars["Int"]
  totalCount: Scalars["Int"]
}

export type DocumentTypeCollection_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type DocumentTypeInput = {
  adminName?: Maybe<Scalars["String"]>
  documentTypeFQN?: Maybe<Scalars["String"]>
  installationPackage?: Maybe<Scalars["String"]>
  metadata?: Maybe<Scalars["Object"]>
  name?: Maybe<Scalars["String"]>
  namespace?: Maybe<Scalars["String"]>
  properties?: Maybe<Array<Maybe<PropertyInput>>>
  version?: Maybe<Scalars["String"]>
}

export type EntityCollection = {
  __typename?: "EntityCollection"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<EntityCollection>
  items?: Maybe<Array<Scalars["Object"]>>
  pageCount: Scalars["Int"]
  pageSize: Scalars["Int"]
  startIndex: Scalars["Int"]
  totalCount: Scalars["Int"]
}

export type EntityCollection_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type EntityContainer = {
  __typename?: "EntityContainer"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<EntityContainer>
  catalogId?: Maybe<Scalars["Int"]>
  createBy?: Maybe<Scalars["String"]>
  createDate: Scalars["DateTime"]
  id?: Maybe<Scalars["String"]>
  item?: Maybe<Scalars["Object"]>
  listFullName?: Maybe<Scalars["String"]>
  localeCode?: Maybe<Scalars["String"]>
  masterCatalogId?: Maybe<Scalars["Int"]>
  siteId?: Maybe<Scalars["Int"]>
  tenantId: Scalars["Int"]
  updateBy?: Maybe<Scalars["String"]>
  updateDate: Scalars["DateTime"]
  userId?: Maybe<Scalars["String"]>
}

export type EntityContainer_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type EntityContainerCollection = {
  __typename?: "EntityContainerCollection"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<EntityContainerCollection>
  items?: Maybe<Array<Maybe<EntityContainer>>>
  pageCount: Scalars["Int"]
  pageSize: Scalars["Int"]
  startIndex: Scalars["Int"]
  totalCount: Scalars["Int"]
}

export type EntityContainerCollection_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type EntityList = {
  __typename?: "EntityList"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<EntityList>
  contextLevel?: Maybe<Scalars["String"]>
  createDate: Scalars["DateTime"]
  idProperty?: Maybe<IndexedProperty>
  indexA?: Maybe<IndexedProperty>
  indexB?: Maybe<IndexedProperty>
  indexC?: Maybe<IndexedProperty>
  indexD?: Maybe<IndexedProperty>
  isLocaleSpecific?: Maybe<Scalars["Boolean"]>
  isSandboxDataCloningSupported?: Maybe<Scalars["Boolean"]>
  isShopperSpecific?: Maybe<Scalars["Boolean"]>
  isVisibleInStorefront?: Maybe<Scalars["Boolean"]>
  metadata?: Maybe<Scalars["Object"]>
  name?: Maybe<Scalars["String"]>
  nameSpace?: Maybe<Scalars["String"]>
  tenantId: Scalars["Int"]
  updateDate: Scalars["DateTime"]
  usages?: Maybe<Array<Scalars["String"]>>
  useSystemAssignedId?: Maybe<Scalars["Boolean"]>
  views?: Maybe<Array<Maybe<ListView>>>
}

export type EntityList_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type EntityListCollection = {
  __typename?: "EntityListCollection"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<EntityListCollection>
  items?: Maybe<Array<Maybe<EntityList>>>
  pageCount: Scalars["Int"]
  pageSize: Scalars["Int"]
  startIndex: Scalars["Int"]
  totalCount: Scalars["Int"]
}

export type EntityListCollection_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type EntityListInput = {
  contextLevel?: Maybe<Scalars["String"]>
  createDate: Scalars["DateTime"]
  idProperty?: Maybe<IndexedPropertyInput>
  indexA?: Maybe<IndexedPropertyInput>
  indexB?: Maybe<IndexedPropertyInput>
  indexC?: Maybe<IndexedPropertyInput>
  indexD?: Maybe<IndexedPropertyInput>
  isLocaleSpecific?: Maybe<Scalars["Boolean"]>
  isSandboxDataCloningSupported?: Maybe<Scalars["Boolean"]>
  isShopperSpecific?: Maybe<Scalars["Boolean"]>
  isVisibleInStorefront?: Maybe<Scalars["Boolean"]>
  metadata?: Maybe<Scalars["Object"]>
  name?: Maybe<Scalars["String"]>
  nameSpace?: Maybe<Scalars["String"]>
  tenantId: Scalars["Int"]
  updateDate: Scalars["DateTime"]
  usages?: Maybe<Array<Scalars["String"]>>
  useSystemAssignedId?: Maybe<Scalars["Boolean"]>
  views?: Maybe<Array<Maybe<ListViewInput>>>
}

export type ExclusionListEntryLocationCodeInput = {
  locationCode: Scalars["String"]
  orderItemID: Scalars["Int"]
}

export type ExtendedProperty = {
  __typename?: "ExtendedProperty"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<ExtendedProperty>
  key?: Maybe<Scalars["String"]>
  value?: Maybe<Scalars["String"]>
}

export type ExtendedProperty_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type ExtendedPropertyInput = {
  key?: Maybe<Scalars["String"]>
  value?: Maybe<Scalars["String"]>
}

export type Facet = {
  __typename?: "Facet"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<Facet>
  facetType?: Maybe<Scalars["String"]>
  field?: Maybe<Scalars["String"]>
  label?: Maybe<Scalars["String"]>
  values?: Maybe<Array<Maybe<FacetValue>>>
}

export type Facet_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type FacetValue = {
  __typename?: "FacetValue"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<FacetValue>
  childrenFacetValues?: Maybe<Array<Maybe<FacetValue>>>
  count: Scalars["Int"]
  filterValue?: Maybe<Scalars["String"]>
  isApplied?: Maybe<Scalars["Boolean"]>
  isDisplayed?: Maybe<Scalars["Boolean"]>
  label?: Maybe<Scalars["String"]>
  parentFacetValue?: Maybe<Scalars["String"]>
  rangeQueryValueEnd?: Maybe<Scalars["String"]>
  rangeQueryValueStart?: Maybe<Scalars["String"]>
  value?: Maybe<Scalars["String"]>
}

export type FacetValue_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type FulfillmentActionInput = {
  actionName?: Maybe<Scalars["String"]>
  digitalPackageIds?: Maybe<Array<Scalars["String"]>>
  packageIds?: Maybe<Array<Scalars["String"]>>
  pickupIds?: Maybe<Array<Scalars["String"]>>
}

export type FulfillmentField = {
  __typename?: "FulfillmentField"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<FulfillmentField>
  name?: Maybe<Scalars["String"]>
  required?: Maybe<Scalars["Boolean"]>
  userEnteredValue?: Maybe<Scalars["Object"]>
}

export type FulfillmentField_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type FulfillmentFieldInput = {
  name?: Maybe<Scalars["String"]>
  required?: Maybe<Scalars["Boolean"]>
  userEnteredValue?: Maybe<Scalars["Object"]>
}

export type FulfillmentInfo = {
  __typename?: "FulfillmentInfo"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<FulfillmentInfo>
  auditInfo?: Maybe<CrAuditInfo>
  data?: Maybe<Scalars["Object"]>
  fulfillmentContact?: Maybe<Contact>
  isDestinationCommercial?: Maybe<Scalars["Boolean"]>
  shippingMethodCode?: Maybe<Scalars["String"]>
  shippingMethodName?: Maybe<Scalars["String"]>
}

export type FulfillmentInfo_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type FulfillmentInfoInput = {
  auditInfo?: Maybe<CrAuditInfoInput>
  data?: Maybe<Scalars["Object"]>
  fulfillmentContact?: Maybe<ContactInput>
  isDestinationCommercial?: Maybe<Scalars["Boolean"]>
  shippingMethodCode?: Maybe<Scalars["String"]>
  shippingMethodName?: Maybe<Scalars["String"]>
}

export type FulfillmentShopperNotes = {
  __typename?: "FulfillmentShopperNotes"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<FulfillmentShopperNotes>
  comments?: Maybe<Scalars["String"]>
  deliveryInstructions?: Maybe<Scalars["String"]>
  giftMessage?: Maybe<Scalars["String"]>
}

export type FulfillmentShopperNotes_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type FulfillmentShopperNotesInput = {
  comments?: Maybe<Scalars["String"]>
  deliveryInstructions?: Maybe<Scalars["String"]>
  giftMessage?: Maybe<Scalars["String"]>
}

export type FulfillmentTask = {
  __typename?: "FulfillmentTask"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<FulfillmentTask>
  active?: Maybe<Scalars["Boolean"]>
  attributes?: Maybe<Scalars["Object"]>
  completed?: Maybe<Scalars["Boolean"]>
  completedDate?: Maybe<Scalars["DateTime"]>
  description?: Maybe<Scalars["String"]>
  inputs?: Maybe<Array<Maybe<TaskInput>>>
  links?: Maybe<Scalars["Object"]>
  name?: Maybe<Scalars["String"]>
  skippable?: Maybe<Scalars["Boolean"]>
  subject?: Maybe<Scalars["String"]>
  taskId?: Maybe<Scalars["String"]>
}

export type FulfillmentTask_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type FulfillmentTaskInput = {
  active?: Maybe<Scalars["Boolean"]>
  attributes?: Maybe<Scalars["Object"]>
  completed?: Maybe<Scalars["Boolean"]>
  completedDate?: Maybe<Scalars["DateTime"]>
  description?: Maybe<Scalars["String"]>
  inputs?: Maybe<Array<Maybe<TaskInputInput>>>
  links?: Maybe<Scalars["Object"]>
  name?: Maybe<Scalars["String"]>
  skippable?: Maybe<Scalars["Boolean"]>
  subject?: Maybe<Scalars["String"]>
  taskId?: Maybe<Scalars["String"]>
}

export type GatewayGiftCard = {
  __typename?: "GatewayGiftCard"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<GatewayGiftCard>
  amount: Scalars["Float"]
  cardNumber?: Maybe<Scalars["String"]>
  currencyCode?: Maybe<Scalars["String"]>
  id?: Maybe<Scalars["String"]>
}

export type GatewayGiftCard_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type GatewayGiftCardInput = {
  amount: Scalars["Float"]
  cardNumber?: Maybe<Scalars["String"]>
  currencyCode?: Maybe<Scalars["String"]>
  id?: Maybe<Scalars["String"]>
}

export type GiftCard = {
  __typename?: "GiftCard"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<GiftCard>
  activationDate?: Maybe<Scalars["DateTime"]>
  cardNumber?: Maybe<Scalars["String"]>
  code?: Maybe<Scalars["String"]>
  creditType?: Maybe<Scalars["String"]>
  creditValue?: Maybe<Scalars["Float"]>
  currencyCode?: Maybe<Scalars["String"]>
  currentBalance?: Maybe<Scalars["Float"]>
  customerId?: Maybe<Scalars["Int"]>
  expirationDate?: Maybe<Scalars["DateTime"]>
  initialBalance?: Maybe<Scalars["Float"]>
}

export type GiftCard_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type GiftCardInput = {
  activationDate?: Maybe<Scalars["DateTime"]>
  cardNumber?: Maybe<Scalars["String"]>
  code?: Maybe<Scalars["String"]>
  creditType?: Maybe<Scalars["String"]>
  creditValue?: Maybe<Scalars["Float"]>
  currencyCode?: Maybe<Scalars["String"]>
  currentBalance?: Maybe<Scalars["Float"]>
  customerId?: Maybe<Scalars["Int"]>
  expirationDate?: Maybe<Scalars["DateTime"]>
  initialBalance?: Maybe<Scalars["Float"]>
}

export type Hours = {
  __typename?: "Hours"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<Hours>
  closeTime?: Maybe<Scalars["String"]>
  isClosed?: Maybe<Scalars["Boolean"]>
  label?: Maybe<Scalars["String"]>
  openTime?: Maybe<Scalars["String"]>
}

export type Hours_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type HoursInput = {
  closeTime?: Maybe<Scalars["String"]>
  isClosed?: Maybe<Scalars["Boolean"]>
  label?: Maybe<Scalars["String"]>
  openTime?: Maybe<Scalars["String"]>
}

export type InStockNotificationSubscription = {
  __typename?: "InStockNotificationSubscription"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<InStockNotificationSubscription>
  auditInfo?: Maybe<CuAuditInfo>
  customerId?: Maybe<Scalars["Int"]>
  email?: Maybe<Scalars["String"]>
  id?: Maybe<Scalars["Int"]>
  locationCode?: Maybe<Scalars["String"]>
  productCode?: Maybe<Scalars["String"]>
  userId?: Maybe<Scalars["String"]>
}

export type InStockNotificationSubscription_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type InStockNotificationSubscriptionCollection = {
  __typename?: "InStockNotificationSubscriptionCollection"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<InStockNotificationSubscriptionCollection>
  items?: Maybe<Array<Maybe<InStockNotificationSubscription>>>
  pageCount: Scalars["Int"]
  pageSize: Scalars["Int"]
  startIndex: Scalars["Int"]
  totalCount: Scalars["Int"]
}

export type InStockNotificationSubscriptionCollection_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type InStockNotificationSubscriptionInput = {
  auditInfo?: Maybe<CuAuditInfoInput>
  customerId?: Maybe<Scalars["Int"]>
  email?: Maybe<Scalars["String"]>
  id?: Maybe<Scalars["Int"]>
  locationCode?: Maybe<Scalars["String"]>
  productCode?: Maybe<Scalars["String"]>
  userId?: Maybe<Scalars["String"]>
}

export type IndexedProperty = {
  __typename?: "IndexedProperty"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<IndexedProperty>
  dataType?: Maybe<Scalars["String"]>
  propertyName?: Maybe<Scalars["String"]>
}

export type IndexedProperty_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type IndexedPropertyInput = {
  dataType?: Maybe<Scalars["String"]>
  propertyName?: Maybe<Scalars["String"]>
}

export type InvalidCoupon = {
  __typename?: "InvalidCoupon"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<InvalidCoupon>
  couponCode?: Maybe<Scalars["String"]>
  createDate: Scalars["DateTime"]
  discountId: Scalars["Int"]
  reason?: Maybe<Scalars["String"]>
  reasonCode: Scalars["Int"]
}

export type InvalidCoupon_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type InvalidCouponInput = {
  couponCode?: Maybe<Scalars["String"]>
  createDate: Scalars["DateTime"]
  discountId: Scalars["Int"]
  reason?: Maybe<Scalars["String"]>
  reasonCode: Scalars["Int"]
}

export enum InventoryRequestTypeEnum {
  All = "ALL",
  AllStores = "ALL_STORES",
  Any = "ANY",
  Partial = "PARTIAL",
}

export type ItemsForDestinationInput = {
  destinationId?: Maybe<Scalars["String"]>
  itemIds?: Maybe<Array<Scalars["String"]>>
}

export type JsonNode = {
  __typename?: "JsonNode"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<JsonNode>
  array?: Maybe<Scalars["Boolean"]>
  bigDecimal?: Maybe<Scalars["Boolean"]>
  bigInteger?: Maybe<Scalars["Boolean"]>
  binary?: Maybe<Scalars["Boolean"]>
  boolean?: Maybe<Scalars["Boolean"]>
  containerNode?: Maybe<Scalars["Boolean"]>
  double?: Maybe<Scalars["Boolean"]>
  float?: Maybe<Scalars["Boolean"]>
  floatingPointNumber?: Maybe<Scalars["Boolean"]>
  int?: Maybe<Scalars["Boolean"]>
  integralNumber?: Maybe<Scalars["Boolean"]>
  long?: Maybe<Scalars["Boolean"]>
  missingNode?: Maybe<Scalars["Boolean"]>
  nodeType?: Maybe<NodeTypeEnum>
  null?: Maybe<Scalars["Boolean"]>
  number?: Maybe<Scalars["Boolean"]>
  object?: Maybe<Scalars["Boolean"]>
  pojo?: Maybe<Scalars["Boolean"]>
  short?: Maybe<Scalars["Boolean"]>
  textual?: Maybe<Scalars["Boolean"]>
  valueNode?: Maybe<Scalars["Boolean"]>
}

export type JsonNode_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type KeyValuePair2Input = {
  key?: Maybe<Scalars["String"]>
  value?: Maybe<Array<Scalars["String"]>>
}

export type ListView = {
  __typename?: "ListView"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<ListView>
  defaultSort?: Maybe<Scalars["String"]>
  fields?: Maybe<Array<Maybe<ListViewField>>>
  filter?: Maybe<Scalars["String"]>
  metaData?: Maybe<Scalars["Object"]>
  name?: Maybe<Scalars["String"]>
  security?: Maybe<Scalars["String"]>
  usages?: Maybe<Array<Scalars["String"]>>
}

export type ListView_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type ListViewCollection = {
  __typename?: "ListViewCollection"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<ListViewCollection>
  items?: Maybe<Array<Maybe<ListView>>>
  pageCount: Scalars["Int"]
  pageSize: Scalars["Int"]
  startIndex: Scalars["Int"]
  totalCount: Scalars["Int"]
}

export type ListViewCollection_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type ListViewField = {
  __typename?: "ListViewField"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<ListViewField>
  name?: Maybe<Scalars["String"]>
  target?: Maybe<Scalars["String"]>
  type?: Maybe<Scalars["String"]>
}

export type ListViewField_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type ListViewFieldInput = {
  name?: Maybe<Scalars["String"]>
  target?: Maybe<Scalars["String"]>
  type?: Maybe<Scalars["String"]>
}

export type ListViewInput = {
  defaultSort?: Maybe<Scalars["String"]>
  fields?: Maybe<Array<Maybe<ListViewFieldInput>>>
  filter?: Maybe<Scalars["String"]>
  metaData?: Maybe<Scalars["Object"]>
  name?: Maybe<Scalars["String"]>
  security?: Maybe<Scalars["String"]>
  usages?: Maybe<Array<Scalars["String"]>>
}

export type LoAddress = {
  __typename?: "LoAddress"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<LoAddress>
  address1?: Maybe<Scalars["String"]>
  address2?: Maybe<Scalars["String"]>
  address3?: Maybe<Scalars["String"]>
  address4?: Maybe<Scalars["String"]>
  addressType?: Maybe<Scalars["String"]>
  cityOrTown?: Maybe<Scalars["String"]>
  countryCode?: Maybe<Scalars["String"]>
  isValidated?: Maybe<Scalars["Boolean"]>
  postalOrZipCode?: Maybe<Scalars["String"]>
  stateOrProvince?: Maybe<Scalars["String"]>
}

export type LoAddress_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type LoAddressInput = {
  address1?: Maybe<Scalars["String"]>
  address2?: Maybe<Scalars["String"]>
  address3?: Maybe<Scalars["String"]>
  address4?: Maybe<Scalars["String"]>
  addressType?: Maybe<Scalars["String"]>
  cityOrTown?: Maybe<Scalars["String"]>
  countryCode?: Maybe<Scalars["String"]>
  isValidated?: Maybe<Scalars["Boolean"]>
  postalOrZipCode?: Maybe<Scalars["String"]>
  stateOrProvince?: Maybe<Scalars["String"]>
}

export type LoAttribute = {
  __typename?: "LoAttribute"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<LoAttribute>
  adminName?: Maybe<Scalars["String"]>
  attributeCode: Scalars["String"]
  attributeFQN?: Maybe<Scalars["String"]>
  attributeMetadata?: Maybe<Array<Maybe<LoAttributeMetadataItem>>>
  auditInfo?: Maybe<LoAuditInfo>
  content?: Maybe<LoAttributeLocalizedContent>
  dataType?: Maybe<Scalars["String"]>
  displayGroup: Scalars["String"]
  id?: Maybe<Scalars["Int"]>
  inputType?: Maybe<Scalars["String"]>
  isActive?: Maybe<Scalars["Boolean"]>
  isMultiValued?: Maybe<Scalars["Boolean"]>
  isReadOnly?: Maybe<Scalars["Boolean"]>
  isRequired?: Maybe<Scalars["Boolean"]>
  isVisible?: Maybe<Scalars["Boolean"]>
  namespace?: Maybe<Scalars["String"]>
  order?: Maybe<Scalars["Int"]>
  validation?: Maybe<LoAttributeValidation>
  valueType: Scalars["String"]
  vocabularyValues?: Maybe<Array<Maybe<LoAttributeVocabularyValue>>>
}

export type LoAttribute_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type LoAttributeCollection = {
  __typename?: "LoAttributeCollection"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<LoAttributeCollection>
  items?: Maybe<Array<Maybe<LoAttribute>>>
  pageCount: Scalars["Int"]
  pageSize: Scalars["Int"]
  startIndex: Scalars["Int"]
  totalCount: Scalars["Int"]
}

export type LoAttributeCollection_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type LoAttributeInput = {
  adminName?: Maybe<Scalars["String"]>
  attributeCode: Scalars["String"]
  attributeFQN?: Maybe<Scalars["String"]>
  attributeMetadata?: Maybe<Array<Maybe<LoAttributeMetadataItemInput>>>
  auditInfo?: Maybe<LoAuditInfoInput>
  content?: Maybe<LoAttributeLocalizedContentInput>
  dataType?: Maybe<Scalars["String"]>
  displayGroup: Scalars["String"]
  id?: Maybe<Scalars["Int"]>
  inputType?: Maybe<Scalars["String"]>
  isActive?: Maybe<Scalars["Boolean"]>
  isMultiValued?: Maybe<Scalars["Boolean"]>
  isReadOnly?: Maybe<Scalars["Boolean"]>
  isRequired?: Maybe<Scalars["Boolean"]>
  isVisible?: Maybe<Scalars["Boolean"]>
  namespace?: Maybe<Scalars["String"]>
  order?: Maybe<Scalars["Int"]>
  validation?: Maybe<LoAttributeValidationInput>
  valueType: Scalars["String"]
  vocabularyValues?: Maybe<Array<Maybe<LoAttributeVocabularyValueInput>>>
}

export type LoAttributeLocalizedContent = {
  __typename?: "LoAttributeLocalizedContent"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<LoAttributeLocalizedContent>
  localeCode?: Maybe<Scalars["String"]>
  value?: Maybe<Scalars["String"]>
}

export type LoAttributeLocalizedContent_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type LoAttributeLocalizedContentInput = {
  localeCode?: Maybe<Scalars["String"]>
  value?: Maybe<Scalars["String"]>
}

export type LoAttributeMetadataItem = {
  __typename?: "LoAttributeMetadataItem"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<LoAttributeMetadataItem>
  key: Scalars["String"]
  value: Scalars["String"]
}

export type LoAttributeMetadataItem_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type LoAttributeMetadataItemInput = {
  key: Scalars["String"]
  value: Scalars["String"]
}

export type LoAttributeValidation = {
  __typename?: "LoAttributeValidation"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<LoAttributeValidation>
  maxDateTime?: Maybe<Scalars["DateTime"]>
  maxNumericValue?: Maybe<Scalars["Float"]>
  maxStringLength?: Maybe<Scalars["Int"]>
  minDateTime?: Maybe<Scalars["DateTime"]>
  minNumericValue?: Maybe<Scalars["Float"]>
  minStringLength?: Maybe<Scalars["Int"]>
  regularExpression?: Maybe<Scalars["String"]>
}

export type LoAttributeValidation_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type LoAttributeValidationInput = {
  maxDateTime?: Maybe<Scalars["DateTime"]>
  maxNumericValue?: Maybe<Scalars["Float"]>
  maxStringLength?: Maybe<Scalars["Int"]>
  minDateTime?: Maybe<Scalars["DateTime"]>
  minNumericValue?: Maybe<Scalars["Float"]>
  minStringLength?: Maybe<Scalars["Int"]>
  regularExpression?: Maybe<Scalars["String"]>
}

export type LoAttributeValueLocalizedContent = {
  __typename?: "LoAttributeValueLocalizedContent"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<LoAttributeValueLocalizedContent>
  localeCode: Scalars["String"]
  value: Scalars["String"]
}

export type LoAttributeValueLocalizedContent_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type LoAttributeValueLocalizedContentInput = {
  localeCode: Scalars["String"]
  value: Scalars["String"]
}

export type LoAttributeVocabularyValue = {
  __typename?: "LoAttributeVocabularyValue"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<LoAttributeVocabularyValue>
  content?: Maybe<LoAttributeValueLocalizedContent>
  isHidden?: Maybe<Scalars["Boolean"]>
  sequence?: Maybe<Scalars["Int"]>
  value: Scalars["String"]
}

export type LoAttributeVocabularyValue_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type LoAttributeVocabularyValueInput = {
  content?: Maybe<LoAttributeValueLocalizedContentInput>
  isHidden?: Maybe<Scalars["Boolean"]>
  sequence?: Maybe<Scalars["Int"]>
  value: Scalars["String"]
}

export type LoAuditInfo = {
  __typename?: "LoAuditInfo"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<LoAuditInfo>
  createBy?: Maybe<Scalars["String"]>
  createDate?: Maybe<Scalars["DateTime"]>
  updateBy?: Maybe<Scalars["String"]>
  updateDate?: Maybe<Scalars["DateTime"]>
}

export type LoAuditInfo_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type LoAuditInfoInput = {
  createBy?: Maybe<Scalars["String"]>
  createDate?: Maybe<Scalars["DateTime"]>
  updateBy?: Maybe<Scalars["String"]>
  updateDate?: Maybe<Scalars["DateTime"]>
}

export type LoFulfillmentType = {
  __typename?: "LoFulfillmentType"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<LoFulfillmentType>
  code?: Maybe<Scalars["String"]>
  name?: Maybe<Scalars["String"]>
}

export type LoFulfillmentType_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type LoFulfillmentTypeInput = {
  code?: Maybe<Scalars["String"]>
  name?: Maybe<Scalars["String"]>
}

export type Location = {
  __typename?: "Location"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<Location>
  address?: Maybe<LoAddress>
  allowFulfillmentWithNoStock?: Maybe<Scalars["Boolean"]>
  attributes?: Maybe<Array<Maybe<LocationAttribute>>>
  auditInfo?: Maybe<LoAuditInfo>
  code?: Maybe<Scalars["String"]>
  description?: Maybe<Scalars["String"]>
  express?: Maybe<Scalars["Boolean"]>
  fax?: Maybe<Scalars["String"]>
  fulfillmentTypes?: Maybe<Array<Maybe<LoFulfillmentType>>>
  geo?: Maybe<Coordinates>
  includeInInventoryAggregrate?: Maybe<Scalars["Boolean"]>
  includeInLocationExport?: Maybe<Scalars["Boolean"]>
  isDisabled?: Maybe<Scalars["Boolean"]>
  locationTypes?: Maybe<Array<Maybe<LocationType>>>
  name?: Maybe<Scalars["String"]>
  note?: Maybe<Scalars["String"]>
  phone?: Maybe<Scalars["String"]>
  regularHours?: Maybe<RegularHours>
  requiresManifest?: Maybe<Scalars["Boolean"]>
  shippingOriginContact?: Maybe<ShippingOriginContact>
  supportsInventory?: Maybe<Scalars["Boolean"]>
  tags?: Maybe<Array<Scalars["String"]>>
  transferEnabled?: Maybe<Scalars["Boolean"]>
  warehouseEnabled?: Maybe<Scalars["Boolean"]>
}

export type Location_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type LocationAttribute = {
  __typename?: "LocationAttribute"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<LocationAttribute>
  attributeDefinition?: Maybe<LoAttribute>
  attributeDefinitionId?: Maybe<Scalars["Int"]>
  auditInfo?: Maybe<LoAuditInfo>
  fullyQualifiedName?: Maybe<Scalars["String"]>
  values?: Maybe<Array<Scalars["Object"]>>
}

export type LocationAttribute_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type LocationAttributeInput = {
  attributeDefinition?: Maybe<LoAttributeInput>
  attributeDefinitionId?: Maybe<Scalars["Int"]>
  auditInfo?: Maybe<LoAuditInfoInput>
  fullyQualifiedName?: Maybe<Scalars["String"]>
  values?: Maybe<Array<Scalars["Object"]>>
}

export type LocationCollection = {
  __typename?: "LocationCollection"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<LocationCollection>
  items?: Maybe<Array<Maybe<Location>>>
  pageCount: Scalars["Int"]
  pageSize: Scalars["Int"]
  startIndex: Scalars["Int"]
  totalCount: Scalars["Int"]
}

export type LocationCollection_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type LocationGroup = {
  __typename?: "LocationGroup"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<LocationGroup>
  auditInfo?: Maybe<LoAuditInfo>
  locationCodes?: Maybe<Array<Scalars["String"]>>
  locationGroupCode?: Maybe<Scalars["String"]>
  locationGroupId: Scalars["Int"]
  name?: Maybe<Scalars["String"]>
  siteIds?: Maybe<Array<Scalars["Int"]>>
}

export type LocationGroup_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type LocationGroupCollection = {
  __typename?: "LocationGroupCollection"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<LocationGroupCollection>
  items?: Maybe<Array<Maybe<LocationGroup>>>
  pageCount: Scalars["Int"]
  pageSize: Scalars["Int"]
  startIndex: Scalars["Int"]
  totalCount: Scalars["Int"]
}

export type LocationGroupCollection_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type LocationGroupConfiguration = {
  __typename?: "LocationGroupConfiguration"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<LocationGroupConfiguration>
  allowReturns?: Maybe<Scalars["Boolean"]>
  attributes?: Maybe<Array<Maybe<LocationAttribute>>>
  auditInfo?: Maybe<LoAuditInfo>
  autoPackingListPopup?: Maybe<Scalars["Boolean"]>
  blockPartialCancel?: Maybe<Scalars["Boolean"]>
  blockPartialStock?: Maybe<Scalars["Boolean"]>
  boxTypes?: Maybe<Array<Maybe<BoxType>>>
  bpmConfigurations?: Maybe<Array<Maybe<BpmConfiguration>>>
  carriers?: Maybe<Array<Maybe<Carrier>>>
  closePickWavePermissions?: Maybe<Array<Scalars["String"]>>
  customerFailedToPickupAfterAction?: Maybe<Scalars["String"]>
  customerFailedToPickupDeadline?: Maybe<Scalars["Int"]>
  defaultCarrier?: Maybe<Scalars["String"]>
  defaultMaxNumberOfShipmentsInPickWave?: Maybe<Scalars["Int"]>
  defaultNumberOfOrdersInPickWave?: Maybe<Scalars["Int"]>
  defaultPrinterType?: Maybe<Scalars["String"]>
  defaultReturnRefundReductionAmount?: Maybe<Scalars["Int"]>
  displayProductImagesInPickWaveDetails?: Maybe<Scalars["Boolean"]>
  enableAdvancedOptionForPickWaveCreation?: Maybe<Scalars["Boolean"]>
  enableForISPU?: Maybe<Scalars["Boolean"]>
  enableForSTH?: Maybe<Scalars["Boolean"]>
  enablePnpForBOPIS?: Maybe<Scalars["Boolean"]>
  enablePnpForSTH?: Maybe<Scalars["Boolean"]>
  enableScanningOfUpcForShipToHome?: Maybe<Scalars["Boolean"]>
  locationGroupCode?: Maybe<Scalars["String"]>
  locationGroupId: Scalars["Int"]
  maxNumberOfPackingSlipsByGroup?: Maybe<Scalars["Int"]>
  maximumNumberOfOrdersInPickWave?: Maybe<Scalars["Int"]>
  maximumReturnRefundReductionAmount?: Maybe<Scalars["Int"]>
  packageSettings?: Maybe<PackageSettings>
  pickWavePrintFormat?: Maybe<Scalars["String"]>
  printReturnLabel?: Maybe<Scalars["Boolean"]>
  returnRefundReduction?: Maybe<Scalars["Boolean"]>
  sendCustomerPickupReminder?: Maybe<Scalars["Int"]>
  siteId: Scalars["Int"]
  tenantId: Scalars["Int"]
  wmsEnabled?: Maybe<Scalars["Boolean"]>
}

export type LocationGroupConfiguration_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type LocationGroupInput = {
  auditInfo?: Maybe<LoAuditInfoInput>
  locationCodes?: Maybe<Array<Scalars["String"]>>
  locationGroupCode?: Maybe<Scalars["String"]>
  locationGroupId: Scalars["Int"]
  name?: Maybe<Scalars["String"]>
  siteIds?: Maybe<Array<Scalars["Int"]>>
}

export type LocationInput = {
  address?: Maybe<LoAddressInput>
  allowFulfillmentWithNoStock?: Maybe<Scalars["Boolean"]>
  attributes?: Maybe<Array<Maybe<LocationAttributeInput>>>
  auditInfo?: Maybe<LoAuditInfoInput>
  code?: Maybe<Scalars["String"]>
  description?: Maybe<Scalars["String"]>
  express?: Maybe<Scalars["Boolean"]>
  fax?: Maybe<Scalars["String"]>
  fulfillmentTypes?: Maybe<Array<Maybe<LoFulfillmentTypeInput>>>
  geo?: Maybe<CoordinatesInput>
  includeInInventoryAggregrate?: Maybe<Scalars["Boolean"]>
  includeInLocationExport?: Maybe<Scalars["Boolean"]>
  isDisabled?: Maybe<Scalars["Boolean"]>
  locationTypes?: Maybe<Array<Maybe<LocationTypeInput>>>
  name?: Maybe<Scalars["String"]>
  note?: Maybe<Scalars["String"]>
  phone?: Maybe<Scalars["String"]>
  regularHours?: Maybe<RegularHoursInput>
  requiresManifest?: Maybe<Scalars["Boolean"]>
  shippingOriginContact?: Maybe<ShippingOriginContactInput>
  supportsInventory?: Maybe<Scalars["Boolean"]>
  tags?: Maybe<Array<Scalars["String"]>>
  transferEnabled?: Maybe<Scalars["Boolean"]>
  warehouseEnabled?: Maybe<Scalars["Boolean"]>
}

export type LocationInventory = {
  __typename?: "LocationInventory"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<LocationInventory>
  locationCode?: Maybe<Scalars["String"]>
  mfgPartNumber?: Maybe<Scalars["String"]>
  productCode?: Maybe<Scalars["String"]>
  sku?: Maybe<Scalars["String"]>
  softStockAvailable?: Maybe<Scalars["Int"]>
  stockAvailable?: Maybe<Scalars["Int"]>
}

export type LocationInventory_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type LocationInventoryCollection = {
  __typename?: "LocationInventoryCollection"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<LocationInventoryCollection>
  items?: Maybe<Array<Maybe<LocationInventory>>>
  totalCount: Scalars["Int"]
}

export type LocationInventoryCollection_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type LocationInventoryQueryInput = {
  locationCodes?: Maybe<Array<Scalars["String"]>>
  productCodes?: Maybe<Array<Scalars["String"]>>
}

export type LocationType = {
  __typename?: "LocationType"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<LocationType>
  auditInfo?: Maybe<LoAuditInfo>
  code?: Maybe<Scalars["String"]>
  name?: Maybe<Scalars["String"]>
}

export type LocationType_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type LocationTypeInput = {
  auditInfo?: Maybe<LoAuditInfoInput>
  code?: Maybe<Scalars["String"]>
  name?: Maybe<Scalars["String"]>
}

export type LocationUsage = {
  __typename?: "LocationUsage"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<LocationUsage>
  auditInfo?: Maybe<LoAuditInfo>
  locationCodes?: Maybe<Array<Scalars["String"]>>
  locationTypeCodes?: Maybe<Array<Scalars["String"]>>
  locationUsageTypeCode?: Maybe<Scalars["String"]>
}

export type LocationUsage_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type LocationUsageCollection = {
  __typename?: "LocationUsageCollection"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<LocationUsageCollection>
  items?: Maybe<Array<Maybe<LocationUsage>>>
  totalCount: Scalars["Int"]
}

export type LocationUsageCollection_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type LocationUsageInput = {
  auditInfo?: Maybe<LoAuditInfoInput>
  locationCodes?: Maybe<Array<Scalars["String"]>>
  locationTypeCodes?: Maybe<Array<Scalars["String"]>>
  locationUsageTypeCode?: Maybe<Scalars["String"]>
}

export type LoginState = {
  __typename?: "LoginState"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<LoginState>
  createdOn?: Maybe<Scalars["DateTime"]>
  failedLoginAttemptCount: Scalars["Int"]
  firstFailedLoginAttemptOn?: Maybe<Scalars["DateTime"]>
  isLocked?: Maybe<Scalars["Boolean"]>
  isPasswordChangeRequired?: Maybe<Scalars["Boolean"]>
  lastLockedOn?: Maybe<Scalars["DateTime"]>
  lastLoginOn?: Maybe<Scalars["DateTime"]>
  lastPasswordChangeOn?: Maybe<Scalars["DateTime"]>
  remainingLoginAttempts: Scalars["Int"]
  updatedOn?: Maybe<Scalars["DateTime"]>
}

export type LoginState_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type MzdbHttpContentInput = {
  headers?: Maybe<Array<Maybe<MzdbStringStringIEnumerableKeyValuePairInput>>>
}

export type MzdbHttpMethodInput = {
  method?: Maybe<Scalars["String"]>
}

export type MzdbHttpRequestMessageInput = {
  content?: Maybe<MzdbHttpContentInput>
  headers?: Maybe<Array<Maybe<MzdbStringStringIEnumerableKeyValuePairInput>>>
  method?: Maybe<MzdbHttpMethodInput>
  properties?: Maybe<Scalars["Object"]>
  requestUri?: Maybe<Scalars["DateTime"]>
  version?: Maybe<Scalars["String"]>
}

export type MzdbStringStringIEnumerableKeyValuePairInput = {
  key?: Maybe<Scalars["String"]>
  value?: Maybe<Array<Scalars["String"]>>
}

export type Mutation = {
  __typename?: "Mutation"
  addExtendedPropertyToCurrentCart?: Maybe<Array<Maybe<ExtendedProperty>>>
  addItemToCart?: Maybe<CartItem>
  addItemToCurrentCart?: Maybe<CartItem>
  addItemsToCart?: Maybe<Scalars["Boolean"]>
  addItemsToCurrentCart?: Maybe<Scalars["Boolean"]>
  addRoleToCustomerB2bAccount?: Maybe<Scalars["Boolean"]>
  adminCreateLocation?: Maybe<Location>
  adminCreateLocationAttribute?: Maybe<LoAttribute>
  adminCreateLocationGroup?: Maybe<LocationGroup>
  adminCreateLocationType?: Maybe<LocationType>
  adminUpdateLocation?: Maybe<Location>
  adminUpdateLocationAttribute?: Maybe<LoAttribute>
  adminUpdateLocationType?: Maybe<LocationType>
  cancelOrder?: Maybe<Order>
  changeCustomerAccountPassword?: Maybe<Scalars["Boolean"]>
  configureProduct?: Maybe<ConfiguredProduct>
  createCartForUser?: Maybe<Cart>
  createCheckout?: Maybe<Checkout>
  createCheckoutAction?: Maybe<Checkout>
  createCheckoutAttribute?: Maybe<Array<Maybe<OrderAttribute>>>
  createCheckoutDestination?: Maybe<Destination>
  createCheckoutItem?: Maybe<Checkout>
  createCheckoutItemDestination?: Maybe<Checkout>
  createCheckoutPaymentAction?: Maybe<Checkout>
  createCheckoutShippingMethod?: Maybe<Checkout>
  createCommerceChannel?: Maybe<Channel>
  createCommerceChannelGroup?: Maybe<ChannelGroup>
  createCustomerAccount?: Maybe<CustomerAccount>
  createCustomerAccountAndLogin?: Maybe<CustomerAuthTicket>
  createCustomerAccountAttribute?: Maybe<CustomerAttribute>
  createCustomerAccountAttributeDefinition?: Maybe<CuAttribute>
  createCustomerAccountCard?: Maybe<Card>
  createCustomerAccountContact?: Maybe<CustomerContact>
  createCustomerAccountLogin?: Maybe<CustomerAuthTicket>
  createCustomerAccountNote?: Maybe<CustomerNote>
  createCustomerAccountPurchaseOrderAccount?: Maybe<CustomerPurchaseOrderAccount>
  createCustomerAccountPurchaseOrderAccountTransaction?: Maybe<PurchaseOrderTransaction>
  createCustomerAccountTransaction?: Maybe<Transaction>
  createCustomerAccounts?: Maybe<CustomerAccountCollection>
  createCustomerAuthTicket?: Maybe<CustomerAuthTicket>
  createCustomerB2bAccount?: Maybe<B2BAccount>
  createCustomerB2bAccountAttribute?: Maybe<CustomerAttribute>
  createCustomerB2bAccountUser?: Maybe<B2BUser>
  createCustomerCredit?: Maybe<CuCredit>
  createCustomerCreditTransaction?: Maybe<CreditTransaction>
  createCustomerSegment?: Maybe<CustomerSegment>
  createCustomerSegmentAccount?: Maybe<Scalars["Boolean"]>
  createDocumentDraft?: Maybe<Scalars["Boolean"]>
  createDocumentList?: Maybe<DocumentList>
  createDocumentListDocument?: Maybe<Document>
  createDocumentListType?: Maybe<DocumentListType>
  createDocumentType?: Maybe<DocumentType>
  createEntityList?: Maybe<EntityList>
  createEntityListEntity?: Maybe<Scalars["Boolean"]>
  createEntityListView?: Maybe<ListView>
  createInStockNotification?: Maybe<InStockNotificationSubscription>
  createOrder?: Maybe<Order>
  createOrderAction?: Maybe<Order>
  createOrderAttribute?: Maybe<Array<Maybe<OrderAttribute>>>
  createOrderAutoCapture?: Maybe<Order>
  createOrderDigitalPackage?: Maybe<DigitalPackage>
  createOrderExtendedProperties?: Maybe<Array<Maybe<ExtendedProperty>>>
  createOrderFulfillmentAction?: Maybe<Order>
  createOrderItem?: Maybe<Order>
  createOrderNote?: Maybe<OrderNote>
  createOrderPackage?: Maybe<CrPackageObj>
  createOrderPaymentAction?: Maybe<Order>
  createOrderPaymentPaymentAction?: Maybe<Order>
  createOrderPickup?: Maybe<Pickup>
  createOrderRefund?: Maybe<Refund>
  createOrderRoutingSuggestion?: Maybe<SuggestionResponse>
  createOrderShipment?: Maybe<Array<Maybe<CrPackageObj>>>
  createOrderShipmentAdjustment?: Maybe<Shipment>
  createOrderShipmentItemAdjustment?: Maybe<Shipment>
  createProductCost?: Maybe<ProductCostCollection>
  createPropertyType?: Maybe<PropertyType>
  createPurchaseOrderAccount?: Maybe<CustomerPurchaseOrderAccountCollection>
  createQuote?: Maybe<Quote>
  createQuoteItem?: Maybe<Quote>
  createResolvedPriceList?: Maybe<ResolvedPriceList>
  createReturn?: Maybe<ReturnObj>
  createReturnAction?: Maybe<ReturnCollection>
  createReturnItem?: Maybe<ReturnObj>
  createReturnNote?: Maybe<OrderNote>
  createReturnPackage?: Maybe<CrPackageObj>
  createReturnPaymentAction?: Maybe<ReturnObj>
  createReturnPaymentPaymentAction?: Maybe<ReturnObj>
  createReturnShipment?: Maybe<Array<Maybe<CrPackageObj>>>
  createTargetRule?: Maybe<TargetRule>
  createWishlist?: Maybe<Wishlist>
  createWishlistItem?: Maybe<WishlistItem>
  deleteAdminLocation?: Maybe<Scalars["Boolean"]>
  deleteAdminLocationType?: Maybe<Scalars["Boolean"]>
  deleteB2bAccountAttribute?: Maybe<Scalars["Boolean"]>
  deleteB2bAccountRole?: Maybe<Scalars["Boolean"]>
  deleteCart?: Maybe<Scalars["Boolean"]>
  deleteCartCoupon?: Maybe<Cart>
  deleteCartCoupons?: Maybe<Cart>
  deleteCartItem?: Maybe<Scalars["Boolean"]>
  deleteCartItems?: Maybe<Cart>
  deleteCheckoutCoupon?: Maybe<Checkout>
  deleteCheckoutCoupons?: Maybe<Checkout>
  deleteCheckoutDestination?: Maybe<Scalars["Boolean"]>
  deleteCheckoutItem?: Maybe<Checkout>
  deleteCommerceChannel?: Maybe<Scalars["Boolean"]>
  deleteCommerceChannelGroup?: Maybe<Scalars["Boolean"]>
  deleteCommerceTargetRule?: Maybe<Scalars["Boolean"]>
  deleteCurrentCart?: Maybe<Scalars["Boolean"]>
  deleteCurrentCartExtendedProperties?: Maybe<Scalars["Boolean"]>
  deleteCurrentCartExtendedProperty?: Maybe<Scalars["Boolean"]>
  deleteCurrentCartItem?: Maybe<Scalars["Boolean"]>
  deleteCurrentCartItems?: Maybe<Cart>
  deleteCurrentCartMessage?: Maybe<Scalars["Boolean"]>
  deleteCurrentCartMessages?: Maybe<Scalars["Boolean"]>
  deleteCustomerAccount?: Maybe<Scalars["Boolean"]>
  deleteCustomerAccountAttribute?: Maybe<Scalars["Boolean"]>
  deleteCustomerAccountCard?: Maybe<Scalars["Boolean"]>
  deleteCustomerAccountContact?: Maybe<Scalars["Boolean"]>
  deleteCustomerAccountNote?: Maybe<Scalars["Boolean"]>
  deleteCustomerAccountTransaction?: Maybe<Scalars["Boolean"]>
  deleteCustomerCredit?: Maybe<Scalars["Boolean"]>
  deleteCustomerSegment?: Maybe<Scalars["Boolean"]>
  deleteCustomerSegmentAccount?: Maybe<Scalars["Boolean"]>
  deleteDocumentList?: Maybe<Scalars["Boolean"]>
  deleteDocumentListDocument?: Maybe<Scalars["Boolean"]>
  deleteDocumentListDocumentContent?: Maybe<Scalars["Boolean"]>
  deleteDocumentListDocumentTreeContent?: Maybe<Scalars["Boolean"]>
  deleteEntityList?: Maybe<Scalars["Boolean"]>
  deleteEntityListEntity?: Maybe<Scalars["Boolean"]>
  deleteEntityListView?: Maybe<Scalars["Boolean"]>
  deleteInStockNotification?: Maybe<Scalars["Boolean"]>
  deleteOrderAdjustment?: Maybe<Order>
  deleteOrderAdjustmentHandling?: Maybe<Order>
  deleteOrderAdjustmentShipping?: Maybe<Order>
  deleteOrderCoupon?: Maybe<Order>
  deleteOrderCoupons?: Maybe<Order>
  deleteOrderDigitalPackage?: Maybe<Scalars["Boolean"]>
  deleteOrderExtendedProperties?: Maybe<Scalars["Boolean"]>
  deleteOrderExtendedProperty?: Maybe<Scalars["Boolean"]>
  deleteOrderItem?: Maybe<Order>
  deleteOrderNote?: Maybe<Scalars["Boolean"]>
  deleteOrderPackage?: Maybe<Scalars["Boolean"]>
  deleteOrderPickup?: Maybe<Scalars["Boolean"]>
  deleteOrderShipment?: Maybe<Scalars["Boolean"]>
  deletePropertyType?: Maybe<Scalars["Boolean"]>
  deleteQuote?: Maybe<Scalars["Boolean"]>
  deleteQuoteItem?: Maybe<Scalars["Boolean"]>
  deleteReturn?: Maybe<Scalars["Boolean"]>
  deleteReturnItem?: Maybe<ReturnObj>
  deleteReturnNote?: Maybe<Scalars["Boolean"]>
  deleteReturnPackage?: Maybe<Scalars["Boolean"]>
  deleteReturnShipment?: Maybe<Scalars["Boolean"]>
  deleteUserCart?: Maybe<Scalars["Boolean"]>
  deleteWishlist?: Maybe<Scalars["Boolean"]>
  deleteWishlistItem?: Maybe<Scalars["Boolean"]>
  deleteWishlistItems?: Maybe<Wishlist>
  manageLocationProductInventory?: Maybe<LocationInventoryCollection>
  patchDocumentListDocument?: Maybe<Document>
  recomputeCustomerAccountLifetimeValue?: Maybe<Scalars["Boolean"]>
  refreshCustomerAuthTickets?: Maybe<CustomerAuthTicket>
  rejectCartDiscount?: Maybe<Cart>
  removeCustomerB2bAccountUser?: Maybe<Scalars["Boolean"]>
  repriceOrderShipment?: Maybe<Shipment>
  resendCheckoutEmail?: Maybe<Scalars["Boolean"]>
  resendCustomerCreditEmail?: Maybe<Scalars["Boolean"]>
  resendOrderEmail?: Maybe<Scalars["Boolean"]>
  resendOrderFulfillmentEmail?: Maybe<Order>
  resendReturnEmail?: Maybe<Scalars["Boolean"]>
  resetCustomerAccountPassword?: Maybe<Scalars["Boolean"]>
  setCustomerAccountLoginLocked?: Maybe<Scalars["Boolean"]>
  setCustomerAccountPasswordChangeRequired?: Maybe<Scalars["Boolean"]>
  setReturnRestock?: Maybe<ReturnObj>
  setReturnShip?: Maybe<Order>
  splitOrderShipment?: Maybe<Array<Maybe<Shipment>>>
  toggleDocumentPublishing?: Maybe<Scalars["Boolean"]>
  updateCart?: Maybe<Cart>
  updateCartCoupon?: Maybe<Cart>
  updateCartItem?: Maybe<CartItem>
  updateCartItemQuantity?: Maybe<CartItem>
  updateChannel?: Maybe<Channel>
  updateChannelGroup?: Maybe<ChannelGroup>
  updateCheckout?: Maybe<Checkout>
  updateCheckoutAttributes?: Maybe<Array<Maybe<OrderAttribute>>>
  updateCheckoutCoupon?: Maybe<Checkout>
  updateCheckoutDestination?: Maybe<Destination>
  updateCheckoutDigitalWalletType?: Maybe<Checkout>
  updateCheckoutItemDestination?: Maybe<Checkout>
  updateCheckoutPaymentAction?: Maybe<Checkout>
  updateCheckoutPriceList?: Maybe<Checkout>
  updateCurrentCart?: Maybe<Cart>
  updateCurrentCartExtendedProperties?: Maybe<Array<Maybe<ExtendedProperty>>>
  updateCurrentCartExtendedProperty?: Maybe<ExtendedProperty>
  updateCurrentCartItem?: Maybe<CartItem>
  updateCurrentCartItemQuantity?: Maybe<CartItem>
  updateCustomerAccount?: Maybe<CustomerAccount>
  updateCustomerAccountAttribute?: Maybe<CustomerAttribute>
  updateCustomerAccountAttributeDefinition?: Maybe<CuAttribute>
  updateCustomerAccountCard?: Maybe<Card>
  updateCustomerAccountContact?: Maybe<CustomerContact>
  updateCustomerAccountContacts?: Maybe<CustomerContactCollection>
  updateCustomerAccountNote?: Maybe<CustomerNote>
  updateCustomerAccountPasswords?: Maybe<ChangePasswordResultCollection>
  updateCustomerB2bAccount?: Maybe<B2BAccount>
  updateCustomerB2bAccountAttribute?: Maybe<CustomerAttribute>
  updateCustomerB2bAccountUser?: Maybe<B2BUser>
  updateCustomerCredit?: Maybe<CuCredit>
  updateCustomerCreditAssociateToShopper?: Maybe<CuCredit>
  updateCustomerPurchaseOrderAccount?: Maybe<CustomerPurchaseOrderAccount>
  updateCustomerSegment?: Maybe<CustomerSegment>
  updateDocumentList?: Maybe<DocumentList>
  updateDocumentListDocument?: Maybe<Document>
  updateDocumentListDocumentContent?: Maybe<Scalars["Boolean"]>
  updateDocumentListDocumentTreeContent?: Maybe<Scalars["Boolean"]>
  updateDocumentListType?: Maybe<DocumentListType>
  updateDocumentType?: Maybe<DocumentType>
  updateEntityList?: Maybe<EntityList>
  updateEntityListEntities?: Maybe<Scalars["Boolean"]>
  updateEntityListView?: Maybe<ListView>
  updateForgottenCustomerAccountPassword?: Maybe<Scalars["Boolean"]>
  updateLocationUsage?: Maybe<LocationUsage>
  updateOrder?: Maybe<Order>
  updateOrderAdjustment?: Maybe<Order>
  updateOrderAttributes?: Maybe<Array<Maybe<OrderAttribute>>>
  updateOrderBillingInfo?: Maybe<BillingInfo>
  updateOrderCoupon?: Maybe<Order>
  updateOrderDigitalPackage?: Maybe<DigitalPackage>
  updateOrderDigitalWalletTpe?: Maybe<Order>
  updateOrderDiscount?: Maybe<Order>
  updateOrderDraft?: Maybe<Scalars["Boolean"]>
  updateOrderExtendedProperties?: Maybe<Array<Maybe<ExtendedProperty>>>
  updateOrderExtendedProperty?: Maybe<ExtendedProperty>
  updateOrderFulfillmentInfo?: Maybe<FulfillmentInfo>
  updateOrderHandlingAdjustment?: Maybe<Order>
  updateOrderItemDiscount?: Maybe<Order>
  updateOrderItemDutyAmount?: Maybe<Order>
  updateOrderItemFulfillment?: Maybe<Order>
  updateOrderItemPrice?: Maybe<Order>
  updateOrderItemQuantity?: Maybe<Order>
  updateOrderNotes?: Maybe<OrderNote>
  updateOrderPackage?: Maybe<CrPackageObj>
  updateOrderPickup?: Maybe<Pickup>
  updateOrderPrice?: Maybe<Order>
  updateOrderPriceList?: Maybe<Order>
  updateOrderRefund?: Maybe<Scalars["Boolean"]>
  updateOrderShippingAdjustment?: Maybe<Order>
  updateOrderValidationResults?: Maybe<OrderValidationResult>
  updatePropertyType?: Maybe<PropertyType>
  updateQuote?: Maybe<Quote>
  updateReturn?: Maybe<ReturnObj>
  updateReturnNote?: Maybe<OrderNote>
  updateReturnPackage?: Maybe<CrPackageObj>
  updateTargetRule?: Maybe<TargetRule>
  updateUserCart?: Maybe<Cart>
  updateUserOrder?: Maybe<Order>
  updateWishlist?: Maybe<Wishlist>
  updateWishlistItem?: Maybe<WishlistItem>
  updateWishlistItemQuantity?: Maybe<WishlistItem>
  validateAddress?: Maybe<Array<Maybe<CuAddress>>>
  validateCustomerAddress?: Maybe<AddressValidationResponse>
  validateOrder?: Maybe<OrderValidationResult>
  validateProduct?: Maybe<ProductValidationSummary>
  validateProductDiscounts?: Maybe<DiscountValidationSummary>
  validateTargetRule?: Maybe<Scalars["Boolean"]>
}

export type MutationAddExtendedPropertyToCurrentCartArgs = {
  extendedPropertyInput?: Maybe<ExtendedPropertyInput>
}

export type MutationAddItemToCartArgs = {
  cartId: Scalars["String"]
  cartItemInput?: Maybe<CartItemInput>
}

export type MutationAddItemToCurrentCartArgs = {
  cartItemInput?: Maybe<CartItemInput>
}

export type MutationAddItemsToCartArgs = {
  cartId: Scalars["String"]
  cartItemInput?: Maybe<CartItemInput>
  throwErrorOnInvalidItems?: Maybe<Scalars["Boolean"]>
}

export type MutationAddItemsToCurrentCartArgs = {
  cartItemInput?: Maybe<CartItemInput>
  throwErrorOnInvalidItems?: Maybe<Scalars["Boolean"]>
}

export type MutationAddRoleToCustomerB2bAccountArgs = {
  accountId: Scalars["Int"]
  roleId: Scalars["Int"]
  userId: Scalars["String"]
}

export type MutationAdminCreateLocationArgs = {
  locationInput?: Maybe<LocationInput>
}

export type MutationAdminCreateLocationAttributeArgs = {
  attributeInput?: Maybe<LoAttributeInput>
}

export type MutationAdminCreateLocationGroupArgs = {
  locationGroupInput?: Maybe<LocationGroupInput>
}

export type MutationAdminCreateLocationTypeArgs = {
  locationTypeInput?: Maybe<LocationTypeInput>
}

export type MutationAdminUpdateLocationArgs = {
  locationCode: Scalars["String"]
  locationInput?: Maybe<LocationInput>
}

export type MutationAdminUpdateLocationAttributeArgs = {
  attributeFQN: Scalars["String"]
  attributeInput?: Maybe<LoAttributeInput>
}

export type MutationAdminUpdateLocationTypeArgs = {
  locationTypeCode: Scalars["String"]
  locationTypeInput?: Maybe<LocationTypeInput>
}

export type MutationCancelOrderArgs = {
  canceledReasonInput?: Maybe<CanceledReasonInput>
  orderId: Scalars["String"]
}

export type MutationChangeCustomerAccountPasswordArgs = {
  accountId: Scalars["Int"]
  passwordInfoInput?: Maybe<PasswordInfoInput>
  unlockAccount?: Maybe<Scalars["Boolean"]>
  userId?: Maybe<Scalars["String"]>
}

export type MutationConfigureProductArgs = {
  includeOptionDetails?: Maybe<Scalars["Boolean"]>
  productCode: Scalars["String"]
  productOptionSelectionsInput?: Maybe<ProductOptionSelectionsInput>
  purchaseLocation?: Maybe<Scalars["String"]>
  quantity?: Maybe<Scalars["Int"]>
  skipInventoryCheck?: Maybe<Scalars["Boolean"]>
  variationProductCodeFilter?: Maybe<Scalars["String"]>
}

export type MutationCreateCartForUserArgs = {
  userId: Scalars["String"]
}

export type MutationCreateCheckoutArgs = {
  cartId?: Maybe<Scalars["String"]>
}

export type MutationCreateCheckoutActionArgs = {
  checkoutActionInput?: Maybe<CheckoutActionInput>
  checkoutId: Scalars["String"]
}

export type MutationCreateCheckoutAttributeArgs = {
  checkoutId: Scalars["String"]
  orderAttributeInput?: Maybe<OrderAttributeInput>
}

export type MutationCreateCheckoutDestinationArgs = {
  checkoutId: Scalars["String"]
  destinationInput?: Maybe<DestinationInput>
}

export type MutationCreateCheckoutItemArgs = {
  checkoutId: Scalars["String"]
  orderItemInput?: Maybe<CrOrderItemInput>
}

export type MutationCreateCheckoutItemDestinationArgs = {
  checkoutId: Scalars["String"]
  itemsForDestinationInput?: Maybe<ItemsForDestinationInput>
}

export type MutationCreateCheckoutPaymentActionArgs = {
  checkoutId: Scalars["String"]
  paymentActionInput?: Maybe<PaymentActionInput>
}

export type MutationCreateCheckoutShippingMethodArgs = {
  checkoutGroupShippingMethodInput?: Maybe<CheckoutGroupShippingMethodInput>
  checkoutId: Scalars["String"]
}

export type MutationCreateCommerceChannelArgs = {
  channelInput?: Maybe<ChannelInput>
}

export type MutationCreateCommerceChannelGroupArgs = {
  channelGroupInput?: Maybe<ChannelGroupInput>
}

export type MutationCreateCustomerAccountArgs = {
  customerAccountInput?: Maybe<CustomerAccountInput>
}

export type MutationCreateCustomerAccountAndLoginArgs = {
  customerAccountAndAuthInfoInput?: Maybe<CustomerAccountAndAuthInfoInput>
}

export type MutationCreateCustomerAccountAttributeArgs = {
  accountId: Scalars["Int"]
  customerAttributeInput?: Maybe<CustomerAttributeInput>
  userId?: Maybe<Scalars["String"]>
}

export type MutationCreateCustomerAccountAttributeDefinitionArgs = {
  attributeInput?: Maybe<CuAttributeInput>
}

export type MutationCreateCustomerAccountCardArgs = {
  accountId: Scalars["Int"]
  cardInput?: Maybe<CardInput>
}

export type MutationCreateCustomerAccountContactArgs = {
  accountId: Scalars["Int"]
  customerContactInput?: Maybe<CustomerContactInput>
}

export type MutationCreateCustomerAccountLoginArgs = {
  accountId: Scalars["Int"]
  customerLoginInfoInput?: Maybe<CustomerLoginInfoInput>
}

export type MutationCreateCustomerAccountNoteArgs = {
  accountId: Scalars["Int"]
  customerNoteInput?: Maybe<CustomerNoteInput>
}

export type MutationCreateCustomerAccountPurchaseOrderAccountArgs = {
  accountId: Scalars["Int"]
  customerPurchaseOrderAccountInput?: Maybe<CustomerPurchaseOrderAccountInput>
}

export type MutationCreateCustomerAccountPurchaseOrderAccountTransactionArgs = {
  accountId: Scalars["Int"]
  purchaseOrderTransactionInput?: Maybe<PurchaseOrderTransactionInput>
}

export type MutationCreateCustomerAccountTransactionArgs = {
  accountId: Scalars["Int"]
  transactionInput?: Maybe<TransactionInput>
}

export type MutationCreateCustomerAccountsArgs = {
  customerAccountAndAuthInfoInput?: Maybe<CustomerAccountAndAuthInfoInput>
}

export type MutationCreateCustomerAuthTicketArgs = {
  customerUserAuthInfoInput?: Maybe<CustomerUserAuthInfoInput>
}

export type MutationCreateCustomerB2bAccountArgs = {
  b2BAccountInput?: Maybe<B2BAccountInput>
}

export type MutationCreateCustomerB2bAccountAttributeArgs = {
  accountId: Scalars["Int"]
  customerAttributeInput?: Maybe<CustomerAttributeInput>
}

export type MutationCreateCustomerB2bAccountUserArgs = {
  accountId: Scalars["Int"]
  b2BUserAndAuthInfoInput?: Maybe<B2BUserAndAuthInfoInput>
}

export type MutationCreateCustomerCreditArgs = {
  creditInput?: Maybe<CuCreditInput>
  userId?: Maybe<Scalars["String"]>
}

export type MutationCreateCustomerCreditTransactionArgs = {
  code: Scalars["String"]
  creditTransactionInput?: Maybe<CreditTransactionInput>
}

export type MutationCreateCustomerSegmentArgs = {
  customerSegmentInput?: Maybe<CustomerSegmentInput>
}

export type MutationCreateCustomerSegmentAccountArgs = {
  graphQLInt?: Maybe<Scalars["Int"]>
  id: Scalars["Int"]
}

export type MutationCreateDocumentDraftArgs = {
  documentLists?: Maybe<Scalars["String"]>
  graphQLString?: Maybe<Scalars["String"]>
}

export type MutationCreateDocumentListArgs = {
  documentListInput?: Maybe<DocumentListInput>
}

export type MutationCreateDocumentListDocumentArgs = {
  documentInput?: Maybe<DocumentInput>
  documentListName: Scalars["String"]
}

export type MutationCreateDocumentListTypeArgs = {
  documentListTypeInput?: Maybe<DocumentListTypeInput>
}

export type MutationCreateDocumentTypeArgs = {
  documentTypeInput?: Maybe<DocumentTypeInput>
}

export type MutationCreateEntityListArgs = {
  entityListInput?: Maybe<EntityListInput>
}

export type MutationCreateEntityListEntityArgs = {
  entityListFullName: Scalars["String"]
  httpRequestMessageInput?: Maybe<MzdbHttpRequestMessageInput>
}

export type MutationCreateEntityListViewArgs = {
  entityListFullName: Scalars["String"]
  listViewInput?: Maybe<ListViewInput>
}

export type MutationCreateInStockNotificationArgs = {
  inStockNotificationSubscriptionInput?: Maybe<InStockNotificationSubscriptionInput>
}

export type MutationCreateOrderArgs = {
  cartId?: Maybe<Scalars["String"]>
  orderInput?: Maybe<OrderInput>
  quoteId?: Maybe<Scalars["String"]>
}

export type MutationCreateOrderActionArgs = {
  orderActionInput?: Maybe<OrderActionInput>
  orderId: Scalars["String"]
}

export type MutationCreateOrderAttributeArgs = {
  orderAttributeInput?: Maybe<OrderAttributeInput>
  orderId: Scalars["String"]
}

export type MutationCreateOrderAutoCaptureArgs = {
  forceCapture?: Maybe<Scalars["Boolean"]>
  orderId: Scalars["String"]
}

export type MutationCreateOrderDigitalPackageArgs = {
  digitalPackageInput?: Maybe<DigitalPackageInput>
  orderId: Scalars["String"]
}

export type MutationCreateOrderExtendedPropertiesArgs = {
  extendedPropertyInput?: Maybe<ExtendedPropertyInput>
  orderId: Scalars["String"]
  updateMode?: Maybe<Scalars["String"]>
  version?: Maybe<Scalars["String"]>
}

export type MutationCreateOrderFulfillmentActionArgs = {
  fulfillmentActionInput?: Maybe<FulfillmentActionInput>
  orderId: Scalars["String"]
}

export type MutationCreateOrderItemArgs = {
  orderId: Scalars["String"]
  orderItemInput?: Maybe<CrOrderItemInput>
  skipInventoryCheck?: Maybe<Scalars["Boolean"]>
  updateMode?: Maybe<Scalars["String"]>
  version?: Maybe<Scalars["String"]>
}

export type MutationCreateOrderNoteArgs = {
  orderId: Scalars["String"]
  orderNoteInput?: Maybe<OrderNoteInput>
}

export type MutationCreateOrderPackageArgs = {
  orderId: Scalars["String"]
  packageObjInput?: Maybe<CrPackageObjInput>
}

export type MutationCreateOrderPaymentActionArgs = {
  orderId: Scalars["String"]
  paymentActionInput?: Maybe<PaymentActionInput>
}

export type MutationCreateOrderPaymentPaymentActionArgs = {
  orderId: Scalars["String"]
  paymentActionInput?: Maybe<PaymentActionInput>
  paymentId: Scalars["String"]
}

export type MutationCreateOrderPickupArgs = {
  orderId: Scalars["String"]
  pickupInput?: Maybe<PickupInput>
}

export type MutationCreateOrderRefundArgs = {
  orderId: Scalars["String"]
  refundInput?: Maybe<RefundInput>
}

export type MutationCreateOrderRoutingSuggestionArgs = {
  returnSuggestionLog?: Maybe<Scalars["Boolean"]>
  suggestionRequestInput?: Maybe<SuggestionRequestInput>
}

export type MutationCreateOrderShipmentArgs = {
  graphQLString?: Maybe<Scalars["String"]>
  orderId: Scalars["String"]
}

export type MutationCreateOrderShipmentAdjustmentArgs = {
  orderId: Scalars["String"]
  shipmentAdjustmentInput?: Maybe<ShipmentAdjustmentInput>
  shipmentNumber: Scalars["Int"]
}

export type MutationCreateOrderShipmentItemAdjustmentArgs = {
  itemId: Scalars["Int"]
  orderId: Scalars["String"]
  shipmentItemAdjustmentInput?: Maybe<ShipmentItemAdjustmentInput>
  shipmentNumber: Scalars["Int"]
}

export type MutationCreateProductCostArgs = {
  productCostQueryInput?: Maybe<ProductCostQueryInput>
}

export type MutationCreatePropertyTypeArgs = {
  propertyTypeInput?: Maybe<PropertyTypeInput>
}

export type MutationCreatePurchaseOrderAccountArgs = {
  accountType?: Maybe<Scalars["String"]>
  pageSize?: Maybe<Scalars["Int"]>
  sortBy?: Maybe<Scalars["String"]>
  startIndex?: Maybe<Scalars["Int"]>
}

export type MutationCreateQuoteArgs = {
  quoteInput?: Maybe<QuoteInput>
}

export type MutationCreateQuoteItemArgs = {
  orderItemInput?: Maybe<CrOrderItemInput>
  quoteId: Scalars["String"]
  updateMode?: Maybe<Scalars["String"]>
}

export type MutationCreateResolvedPriceListArgs = {
  object?: Maybe<Scalars["Object"]>
}

export type MutationCreateReturnArgs = {
  returnObjInput?: Maybe<ReturnObjInput>
}

export type MutationCreateReturnActionArgs = {
  returnActionInput?: Maybe<ReturnActionInput>
}

export type MutationCreateReturnItemArgs = {
  returnId: Scalars["String"]
  returnItemInput?: Maybe<ReturnItemInput>
}

export type MutationCreateReturnNoteArgs = {
  orderNoteInput?: Maybe<OrderNoteInput>
  returnId: Scalars["String"]
}

export type MutationCreateReturnPackageArgs = {
  packageObjInput?: Maybe<CrPackageObjInput>
  returnId: Scalars["String"]
}

export type MutationCreateReturnPaymentActionArgs = {
  paymentActionInput?: Maybe<PaymentActionInput>
  returnId: Scalars["String"]
}

export type MutationCreateReturnPaymentPaymentActionArgs = {
  paymentActionInput?: Maybe<PaymentActionInput>
  paymentId: Scalars["String"]
  returnId: Scalars["String"]
}

export type MutationCreateReturnShipmentArgs = {
  graphQLString?: Maybe<Scalars["String"]>
  returnId: Scalars["String"]
}

export type MutationCreateTargetRuleArgs = {
  targetRuleInput?: Maybe<TargetRuleInput>
}

export type MutationCreateWishlistArgs = {
  wishlistInput?: Maybe<WishlistInput>
}

export type MutationCreateWishlistItemArgs = {
  wishlistId: Scalars["String"]
  wishlistItemInput?: Maybe<WishlistItemInput>
}

export type MutationDeleteAdminLocationArgs = {
  locationCode: Scalars["String"]
}

export type MutationDeleteAdminLocationTypeArgs = {
  locationTypeCode: Scalars["String"]
}

export type MutationDeleteB2bAccountAttributeArgs = {
  accountId: Scalars["Int"]
  attributeFQN: Scalars["String"]
}

export type MutationDeleteB2bAccountRoleArgs = {
  accountId: Scalars["Int"]
  roleId: Scalars["Int"]
  userId: Scalars["String"]
}

export type MutationDeleteCartArgs = {
  cartId: Scalars["String"]
}

export type MutationDeleteCartCouponArgs = {
  cartId: Scalars["String"]
  couponCode: Scalars["String"]
}

export type MutationDeleteCartCouponsArgs = {
  cartId: Scalars["String"]
}

export type MutationDeleteCartItemArgs = {
  cartId: Scalars["String"]
  cartItemId: Scalars["String"]
}

export type MutationDeleteCartItemsArgs = {
  cartId: Scalars["String"]
}

export type MutationDeleteCheckoutCouponArgs = {
  checkoutId: Scalars["String"]
  couponCode: Scalars["String"]
}

export type MutationDeleteCheckoutCouponsArgs = {
  checkoutId: Scalars["String"]
}

export type MutationDeleteCheckoutDestinationArgs = {
  checkoutId: Scalars["String"]
  destinationId: Scalars["String"]
}

export type MutationDeleteCheckoutItemArgs = {
  checkoutId: Scalars["String"]
  itemId: Scalars["String"]
}

export type MutationDeleteCommerceChannelArgs = {
  code: Scalars["String"]
}

export type MutationDeleteCommerceChannelGroupArgs = {
  code: Scalars["String"]
}

export type MutationDeleteCommerceTargetRuleArgs = {
  code: Scalars["String"]
}

export type MutationDeleteCurrentCartExtendedPropertiesArgs = {
  graphQLString?: Maybe<Scalars["String"]>
}

export type MutationDeleteCurrentCartExtendedPropertyArgs = {
  key: Scalars["String"]
}

export type MutationDeleteCurrentCartItemArgs = {
  cartItemId: Scalars["String"]
}

export type MutationDeleteCurrentCartMessageArgs = {
  messageId: Scalars["String"]
}

export type MutationDeleteCustomerAccountArgs = {
  accountId: Scalars["Int"]
}

export type MutationDeleteCustomerAccountAttributeArgs = {
  accountId: Scalars["Int"]
  attributeFQN: Scalars["String"]
  userId?: Maybe<Scalars["String"]>
}

export type MutationDeleteCustomerAccountCardArgs = {
  accountId: Scalars["Int"]
  cardId: Scalars["String"]
}

export type MutationDeleteCustomerAccountContactArgs = {
  accountId: Scalars["Int"]
  contactId: Scalars["Int"]
}

export type MutationDeleteCustomerAccountNoteArgs = {
  accountId: Scalars["Int"]
  noteId: Scalars["Int"]
}

export type MutationDeleteCustomerAccountTransactionArgs = {
  accountId: Scalars["Int"]
  transactionId: Scalars["String"]
}

export type MutationDeleteCustomerCreditArgs = {
  code: Scalars["String"]
}

export type MutationDeleteCustomerSegmentArgs = {
  id: Scalars["Int"]
}

export type MutationDeleteCustomerSegmentAccountArgs = {
  accountId: Scalars["Int"]
  id: Scalars["Int"]
}

export type MutationDeleteDocumentListArgs = {
  documentListName: Scalars["String"]
}

export type MutationDeleteDocumentListDocumentArgs = {
  documentId: Scalars["String"]
  documentListName: Scalars["String"]
}

export type MutationDeleteDocumentListDocumentContentArgs = {
  documentId: Scalars["String"]
  documentListName: Scalars["String"]
}

export type MutationDeleteDocumentListDocumentTreeContentArgs = {
  documentListName: Scalars["String"]
  documentName: Scalars["String"]
  httpRequestMessageInput?: Maybe<CoHttpRequestMessageInput>
}

export type MutationDeleteEntityListArgs = {
  entityListFullName: Scalars["String"]
}

export type MutationDeleteEntityListEntityArgs = {
  entityListFullName: Scalars["String"]
  id: Scalars["String"]
}

export type MutationDeleteEntityListViewArgs = {
  entityListFullName: Scalars["String"]
  viewName: Scalars["String"]
}

export type MutationDeleteInStockNotificationArgs = {
  id: Scalars["Int"]
}

export type MutationDeleteOrderAdjustmentArgs = {
  orderId: Scalars["String"]
  updateMode?: Maybe<Scalars["String"]>
  version?: Maybe<Scalars["String"]>
}

export type MutationDeleteOrderAdjustmentHandlingArgs = {
  orderId: Scalars["String"]
  updateMode?: Maybe<Scalars["String"]>
  version?: Maybe<Scalars["String"]>
}

export type MutationDeleteOrderAdjustmentShippingArgs = {
  orderId: Scalars["String"]
  updateMode?: Maybe<Scalars["String"]>
  version?: Maybe<Scalars["String"]>
}

export type MutationDeleteOrderCouponArgs = {
  couponCode: Scalars["String"]
  orderId: Scalars["String"]
  updateMode?: Maybe<Scalars["String"]>
  version?: Maybe<Scalars["String"]>
}

export type MutationDeleteOrderCouponsArgs = {
  orderId: Scalars["String"]
  updateMode?: Maybe<Scalars["String"]>
  version?: Maybe<Scalars["String"]>
}

export type MutationDeleteOrderDigitalPackageArgs = {
  digitalPackageId: Scalars["String"]
  orderId: Scalars["String"]
}

export type MutationDeleteOrderExtendedPropertiesArgs = {
  graphQLString?: Maybe<Scalars["String"]>
  orderId: Scalars["String"]
  updateMode?: Maybe<Scalars["String"]>
  version?: Maybe<Scalars["String"]>
}

export type MutationDeleteOrderExtendedPropertyArgs = {
  key: Scalars["String"]
  orderId: Scalars["String"]
  updateMode?: Maybe<Scalars["String"]>
  version?: Maybe<Scalars["String"]>
}

export type MutationDeleteOrderItemArgs = {
  orderId: Scalars["String"]
  orderItemId: Scalars["String"]
  updateMode?: Maybe<Scalars["String"]>
  version?: Maybe<Scalars["String"]>
}

export type MutationDeleteOrderNoteArgs = {
  noteId: Scalars["String"]
  orderId: Scalars["String"]
}

export type MutationDeleteOrderPackageArgs = {
  orderId: Scalars["String"]
  packageId: Scalars["String"]
}

export type MutationDeleteOrderPickupArgs = {
  orderId: Scalars["String"]
  pickupId: Scalars["String"]
}

export type MutationDeleteOrderShipmentArgs = {
  orderId: Scalars["String"]
  shipmentId: Scalars["String"]
}

export type MutationDeletePropertyTypeArgs = {
  propertyTypeName: Scalars["String"]
}

export type MutationDeleteQuoteArgs = {
  draft?: Maybe<Scalars["Boolean"]>
  quoteId: Scalars["String"]
}

export type MutationDeleteQuoteItemArgs = {
  quoteId: Scalars["String"]
  quoteItemId: Scalars["String"]
  updateMode?: Maybe<Scalars["String"]>
}

export type MutationDeleteReturnArgs = {
  returnId: Scalars["String"]
}

export type MutationDeleteReturnItemArgs = {
  orderId: Scalars["String"]
  orderItemId: Scalars["String"]
  returnId?: Maybe<Scalars["String"]>
  returnItemId?: Maybe<Scalars["String"]>
}

export type MutationDeleteReturnNoteArgs = {
  noteId: Scalars["String"]
  returnId: Scalars["String"]
}

export type MutationDeleteReturnPackageArgs = {
  packageId: Scalars["String"]
  returnId: Scalars["String"]
}

export type MutationDeleteReturnShipmentArgs = {
  returnId: Scalars["String"]
  shipmentId: Scalars["String"]
}

export type MutationDeleteUserCartArgs = {
  userId: Scalars["String"]
}

export type MutationDeleteWishlistArgs = {
  wishlistId: Scalars["String"]
}

export type MutationDeleteWishlistItemArgs = {
  wishlistId: Scalars["String"]
  wishlistItemId: Scalars["String"]
}

export type MutationDeleteWishlistItemsArgs = {
  wishlistId: Scalars["String"]
}

export type MutationManageLocationProductInventoryArgs = {
  locationInventoryQueryInput?: Maybe<LocationInventoryQueryInput>
}

export type MutationPatchDocumentListDocumentArgs = {
  documentId: Scalars["String"]
  documentInput?: Maybe<DocumentInput>
  documentListName: Scalars["String"]
}

export type MutationRecomputeCustomerAccountLifetimeValueArgs = {
  accountId: Scalars["Int"]
}

export type MutationRefreshCustomerAuthTicketsArgs = {
  refreshToken?: Maybe<Scalars["String"]>
}

export type MutationRejectCartDiscountArgs = {
  cartId: Scalars["String"]
  discountId: Scalars["Int"]
}

export type MutationRemoveCustomerB2bAccountUserArgs = {
  accountId: Scalars["Int"]
  userId: Scalars["String"]
}

export type MutationRepriceOrderShipmentArgs = {
  orderId: Scalars["String"]
  repriceShipmentObjectInput?: Maybe<RepriceShipmentObjectInput>
  shipmentNumber: Scalars["Int"]
}

export type MutationResendCheckoutEmailArgs = {
  checkoutId: Scalars["String"]
}

export type MutationResendCustomerCreditEmailArgs = {
  code: Scalars["String"]
  userId?: Maybe<Scalars["String"]>
}

export type MutationResendOrderEmailArgs = {
  orderActionInput?: Maybe<OrderActionInput>
  orderId: Scalars["String"]
}

export type MutationResendOrderFulfillmentEmailArgs = {
  fulfillmentActionInput?: Maybe<FulfillmentActionInput>
  orderId: Scalars["String"]
}

export type MutationResendReturnEmailArgs = {
  returnActionInput?: Maybe<ReturnActionInput>
}

export type MutationResetCustomerAccountPasswordArgs = {
  resetPasswordInfoInput?: Maybe<ResetPasswordInfoInput>
}

export type MutationSetCustomerAccountLoginLockedArgs = {
  accountId: Scalars["Int"]
  graphQLBoolean?: Maybe<Scalars["Boolean"]>
  userId?: Maybe<Scalars["String"]>
}

export type MutationSetCustomerAccountPasswordChangeRequiredArgs = {
  accountId: Scalars["Int"]
  graphQLBoolean?: Maybe<Scalars["Boolean"]>
  userId?: Maybe<Scalars["String"]>
}

export type MutationSetReturnRestockArgs = {
  restockableReturnItemInput?: Maybe<RestockableReturnItemInput>
  returnId: Scalars["String"]
}

export type MutationSetReturnShipArgs = {
  returnId: Scalars["String"]
  returnItemSpecifierInput?: Maybe<ReturnItemSpecifierInput>
}

export type MutationSplitOrderShipmentArgs = {
  orderId: Scalars["String"]
  shipmentNumber: Scalars["String"]
  splitShipmentsObjectInput?: Maybe<SplitShipmentsObjectInput>
}

export type MutationToggleDocumentPublishingArgs = {
  documentLists?: Maybe<Scalars["String"]>
  graphQLString?: Maybe<Scalars["String"]>
}

export type MutationUpdateCartArgs = {
  cartId: Scalars["String"]
  cartInput?: Maybe<CartInput>
}

export type MutationUpdateCartCouponArgs = {
  cartId: Scalars["String"]
  couponCode: Scalars["String"]
}

export type MutationUpdateCartItemArgs = {
  cartId: Scalars["String"]
  cartItemId: Scalars["String"]
  cartItemInput?: Maybe<CartItemInput>
}

export type MutationUpdateCartItemQuantityArgs = {
  cartId: Scalars["String"]
  cartItemId: Scalars["String"]
  quantity: Scalars["Int"]
}

export type MutationUpdateChannelArgs = {
  channelInput?: Maybe<ChannelInput>
  code: Scalars["String"]
}

export type MutationUpdateChannelGroupArgs = {
  channelGroupInput?: Maybe<ChannelGroupInput>
  code: Scalars["String"]
}

export type MutationUpdateCheckoutArgs = {
  checkoutId: Scalars["String"]
  checkoutInput?: Maybe<CheckoutInput>
}

export type MutationUpdateCheckoutAttributesArgs = {
  checkoutId: Scalars["String"]
  orderAttributeInput?: Maybe<OrderAttributeInput>
  removeMissing?: Maybe<Scalars["Boolean"]>
}

export type MutationUpdateCheckoutCouponArgs = {
  checkoutId: Scalars["String"]
  couponCode: Scalars["String"]
}

export type MutationUpdateCheckoutDestinationArgs = {
  checkoutId: Scalars["String"]
  destinationId: Scalars["String"]
  destinationInput?: Maybe<DestinationInput>
}

export type MutationUpdateCheckoutDigitalWalletTypeArgs = {
  checkoutId: Scalars["String"]
  digitalWalletInput?: Maybe<DigitalWalletInput>
  digitalWalletType: Scalars["String"]
}

export type MutationUpdateCheckoutItemDestinationArgs = {
  checkoutId: Scalars["String"]
  destinationId: Scalars["String"]
  itemId: Scalars["String"]
}

export type MutationUpdateCheckoutPaymentActionArgs = {
  checkoutId: Scalars["String"]
  paymentActionInput?: Maybe<PaymentActionInput>
  paymentId: Scalars["String"]
}

export type MutationUpdateCheckoutPriceListArgs = {
  checkoutId: Scalars["String"]
  graphQLString?: Maybe<Scalars["String"]>
}

export type MutationUpdateCurrentCartArgs = {
  cartInput?: Maybe<CartInput>
}

export type MutationUpdateCurrentCartExtendedPropertiesArgs = {
  extendedPropertyInput?: Maybe<ExtendedPropertyInput>
  upsert?: Maybe<Scalars["Boolean"]>
}

export type MutationUpdateCurrentCartExtendedPropertyArgs = {
  extendedPropertyInput?: Maybe<ExtendedPropertyInput>
  key: Scalars["String"]
  upsert?: Maybe<Scalars["Boolean"]>
}

export type MutationUpdateCurrentCartItemArgs = {
  cartItemId: Scalars["String"]
  cartItemInput?: Maybe<CartItemInput>
}

export type MutationUpdateCurrentCartItemQuantityArgs = {
  cartItemId: Scalars["String"]
  quantity: Scalars["Int"]
}

export type MutationUpdateCustomerAccountArgs = {
  accountId: Scalars["Int"]
  customerAccountInput?: Maybe<CustomerAccountInput>
}

export type MutationUpdateCustomerAccountAttributeArgs = {
  accountId: Scalars["Int"]
  attributeFQN: Scalars["String"]
  customerAttributeInput?: Maybe<CustomerAttributeInput>
  userId?: Maybe<Scalars["String"]>
}

export type MutationUpdateCustomerAccountAttributeDefinitionArgs = {
  attributeFQN: Scalars["String"]
  attributeInput?: Maybe<CuAttributeInput>
}

export type MutationUpdateCustomerAccountCardArgs = {
  accountId: Scalars["Int"]
  cardId: Scalars["String"]
  cardInput?: Maybe<CardInput>
}

export type MutationUpdateCustomerAccountContactArgs = {
  accountId: Scalars["Int"]
  contactId: Scalars["Int"]
  customerContactInput?: Maybe<CustomerContactInput>
  userId?: Maybe<Scalars["String"]>
}

export type MutationUpdateCustomerAccountContactsArgs = {
  accountId: Scalars["Int"]
  customerContactInput?: Maybe<CustomerContactInput>
}

export type MutationUpdateCustomerAccountNoteArgs = {
  accountId: Scalars["Int"]
  customerNoteInput?: Maybe<CustomerNoteInput>
  noteId: Scalars["Int"]
}

export type MutationUpdateCustomerAccountPasswordsArgs = {
  accountPasswordInfoCollectionInput?: Maybe<AccountPasswordInfoCollectionInput>
}

export type MutationUpdateCustomerB2bAccountArgs = {
  accountId: Scalars["Int"]
  b2BAccountInput?: Maybe<B2BAccountInput>
}

export type MutationUpdateCustomerB2bAccountAttributeArgs = {
  accountId: Scalars["Int"]
  attributeFQN: Scalars["String"]
  customerAttributeInput?: Maybe<CustomerAttributeInput>
}

export type MutationUpdateCustomerB2bAccountUserArgs = {
  accountId: Scalars["Int"]
  b2BUserInput?: Maybe<B2BUserInput>
  userId: Scalars["String"]
}

export type MutationUpdateCustomerCreditArgs = {
  code: Scalars["String"]
  creditInput?: Maybe<CuCreditInput>
}

export type MutationUpdateCustomerCreditAssociateToShopperArgs = {
  code: Scalars["String"]
}

export type MutationUpdateCustomerPurchaseOrderAccountArgs = {
  accountId: Scalars["Int"]
  customerPurchaseOrderAccountInput?: Maybe<CustomerPurchaseOrderAccountInput>
}

export type MutationUpdateCustomerSegmentArgs = {
  customerSegmentInput?: Maybe<CustomerSegmentInput>
  id: Scalars["Int"]
}

export type MutationUpdateDocumentListArgs = {
  documentListInput?: Maybe<DocumentListInput>
  documentListName: Scalars["String"]
}

export type MutationUpdateDocumentListDocumentArgs = {
  documentId: Scalars["String"]
  documentInput?: Maybe<DocumentInput>
  documentListName: Scalars["String"]
}

export type MutationUpdateDocumentListDocumentContentArgs = {
  documentId: Scalars["String"]
  documentListName: Scalars["String"]
  httpRequestMessageInput?: Maybe<CoHttpRequestMessageInput>
}

export type MutationUpdateDocumentListDocumentTreeContentArgs = {
  documentListName: Scalars["String"]
  documentName: Scalars["String"]
  httpRequestMessageInput?: Maybe<CoHttpRequestMessageInput>
}

export type MutationUpdateDocumentListTypeArgs = {
  documentListTypeFQN: Scalars["String"]
  documentListTypeInput?: Maybe<DocumentListTypeInput>
}

export type MutationUpdateDocumentTypeArgs = {
  documentTypeInput?: Maybe<DocumentTypeInput>
  documentTypeName: Scalars["String"]
}

export type MutationUpdateEntityListArgs = {
  entityListFullName: Scalars["String"]
  entityListInput?: Maybe<EntityListInput>
}

export type MutationUpdateEntityListEntitiesArgs = {
  entityListFullName: Scalars["String"]
  httpRequestMessageInput?: Maybe<MzdbHttpRequestMessageInput>
  id: Scalars["String"]
}

export type MutationUpdateEntityListViewArgs = {
  entityListFullName: Scalars["String"]
  listViewInput?: Maybe<ListViewInput>
  viewName: Scalars["String"]
}

export type MutationUpdateForgottenCustomerAccountPasswordArgs = {
  confirmationInfoInput?: Maybe<ConfirmationInfoInput>
}

export type MutationUpdateLocationUsageArgs = {
  code: Scalars["String"]
  locationUsageInput?: Maybe<LocationUsageInput>
}

export type MutationUpdateOrderArgs = {
  orderId: Scalars["String"]
  orderInput?: Maybe<OrderInput>
  updateMode?: Maybe<Scalars["String"]>
  version?: Maybe<Scalars["String"]>
}

export type MutationUpdateOrderAdjustmentArgs = {
  adjustmentInput?: Maybe<AdjustmentInput>
  orderId: Scalars["String"]
  updateMode?: Maybe<Scalars["String"]>
  version?: Maybe<Scalars["String"]>
}

export type MutationUpdateOrderAttributesArgs = {
  orderAttributeInput?: Maybe<OrderAttributeInput>
  orderId: Scalars["String"]
  removeMissing?: Maybe<Scalars["Boolean"]>
}

export type MutationUpdateOrderBillingInfoArgs = {
  billingInfoInput?: Maybe<BillingInfoInput>
  orderId: Scalars["String"]
  updateMode?: Maybe<Scalars["String"]>
  version?: Maybe<Scalars["String"]>
}

export type MutationUpdateOrderCouponArgs = {
  couponCode: Scalars["String"]
  orderId: Scalars["String"]
  updateMode?: Maybe<Scalars["String"]>
  version?: Maybe<Scalars["String"]>
}

export type MutationUpdateOrderDigitalPackageArgs = {
  digitalPackageId: Scalars["String"]
  digitalPackageInput?: Maybe<DigitalPackageInput>
  orderId: Scalars["String"]
}

export type MutationUpdateOrderDigitalWalletTpeArgs = {
  digitalWalletInput?: Maybe<DigitalWalletInput>
  digitalWalletType: Scalars["String"]
  orderId: Scalars["String"]
}

export type MutationUpdateOrderDiscountArgs = {
  appliedDiscountInput?: Maybe<CrAppliedDiscountInput>
  discountId: Scalars["Int"]
  orderId: Scalars["String"]
  updateMode?: Maybe<Scalars["String"]>
  version?: Maybe<Scalars["String"]>
}

export type MutationUpdateOrderDraftArgs = {
  orderId: Scalars["String"]
  version?: Maybe<Scalars["String"]>
}

export type MutationUpdateOrderExtendedPropertiesArgs = {
  extendedPropertyInput?: Maybe<ExtendedPropertyInput>
  orderId: Scalars["String"]
  updateMode?: Maybe<Scalars["String"]>
  upsert?: Maybe<Scalars["Boolean"]>
  version?: Maybe<Scalars["String"]>
}

export type MutationUpdateOrderExtendedPropertyArgs = {
  extendedPropertyInput?: Maybe<ExtendedPropertyInput>
  key: Scalars["String"]
  orderId: Scalars["String"]
  updateMode?: Maybe<Scalars["String"]>
  upsert?: Maybe<Scalars["Boolean"]>
  version?: Maybe<Scalars["String"]>
}

export type MutationUpdateOrderFulfillmentInfoArgs = {
  fulfillmentInfoInput?: Maybe<FulfillmentInfoInput>
  orderId: Scalars["String"]
  updateMode?: Maybe<Scalars["String"]>
  version?: Maybe<Scalars["String"]>
}

export type MutationUpdateOrderHandlingAdjustmentArgs = {
  adjustmentInput?: Maybe<AdjustmentInput>
  orderId: Scalars["String"]
  updateMode?: Maybe<Scalars["String"]>
  version?: Maybe<Scalars["String"]>
}

export type MutationUpdateOrderItemDiscountArgs = {
  appliedDiscountInput?: Maybe<CrAppliedDiscountInput>
  discountId: Scalars["Int"]
  orderId: Scalars["String"]
  orderItemId: Scalars["String"]
  updateMode?: Maybe<Scalars["String"]>
  version?: Maybe<Scalars["String"]>
}

export type MutationUpdateOrderItemDutyAmountArgs = {
  dutyAmount: Scalars["Float"]
  orderId: Scalars["String"]
  orderItemId: Scalars["String"]
  updateMode?: Maybe<Scalars["String"]>
  version?: Maybe<Scalars["String"]>
}

export type MutationUpdateOrderItemFulfillmentArgs = {
  orderId: Scalars["String"]
  orderItemId: Scalars["String"]
  orderItemInput?: Maybe<CrOrderItemInput>
  updateMode?: Maybe<Scalars["String"]>
  version?: Maybe<Scalars["String"]>
}

export type MutationUpdateOrderItemPriceArgs = {
  orderId: Scalars["String"]
  orderItemId: Scalars["String"]
  price: Scalars["Float"]
  updateMode?: Maybe<Scalars["String"]>
  version?: Maybe<Scalars["String"]>
}

export type MutationUpdateOrderItemQuantityArgs = {
  orderId: Scalars["String"]
  orderItemId: Scalars["String"]
  quantity: Scalars["Int"]
  updateMode?: Maybe<Scalars["String"]>
  version?: Maybe<Scalars["String"]>
}

export type MutationUpdateOrderNotesArgs = {
  noteId: Scalars["String"]
  orderId: Scalars["String"]
  orderNoteInput?: Maybe<OrderNoteInput>
}

export type MutationUpdateOrderPackageArgs = {
  orderId: Scalars["String"]
  packageId: Scalars["String"]
  packageObjInput?: Maybe<CrPackageObjInput>
}

export type MutationUpdateOrderPickupArgs = {
  orderId: Scalars["String"]
  pickupId: Scalars["String"]
  pickupInput?: Maybe<PickupInput>
}

export type MutationUpdateOrderPriceArgs = {
  orderInput?: Maybe<OrderInput>
  refreshShipping?: Maybe<Scalars["Boolean"]>
}

export type MutationUpdateOrderPriceListArgs = {
  graphQLString?: Maybe<Scalars["String"]>
  orderId: Scalars["String"]
  updateMode?: Maybe<Scalars["String"]>
  version?: Maybe<Scalars["String"]>
}

export type MutationUpdateOrderRefundArgs = {
  orderId: Scalars["String"]
  refundId: Scalars["String"]
}

export type MutationUpdateOrderShippingAdjustmentArgs = {
  adjustmentInput?: Maybe<AdjustmentInput>
  orderId: Scalars["String"]
  updateMode?: Maybe<Scalars["String"]>
  version?: Maybe<Scalars["String"]>
}

export type MutationUpdateOrderValidationResultsArgs = {
  orderId: Scalars["String"]
  orderValidationResultInput?: Maybe<OrderValidationResultInput>
}

export type MutationUpdatePropertyTypeArgs = {
  propertyTypeInput?: Maybe<PropertyTypeInput>
  propertyTypeName: Scalars["String"]
}

export type MutationUpdateQuoteArgs = {
  quoteId: Scalars["String"]
  quoteInput?: Maybe<QuoteInput>
  updateMode?: Maybe<Scalars["String"]>
}

export type MutationUpdateReturnArgs = {
  returnId: Scalars["String"]
  returnObjInput?: Maybe<ReturnObjInput>
}

export type MutationUpdateReturnNoteArgs = {
  noteId: Scalars["String"]
  orderNoteInput?: Maybe<OrderNoteInput>
  returnId: Scalars["String"]
}

export type MutationUpdateReturnPackageArgs = {
  packageId: Scalars["String"]
  packageObjInput?: Maybe<CrPackageObjInput>
  returnId: Scalars["String"]
}

export type MutationUpdateTargetRuleArgs = {
  code: Scalars["String"]
  targetRuleInput?: Maybe<TargetRuleInput>
}

export type MutationUpdateUserCartArgs = {
  cartInput?: Maybe<CartInput>
  userId: Scalars["String"]
}

export type MutationUpdateUserOrderArgs = {
  orderId: Scalars["String"]
}

export type MutationUpdateWishlistArgs = {
  wishlistId: Scalars["String"]
  wishlistInput?: Maybe<WishlistInput>
}

export type MutationUpdateWishlistItemArgs = {
  wishlistId: Scalars["String"]
  wishlistItemId: Scalars["String"]
  wishlistItemInput?: Maybe<WishlistItemInput>
}

export type MutationUpdateWishlistItemQuantityArgs = {
  quantity: Scalars["Int"]
  wishlistId: Scalars["String"]
  wishlistItemId: Scalars["String"]
}

export type MutationValidateAddressArgs = {
  addressInput?: Maybe<CuAddressInput>
}

export type MutationValidateCustomerAddressArgs = {
  addressValidationRequestInput?: Maybe<AddressValidationRequestInput>
}

export type MutationValidateOrderArgs = {
  orderInput?: Maybe<OrderInput>
}

export type MutationValidateProductArgs = {
  productCode: Scalars["String"]
  productOptionSelectionsInput?: Maybe<ProductOptionSelectionsInput>
  purchaseLocation?: Maybe<Scalars["String"]>
  quantity?: Maybe<Scalars["Int"]>
  skipDefaults?: Maybe<Scalars["Boolean"]>
  skipInventoryCheck?: Maybe<Scalars["Boolean"]>
}

export type MutationValidateProductDiscountsArgs = {
  allowInactive?: Maybe<Scalars["Boolean"]>
  customerAccountId?: Maybe<Scalars["Int"]>
  discountSelectionsInput?: Maybe<DiscountSelectionsInput>
  productCode: Scalars["String"]
  skipInventoryCheck?: Maybe<Scalars["Boolean"]>
  variationProductCode?: Maybe<Scalars["String"]>
}

export type MutationValidateTargetRuleArgs = {
  targetRuleInput?: Maybe<TargetRuleInput>
}

export enum NodeTypeEnum {
  Array = "ARRAY",
  Binary = "BINARY",
  Boolean = "BOOLEAN",
  Missing = "MISSING",
  Null = "NULL",
  Number = "NUMBER",
  Object = "OBJECT",
  Pojo = "POJO",
  String = "STRING",
}

export type Order = {
  __typename?: "Order"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<Order>
  acceptedDate?: Maybe<Scalars["DateTime"]>
  acceptsMarketing?: Maybe<Scalars["Boolean"]>
  adjustment?: Maybe<Adjustment>
  amountAvailableForRefund: Scalars["Float"]
  amountRefunded: Scalars["Float"]
  amountRemainingForPayment: Scalars["Float"]
  attributes?: Maybe<Array<Maybe<OrderAttribute>>>
  auditInfo?: Maybe<CrAuditInfo>
  availableActions?: Maybe<Array<Scalars["String"]>>
  billingInfo?: Maybe<BillingInfo>
  cancelledDate?: Maybe<Scalars["DateTime"]>
  changeMessages?: Maybe<Array<Maybe<ChangeMessage>>>
  channelCode?: Maybe<Scalars["String"]>
  closedDate?: Maybe<Scalars["DateTime"]>
  couponCodes?: Maybe<Array<Scalars["String"]>>
  credits?: Maybe<Array<Maybe<Credit>>>
  currencyCode?: Maybe<Scalars["String"]>
  customerAccountId?: Maybe<Scalars["Int"]>
  customerInteractionType?: Maybe<Scalars["String"]>
  customerTaxId?: Maybe<Scalars["String"]>
  data?: Maybe<Scalars["Object"]>
  digitalPackages?: Maybe<Array<Maybe<DigitalPackage>>>
  discountThresholdMessages?: Maybe<Array<Maybe<ThresholdMessage>>>
  discountTotal?: Maybe<Scalars["Float"]>
  discountedSubtotal?: Maybe<Scalars["Float"]>
  discountedTotal?: Maybe<Scalars["Float"]>
  dutyAmount?: Maybe<Scalars["Float"]>
  dutyTotal?: Maybe<Scalars["Float"]>
  email?: Maybe<Scalars["String"]>
  expirationDate?: Maybe<Scalars["DateTime"]>
  extendedProperties?: Maybe<Array<Maybe<ExtendedProperty>>>
  externalId?: Maybe<Scalars["String"]>
  feeTotal?: Maybe<Scalars["Float"]>
  fulfillmentInfo?: Maybe<FulfillmentInfo>
  fulfillmentStatus?: Maybe<Scalars["String"]>
  handlingAdjustment?: Maybe<Adjustment>
  handlingAmount?: Maybe<Scalars["Float"]>
  handlingDiscounts?: Maybe<Array<Maybe<CrAppliedDiscount>>>
  handlingSubTotal?: Maybe<Scalars["Float"]>
  handlingTaxTotal?: Maybe<Scalars["Float"]>
  handlingTotal?: Maybe<Scalars["Float"]>
  hasDraft?: Maybe<Scalars["Boolean"]>
  id?: Maybe<Scalars["String"]>
  importDate?: Maybe<Scalars["DateTime"]>
  invalidCoupons?: Maybe<Array<Maybe<InvalidCoupon>>>
  ipAddress?: Maybe<Scalars["String"]>
  isDraft?: Maybe<Scalars["Boolean"]>
  isEligibleForReturns?: Maybe<Scalars["Boolean"]>
  isHistoricalImport?: Maybe<Scalars["Boolean"]>
  isImport?: Maybe<Scalars["Boolean"]>
  isOptInForSms?: Maybe<Scalars["Boolean"]>
  isPartialOrder?: Maybe<Scalars["Boolean"]>
  isTaxExempt?: Maybe<Scalars["Boolean"]>
  isUnified?: Maybe<Scalars["Boolean"]>
  itemTaxTotal?: Maybe<Scalars["Float"]>
  items?: Maybe<Array<Maybe<CrOrderItem>>>
  lastValidationDate?: Maybe<Scalars["DateTime"]>
  lineItemSubtotalWithOrderAdjustments?: Maybe<Scalars["Float"]>
  locationCode?: Maybe<Scalars["String"]>
  notes?: Maybe<Array<Maybe<OrderNote>>>
  orderDiscounts?: Maybe<Array<Maybe<CrAppliedDiscount>>>
  orderNumber?: Maybe<Scalars["Int"]>
  originalCartId?: Maybe<Scalars["String"]>
  originalQuoteId?: Maybe<Scalars["String"]>
  originalQuoteNumber?: Maybe<Scalars["Int"]>
  packages?: Maybe<Array<Maybe<CrPackageObj>>>
  parentCheckoutId?: Maybe<Scalars["String"]>
  parentCheckoutNumber?: Maybe<Scalars["Int"]>
  parentOrderId?: Maybe<Scalars["String"]>
  parentOrderNumber?: Maybe<Scalars["Int"]>
  parentReturnId?: Maybe<Scalars["String"]>
  parentReturnNumber?: Maybe<Scalars["Int"]>
  partialOrderCount?: Maybe<Scalars["Int"]>
  partialOrderNumber?: Maybe<Scalars["Int"]>
  paymentStatus?: Maybe<Scalars["String"]>
  payments?: Maybe<Array<Maybe<Payment>>>
  pickups?: Maybe<Array<Maybe<Pickup>>>
  priceListCode?: Maybe<Scalars["String"]>
  readyToCapture?: Maybe<Scalars["Boolean"]>
  refunds?: Maybe<Array<Maybe<Refund>>>
  rejectedDiscounts?: Maybe<Array<Maybe<SuggestedDiscount>>>
  returnStatus?: Maybe<Scalars["String"]>
  shipments?: Maybe<Array<Maybe<Shipment>>>
  shippingAdjustment?: Maybe<Adjustment>
  shippingAmountBeforeDiscountsAndAdjustments?: Maybe<Scalars["Float"]>
  shippingDiscounts?: Maybe<Array<Maybe<ShippingDiscount>>>
  shippingSubTotal?: Maybe<Scalars["Float"]>
  shippingTaxTotal?: Maybe<Scalars["Float"]>
  shippingTotal?: Maybe<Scalars["Float"]>
  shopperNotes?: Maybe<ShopperNotes>
  siteId?: Maybe<Scalars["Int"]>
  sourceDevice?: Maybe<Scalars["String"]>
  status?: Maybe<Scalars["String"]>
  submittedDate?: Maybe<Scalars["DateTime"]>
  subtotal?: Maybe<Scalars["Float"]>
  suggestedDiscounts?: Maybe<Array<Maybe<SuggestedDiscount>>>
  taxData?: Maybe<Scalars["Object"]>
  taxTotal?: Maybe<Scalars["Float"]>
  tenantId?: Maybe<Scalars["Int"]>
  total?: Maybe<Scalars["Float"]>
  totalCollected: Scalars["Float"]
  type?: Maybe<Scalars["String"]>
  userId?: Maybe<Scalars["String"]>
  validationResults?: Maybe<Array<Maybe<OrderValidationResult>>>
  version?: Maybe<Scalars["String"]>
  visitId?: Maybe<Scalars["String"]>
  webSessionId?: Maybe<Scalars["String"]>
}

export type Order_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type OrderActionInput = {
  actionName?: Maybe<Scalars["String"]>
}

export type OrderAttribute = {
  __typename?: "OrderAttribute"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<OrderAttribute>
  attributeDefinitionId?: Maybe<Scalars["Int"]>
  auditInfo?: Maybe<CrAuditInfo>
  fullyQualifiedName?: Maybe<Scalars["String"]>
  values?: Maybe<Array<Scalars["Object"]>>
}

export type OrderAttribute_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type OrderAttributeInput = {
  attributeDefinitionId?: Maybe<Scalars["Int"]>
  auditInfo?: Maybe<CrAuditInfoInput>
  fullyQualifiedName?: Maybe<Scalars["String"]>
  values?: Maybe<Array<Scalars["Object"]>>
}

export type OrderCollection = {
  __typename?: "OrderCollection"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<OrderCollection>
  items?: Maybe<Array<Maybe<Order>>>
  pageCount: Scalars["Int"]
  pageSize: Scalars["Int"]
  startIndex: Scalars["Int"]
  totalCount: Scalars["Int"]
}

export type OrderCollection_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type OrderInput = {
  acceptedDate?: Maybe<Scalars["DateTime"]>
  acceptsMarketing?: Maybe<Scalars["Boolean"]>
  adjustment?: Maybe<AdjustmentInput>
  amountAvailableForRefund: Scalars["Float"]
  amountRefunded: Scalars["Float"]
  amountRemainingForPayment: Scalars["Float"]
  attributes?: Maybe<Array<Maybe<OrderAttributeInput>>>
  auditInfo?: Maybe<CrAuditInfoInput>
  availableActions?: Maybe<Array<Scalars["String"]>>
  billingInfo?: Maybe<BillingInfoInput>
  cancelledDate?: Maybe<Scalars["DateTime"]>
  changeMessages?: Maybe<Array<Maybe<ChangeMessageInput>>>
  channelCode?: Maybe<Scalars["String"]>
  closedDate?: Maybe<Scalars["DateTime"]>
  couponCodes?: Maybe<Array<Scalars["String"]>>
  credits?: Maybe<Array<Maybe<CreditInput>>>
  currencyCode?: Maybe<Scalars["String"]>
  customerAccountId?: Maybe<Scalars["Int"]>
  customerInteractionType?: Maybe<Scalars["String"]>
  customerTaxId?: Maybe<Scalars["String"]>
  data?: Maybe<Scalars["Object"]>
  digitalPackages?: Maybe<Array<Maybe<DigitalPackageInput>>>
  discountThresholdMessages?: Maybe<Array<Maybe<ThresholdMessageInput>>>
  discountTotal?: Maybe<Scalars["Float"]>
  discountedSubtotal?: Maybe<Scalars["Float"]>
  discountedTotal?: Maybe<Scalars["Float"]>
  dutyAmount?: Maybe<Scalars["Float"]>
  dutyTotal?: Maybe<Scalars["Float"]>
  email?: Maybe<Scalars["String"]>
  expirationDate?: Maybe<Scalars["DateTime"]>
  extendedProperties?: Maybe<Array<Maybe<ExtendedPropertyInput>>>
  externalId?: Maybe<Scalars["String"]>
  feeTotal?: Maybe<Scalars["Float"]>
  fulfillmentInfo?: Maybe<FulfillmentInfoInput>
  fulfillmentStatus?: Maybe<Scalars["String"]>
  handlingAdjustment?: Maybe<AdjustmentInput>
  handlingAmount?: Maybe<Scalars["Float"]>
  handlingDiscounts?: Maybe<Array<Maybe<CrAppliedDiscountInput>>>
  handlingSubTotal?: Maybe<Scalars["Float"]>
  handlingTaxTotal?: Maybe<Scalars["Float"]>
  handlingTotal?: Maybe<Scalars["Float"]>
  hasDraft?: Maybe<Scalars["Boolean"]>
  id?: Maybe<Scalars["String"]>
  importDate?: Maybe<Scalars["DateTime"]>
  invalidCoupons?: Maybe<Array<Maybe<InvalidCouponInput>>>
  ipAddress?: Maybe<Scalars["String"]>
  isDraft?: Maybe<Scalars["Boolean"]>
  isEligibleForReturns?: Maybe<Scalars["Boolean"]>
  isHistoricalImport?: Maybe<Scalars["Boolean"]>
  isImport?: Maybe<Scalars["Boolean"]>
  isOptInForSms?: Maybe<Scalars["Boolean"]>
  isPartialOrder?: Maybe<Scalars["Boolean"]>
  isTaxExempt?: Maybe<Scalars["Boolean"]>
  isUnified?: Maybe<Scalars["Boolean"]>
  itemTaxTotal?: Maybe<Scalars["Float"]>
  items?: Maybe<Array<Maybe<CrOrderItemInput>>>
  lastValidationDate?: Maybe<Scalars["DateTime"]>
  lineItemSubtotalWithOrderAdjustments?: Maybe<Scalars["Float"]>
  locationCode?: Maybe<Scalars["String"]>
  notes?: Maybe<Array<Maybe<OrderNoteInput>>>
  orderDiscounts?: Maybe<Array<Maybe<CrAppliedDiscountInput>>>
  orderNumber?: Maybe<Scalars["Int"]>
  originalCartId?: Maybe<Scalars["String"]>
  originalQuoteId?: Maybe<Scalars["String"]>
  originalQuoteNumber?: Maybe<Scalars["Int"]>
  packages?: Maybe<Array<Maybe<CrPackageObjInput>>>
  parentCheckoutId?: Maybe<Scalars["String"]>
  parentCheckoutNumber?: Maybe<Scalars["Int"]>
  parentOrderId?: Maybe<Scalars["String"]>
  parentOrderNumber?: Maybe<Scalars["Int"]>
  parentReturnId?: Maybe<Scalars["String"]>
  parentReturnNumber?: Maybe<Scalars["Int"]>
  partialOrderCount?: Maybe<Scalars["Int"]>
  partialOrderNumber?: Maybe<Scalars["Int"]>
  paymentStatus?: Maybe<Scalars["String"]>
  payments?: Maybe<Array<Maybe<PaymentInput>>>
  pickups?: Maybe<Array<Maybe<PickupInput>>>
  priceListCode?: Maybe<Scalars["String"]>
  readyToCapture?: Maybe<Scalars["Boolean"]>
  refunds?: Maybe<Array<Maybe<RefundInput>>>
  rejectedDiscounts?: Maybe<Array<Maybe<SuggestedDiscountInput>>>
  returnStatus?: Maybe<Scalars["String"]>
  shipments?: Maybe<Array<Maybe<ShipmentInput>>>
  shippingAdjustment?: Maybe<AdjustmentInput>
  shippingAmountBeforeDiscountsAndAdjustments?: Maybe<Scalars["Float"]>
  shippingDiscounts?: Maybe<Array<Maybe<ShippingDiscountInput>>>
  shippingSubTotal?: Maybe<Scalars["Float"]>
  shippingTaxTotal?: Maybe<Scalars["Float"]>
  shippingTotal?: Maybe<Scalars["Float"]>
  shopperNotes?: Maybe<ShopperNotesInput>
  siteId?: Maybe<Scalars["Int"]>
  sourceDevice?: Maybe<Scalars["String"]>
  status?: Maybe<Scalars["String"]>
  submittedDate?: Maybe<Scalars["DateTime"]>
  subtotal?: Maybe<Scalars["Float"]>
  suggestedDiscounts?: Maybe<Array<Maybe<SuggestedDiscountInput>>>
  taxData?: Maybe<Scalars["Object"]>
  taxTotal?: Maybe<Scalars["Float"]>
  tenantId?: Maybe<Scalars["Int"]>
  total?: Maybe<Scalars["Float"]>
  totalCollected: Scalars["Float"]
  type?: Maybe<Scalars["String"]>
  userId?: Maybe<Scalars["String"]>
  validationResults?: Maybe<Array<Maybe<OrderValidationResultInput>>>
  version?: Maybe<Scalars["String"]>
  visitId?: Maybe<Scalars["String"]>
  webSessionId?: Maybe<Scalars["String"]>
}

export type OrderItemCollection = {
  __typename?: "OrderItemCollection"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<OrderItemCollection>
  items?: Maybe<Array<Maybe<CrOrderItem>>>
  totalCount: Scalars["Int"]
}

export type OrderItemCollection_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type OrderItemInput = {
  backorderable?: Maybe<Scalars["Boolean"]>
  customItemData: Scalars["Object"]
  itemDependency: Scalars["Int"]
  orderItemID: Scalars["Int"]
  partNumber: Scalars["String"]
  quantity: Scalars["Int"]
  sku: Scalars["String"]
  upc: Scalars["String"]
}

export type OrderNote = {
  __typename?: "OrderNote"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<OrderNote>
  auditInfo?: Maybe<CrAuditInfo>
  id?: Maybe<Scalars["String"]>
  text?: Maybe<Scalars["String"]>
}

export type OrderNote_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type OrderNoteInput = {
  auditInfo?: Maybe<CrAuditInfoInput>
  id?: Maybe<Scalars["String"]>
  text?: Maybe<Scalars["String"]>
}

export type OrderReturnableItem = {
  __typename?: "OrderReturnableItem"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<OrderReturnableItem>
  fulfillmentFields?: Maybe<Array<Maybe<FulfillmentField>>>
  fulfillmentStatus?: Maybe<Scalars["String"]>
  mfgPartNumber?: Maybe<Scalars["String"]>
  orderItemId?: Maybe<Scalars["String"]>
  orderItemOptionAttributeFQN?: Maybe<Scalars["String"]>
  orderLineId: Scalars["Int"]
  parentProductCode?: Maybe<Scalars["String"]>
  parentProductName?: Maybe<Scalars["String"]>
  productCode?: Maybe<Scalars["String"]>
  productName?: Maybe<Scalars["String"]>
  quantityFulfilled: Scalars["Int"]
  quantityOrdered: Scalars["Int"]
  quantityReturnable: Scalars["Int"]
  quantityReturned: Scalars["Int"]
  shipmentItemId?: Maybe<Scalars["Int"]>
  shipmentNumber?: Maybe<Scalars["Int"]>
  sku?: Maybe<Scalars["String"]>
  unitQuantity: Scalars["Int"]
}

export type OrderReturnableItem_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type OrderReturnableItemCollection = {
  __typename?: "OrderReturnableItemCollection"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<OrderReturnableItemCollection>
  items?: Maybe<Array<Maybe<OrderReturnableItem>>>
  totalCount: Scalars["Int"]
}

export type OrderReturnableItemCollection_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export enum OrderTypeEnum {
  Directship = "DIRECTSHIP",
  Transfer = "TRANSFER",
}

export type OrderValidationMessage = {
  __typename?: "OrderValidationMessage"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<OrderValidationMessage>
  message?: Maybe<Scalars["String"]>
  messageType?: Maybe<Scalars["String"]>
  orderItemId?: Maybe<Scalars["String"]>
}

export type OrderValidationMessage_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type OrderValidationMessageInput = {
  message?: Maybe<Scalars["String"]>
  messageType?: Maybe<Scalars["String"]>
  orderItemId?: Maybe<Scalars["String"]>
}

export type OrderValidationResult = {
  __typename?: "OrderValidationResult"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<OrderValidationResult>
  createdDate?: Maybe<Scalars["DateTime"]>
  messages?: Maybe<Array<Maybe<OrderValidationMessage>>>
  status?: Maybe<Scalars["String"]>
  validationId?: Maybe<Scalars["String"]>
  validatorName?: Maybe<Scalars["String"]>
  validatorType?: Maybe<Scalars["String"]>
}

export type OrderValidationResult_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type OrderValidationResultInput = {
  createdDate?: Maybe<Scalars["DateTime"]>
  messages?: Maybe<Array<Maybe<OrderValidationMessageInput>>>
  status?: Maybe<Scalars["String"]>
  validationId?: Maybe<Scalars["String"]>
  validatorName?: Maybe<Scalars["String"]>
  validatorType?: Maybe<Scalars["String"]>
}

export type PackageItem = {
  __typename?: "PackageItem"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<PackageItem>
  fulfillmentItemType?: Maybe<Scalars["String"]>
  lineId?: Maybe<Scalars["Int"]>
  optionAttributeFQN?: Maybe<Scalars["String"]>
  productCode?: Maybe<Scalars["String"]>
  quantity: Scalars["Int"]
}

export type PackageItem_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type PackageItemInput = {
  fulfillmentItemType?: Maybe<Scalars["String"]>
  lineId?: Maybe<Scalars["Int"]>
  optionAttributeFQN?: Maybe<Scalars["String"]>
  productCode?: Maybe<Scalars["String"]>
  quantity: Scalars["Int"]
}

export type PackageSettings = {
  __typename?: "PackageSettings"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<PackageSettings>
  unitType?: Maybe<Scalars["String"]>
}

export type PackageSettings_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type PasswordInfoInput = {
  externalPassword?: Maybe<Scalars["String"]>
  newPassword?: Maybe<Scalars["String"]>
  oldPassword?: Maybe<Scalars["String"]>
}

export type Payment = {
  __typename?: "Payment"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<Payment>
  amountCollected: Scalars["Float"]
  amountCredited: Scalars["Float"]
  amountRequested: Scalars["Float"]
  auditInfo?: Maybe<CrAuditInfo>
  availableActions?: Maybe<Array<Scalars["String"]>>
  billingInfo?: Maybe<BillingInfo>
  changeMessages?: Maybe<Array<Maybe<ChangeMessage>>>
  data?: Maybe<Scalars["Object"]>
  externalTransactionId?: Maybe<Scalars["String"]>
  gatewayGiftCard?: Maybe<GatewayGiftCard>
  groupId?: Maybe<PaymentActionTarget>
  id?: Maybe<Scalars["String"]>
  interactions?: Maybe<Array<Maybe<PaymentInteraction>>>
  isRecurring?: Maybe<Scalars["Boolean"]>
  orderId?: Maybe<Scalars["String"]>
  paymentServiceTransactionId?: Maybe<Scalars["String"]>
  paymentType?: Maybe<Scalars["String"]>
  paymentWorkflow?: Maybe<Scalars["String"]>
  status?: Maybe<Scalars["String"]>
  subPayments?: Maybe<Array<Maybe<SubPayment>>>
}

export type Payment_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type PaymentActionInput = {
  actionName?: Maybe<Scalars["String"]>
  amount?: Maybe<Scalars["Float"]>
  cancelUrl?: Maybe<Scalars["String"]>
  checkNumber?: Maybe<Scalars["String"]>
  currencyCode?: Maybe<Scalars["String"]>
  data?: Maybe<Scalars["Object"]>
  externalTransactionId?: Maybe<Scalars["String"]>
  interactionDate?: Maybe<Scalars["DateTime"]>
  manualGatewayInteraction?: Maybe<PaymentGatewayInteractionInput>
  newBillingInfo?: Maybe<BillingInfoInput>
  recaptcha?: Maybe<Scalars["String"]>
  referenceSourcePaymentId?: Maybe<Scalars["String"]>
  returnUrl?: Maybe<Scalars["String"]>
}

export type PaymentActionTarget = {
  __typename?: "PaymentActionTarget"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<PaymentActionTarget>
  targetId?: Maybe<Scalars["String"]>
  targetNumber?: Maybe<Scalars["Int"]>
  targetType?: Maybe<Scalars["String"]>
}

export type PaymentActionTarget_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type PaymentActionTargetInput = {
  targetId?: Maybe<Scalars["String"]>
  targetNumber?: Maybe<Scalars["Int"]>
  targetType?: Maybe<Scalars["String"]>
}

export type PaymentCard = {
  __typename?: "PaymentCard"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<PaymentCard>
  bin?: Maybe<Scalars["String"]>
  cardNumberPartOrMask?: Maybe<Scalars["String"]>
  expireMonth: Scalars["Int"]
  expireYear: Scalars["Int"]
  isCardInfoSaved?: Maybe<Scalars["Boolean"]>
  isTokenized?: Maybe<Scalars["Boolean"]>
  isUsedRecurring?: Maybe<Scalars["Boolean"]>
  nameOnCard?: Maybe<Scalars["String"]>
  paymentOrCardType?: Maybe<Scalars["String"]>
  paymentServiceCardId?: Maybe<Scalars["String"]>
}

export type PaymentCard_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type PaymentCardInput = {
  bin?: Maybe<Scalars["String"]>
  cardNumberPartOrMask?: Maybe<Scalars["String"]>
  expireMonth: Scalars["Int"]
  expireYear: Scalars["Int"]
  isCardInfoSaved?: Maybe<Scalars["Boolean"]>
  isTokenized?: Maybe<Scalars["Boolean"]>
  isUsedRecurring?: Maybe<Scalars["Boolean"]>
  nameOnCard?: Maybe<Scalars["String"]>
  paymentOrCardType?: Maybe<Scalars["String"]>
  paymentServiceCardId?: Maybe<Scalars["String"]>
}

export type PaymentCollection = {
  __typename?: "PaymentCollection"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<PaymentCollection>
  items?: Maybe<Array<Maybe<Payment>>>
  totalCount: Scalars["Int"]
}

export type PaymentCollection_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type PaymentGatewayInteractionInput = {
  gatewayAVSCodes?: Maybe<Scalars["String"]>
  gatewayAuthCode?: Maybe<Scalars["String"]>
  gatewayCVV2Codes?: Maybe<Scalars["String"]>
  gatewayInteractionId?: Maybe<Scalars["Int"]>
  gatewayResponseCode?: Maybe<Scalars["String"]>
  gatewayResponseText?: Maybe<Scalars["String"]>
  gatewayTransactionId?: Maybe<Scalars["String"]>
}

export type PaymentGatewayResponseData = {
  __typename?: "PaymentGatewayResponseData"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<PaymentGatewayResponseData>
  key?: Maybe<Scalars["String"]>
  value?: Maybe<Scalars["String"]>
}

export type PaymentGatewayResponseData_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type PaymentGatewayResponseDataInput = {
  key?: Maybe<Scalars["String"]>
  value?: Maybe<Scalars["String"]>
}

export type PaymentInput = {
  amountCollected: Scalars["Float"]
  amountCredited: Scalars["Float"]
  amountRequested: Scalars["Float"]
  auditInfo?: Maybe<CrAuditInfoInput>
  availableActions?: Maybe<Array<Scalars["String"]>>
  billingInfo?: Maybe<BillingInfoInput>
  changeMessages?: Maybe<Array<Maybe<ChangeMessageInput>>>
  data?: Maybe<Scalars["Object"]>
  externalTransactionId?: Maybe<Scalars["String"]>
  gatewayGiftCard?: Maybe<GatewayGiftCardInput>
  groupId?: Maybe<PaymentActionTargetInput>
  id?: Maybe<Scalars["String"]>
  interactions?: Maybe<Array<Maybe<PaymentInteractionInput>>>
  isRecurring?: Maybe<Scalars["Boolean"]>
  orderId?: Maybe<Scalars["String"]>
  paymentServiceTransactionId?: Maybe<Scalars["String"]>
  paymentType?: Maybe<Scalars["String"]>
  paymentWorkflow?: Maybe<Scalars["String"]>
  status?: Maybe<Scalars["String"]>
  subPayments?: Maybe<Array<Maybe<SubPaymentInput>>>
}

export type PaymentInteraction = {
  __typename?: "PaymentInteraction"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<PaymentInteraction>
  amount?: Maybe<Scalars["Float"]>
  auditInfo?: Maybe<CrAuditInfo>
  capturableShipmentsSummary?: Maybe<Array<Maybe<CapturableShipmentSummary>>>
  checkNumber?: Maybe<Scalars["String"]>
  currencyCode?: Maybe<Scalars["String"]>
  gatewayAVSCodes?: Maybe<Scalars["String"]>
  gatewayAuthCode?: Maybe<Scalars["String"]>
  gatewayCVV2Codes?: Maybe<Scalars["String"]>
  gatewayInteractionId?: Maybe<Scalars["Int"]>
  gatewayResponseCode?: Maybe<Scalars["String"]>
  gatewayResponseData?: Maybe<Array<Maybe<PaymentGatewayResponseData>>>
  gatewayResponseText?: Maybe<Scalars["String"]>
  gatewayTransactionId?: Maybe<Scalars["String"]>
  id?: Maybe<Scalars["String"]>
  interactionDate?: Maybe<Scalars["DateTime"]>
  interactionType?: Maybe<Scalars["String"]>
  isManual?: Maybe<Scalars["Boolean"]>
  isRecurring?: Maybe<Scalars["Boolean"]>
  note?: Maybe<Scalars["String"]>
  orderId?: Maybe<Scalars["String"]>
  paymentEntryStatus?: Maybe<Scalars["String"]>
  paymentId?: Maybe<Scalars["String"]>
  paymentTransactionInteractionIdReference?: Maybe<Scalars["Int"]>
  refundId?: Maybe<Scalars["String"]>
  returnId?: Maybe<Scalars["String"]>
  status?: Maybe<Scalars["String"]>
  target?: Maybe<PaymentActionTarget>
}

export type PaymentInteraction_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type PaymentInteractionInput = {
  amount?: Maybe<Scalars["Float"]>
  auditInfo?: Maybe<CrAuditInfoInput>
  capturableShipmentsSummary?: Maybe<
    Array<Maybe<CapturableShipmentSummaryInput>>
  >
  checkNumber?: Maybe<Scalars["String"]>
  currencyCode?: Maybe<Scalars["String"]>
  gatewayAVSCodes?: Maybe<Scalars["String"]>
  gatewayAuthCode?: Maybe<Scalars["String"]>
  gatewayCVV2Codes?: Maybe<Scalars["String"]>
  gatewayInteractionId?: Maybe<Scalars["Int"]>
  gatewayResponseCode?: Maybe<Scalars["String"]>
  gatewayResponseData?: Maybe<Array<Maybe<PaymentGatewayResponseDataInput>>>
  gatewayResponseText?: Maybe<Scalars["String"]>
  gatewayTransactionId?: Maybe<Scalars["String"]>
  id?: Maybe<Scalars["String"]>
  interactionDate?: Maybe<Scalars["DateTime"]>
  interactionType?: Maybe<Scalars["String"]>
  isManual?: Maybe<Scalars["Boolean"]>
  isRecurring?: Maybe<Scalars["Boolean"]>
  note?: Maybe<Scalars["String"]>
  orderId?: Maybe<Scalars["String"]>
  paymentEntryStatus?: Maybe<Scalars["String"]>
  paymentId?: Maybe<Scalars["String"]>
  paymentTransactionInteractionIdReference?: Maybe<Scalars["Int"]>
  refundId?: Maybe<Scalars["String"]>
  returnId?: Maybe<Scalars["String"]>
  status?: Maybe<Scalars["String"]>
  target?: Maybe<PaymentActionTargetInput>
}

export type PaymentToken = {
  __typename?: "PaymentToken"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<PaymentToken>
  paymentServiceTokenId?: Maybe<Scalars["String"]>
  type?: Maybe<Scalars["String"]>
}

export type PaymentToken_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type PaymentTokenInput = {
  paymentServiceTokenId?: Maybe<Scalars["String"]>
  type?: Maybe<Scalars["String"]>
}

export type Pickup = {
  __typename?: "Pickup"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<Pickup>
  auditInfo?: Maybe<CrAuditInfo>
  availableActions?: Maybe<Array<Scalars["String"]>>
  changeMessages?: Maybe<Array<Maybe<ChangeMessage>>>
  code?: Maybe<Scalars["String"]>
  fulfillmentDate?: Maybe<Scalars["DateTime"]>
  fulfillmentLocationCode?: Maybe<Scalars["String"]>
  id?: Maybe<Scalars["String"]>
  items?: Maybe<Array<Maybe<PickupItem>>>
  status?: Maybe<Scalars["String"]>
}

export type Pickup_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type PickupInput = {
  auditInfo?: Maybe<CrAuditInfoInput>
  availableActions?: Maybe<Array<Scalars["String"]>>
  changeMessages?: Maybe<Array<Maybe<ChangeMessageInput>>>
  code?: Maybe<Scalars["String"]>
  fulfillmentDate?: Maybe<Scalars["DateTime"]>
  fulfillmentLocationCode?: Maybe<Scalars["String"]>
  id?: Maybe<Scalars["String"]>
  items?: Maybe<Array<Maybe<PickupItemInput>>>
  status?: Maybe<Scalars["String"]>
}

export type PickupItem = {
  __typename?: "PickupItem"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<PickupItem>
  fulfillmentItemType?: Maybe<Scalars["String"]>
  lineId?: Maybe<Scalars["Int"]>
  optionAttributeFQN?: Maybe<Scalars["String"]>
  productCode?: Maybe<Scalars["String"]>
  quantity: Scalars["Int"]
}

export type PickupItem_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type PickupItemInput = {
  fulfillmentItemType?: Maybe<Scalars["String"]>
  lineId?: Maybe<Scalars["Int"]>
  optionAttributeFQN?: Maybe<Scalars["String"]>
  productCode?: Maybe<Scalars["String"]>
  quantity: Scalars["Int"]
}

export type PrAppliedDiscount = {
  __typename?: "PrAppliedDiscount"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<PrAppliedDiscount>
  couponCode?: Maybe<Scalars["String"]>
  discount?: Maybe<PrDiscount>
  discounts?: Maybe<Array<Maybe<PrDiscount>>>
  impact: Scalars["Float"]
}

export type PrAppliedDiscount_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type PrAttributeValidation = {
  __typename?: "PrAttributeValidation"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<PrAttributeValidation>
  maxDateValue?: Maybe<Scalars["DateTime"]>
  maxNumericValue?: Maybe<Scalars["Float"]>
  maxStringLength?: Maybe<Scalars["Int"]>
  minDateValue?: Maybe<Scalars["DateTime"]>
  minNumericValue?: Maybe<Scalars["Float"]>
  minStringLength?: Maybe<Scalars["Int"]>
  regularExpression?: Maybe<Scalars["String"]>
}

export type PrAttributeValidation_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type PrBundledProduct = {
  __typename?: "PrBundledProduct"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<PrBundledProduct>
  content?: Maybe<ProductContent>
  creditValue?: Maybe<Scalars["Float"]>
  goodsType?: Maybe<Scalars["String"]>
  inventoryInfo?: Maybe<ProductInventoryInfo>
  isPackagedStandAlone?: Maybe<Scalars["Boolean"]>
  measurements?: Maybe<PrPackageMeasurements>
  optionAttributeFQN?: Maybe<Scalars["String"]>
  optionValue?: Maybe<Scalars["Object"]>
  productCode?: Maybe<Scalars["String"]>
  productType?: Maybe<Scalars["String"]>
  quantity: Scalars["Int"]
}

export type PrBundledProduct_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type PrCategory = {
  __typename?: "PrCategory"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<PrCategory>
  categoryCode?: Maybe<Scalars["String"]>
  categoryId: Scalars["Int"]
  childrenCategories?: Maybe<Array<Maybe<PrCategory>>>
  content?: Maybe<CategoryContent>
  count?: Maybe<Scalars["Int"]>
  isDisplayed?: Maybe<Scalars["Boolean"]>
  parentCategory?: Maybe<PrCategory>
  sequence?: Maybe<Scalars["Int"]>
  shouldSlice?: Maybe<Scalars["Boolean"]>
  updateDate: Scalars["DateTime"]
}

export type PrCategory_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type PrDiscount = {
  __typename?: "PrDiscount"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<PrDiscount>
  discountId: Scalars["Int"]
  expirationDate?: Maybe<Scalars["DateTime"]>
  friendlyDescription?: Maybe<Scalars["String"]>
  impact: Scalars["Float"]
  name?: Maybe<Scalars["String"]>
}

export type PrDiscount_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type PrMeasurement = {
  __typename?: "PrMeasurement"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<PrMeasurement>
  unit?: Maybe<Scalars["String"]>
  value?: Maybe<Scalars["Float"]>
}

export type PrMeasurement_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type PrPackageMeasurements = {
  __typename?: "PrPackageMeasurements"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<PrPackageMeasurements>
  packageHeight?: Maybe<PrMeasurement>
  packageLength?: Maybe<PrMeasurement>
  packageWeight?: Maybe<PrMeasurement>
  packageWidth?: Maybe<PrMeasurement>
}

export type PrPackageMeasurements_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type PriceList = {
  __typename?: "PriceList"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<PriceList>
  ancestors?: Maybe<Array<Maybe<PriceListNode>>>
  descendants?: Maybe<Array<Maybe<PriceListNode>>>
  description?: Maybe<Scalars["String"]>
  enabled?: Maybe<Scalars["Boolean"]>
  filteredInStoreFront?: Maybe<Scalars["Boolean"]>
  isIndexed?: Maybe<Scalars["Boolean"]>
  isSiteDefault?: Maybe<Scalars["Boolean"]>
  name?: Maybe<Scalars["String"]>
  priceListCode?: Maybe<Scalars["String"]>
  priceListId: Scalars["Int"]
  resolvable?: Maybe<Scalars["Boolean"]>
  validSites?: Maybe<Array<Scalars["Int"]>>
}

export type PriceList_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type PriceListNode = {
  __typename?: "PriceListNode"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<PriceListNode>
  parentPriceListId?: Maybe<Scalars["Int"]>
  priceListCode?: Maybe<Scalars["String"]>
  priceListId: Scalars["Int"]
  priceListLevel: Scalars["Int"]
}

export type PriceListNode_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type PricingAppliedDiscount = {
  __typename?: "PricingAppliedDiscount"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<PricingAppliedDiscount>
  couponCode?: Maybe<Scalars["String"]>
  couponSetId?: Maybe<Scalars["Int"]>
  discount?: Maybe<PricingDiscount>
  impact: Scalars["Float"]
}

export type PricingAppliedDiscount_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type PricingAppliedLineItemProductDiscount = {
  __typename?: "PricingAppliedLineItemProductDiscount"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<PricingAppliedLineItemProductDiscount>
  appliesToSalePrice?: Maybe<Scalars["Boolean"]>
  couponCode?: Maybe<Scalars["String"]>
  couponSetId?: Maybe<Scalars["Int"]>
  discount?: Maybe<PricingDiscount>
  impact: Scalars["Float"]
  impactPerUnit: Scalars["Float"]
  isForced?: Maybe<Scalars["Boolean"]>
  normalizedImpact: Scalars["Float"]
  quantity: Scalars["Int"]
}

export type PricingAppliedLineItemProductDiscount_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type PricingAppliedLineItemShippingDiscount = {
  __typename?: "PricingAppliedLineItemShippingDiscount"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<PricingAppliedLineItemShippingDiscount>
  couponCode?: Maybe<Scalars["String"]>
  couponSetId?: Maybe<Scalars["Int"]>
  discount?: Maybe<PricingDiscount>
  impact: Scalars["Float"]
  impactPerUnit: Scalars["Float"]
  isForced?: Maybe<Scalars["Boolean"]>
  normalizedImpact: Scalars["Float"]
  quantity: Scalars["Int"]
  shippingMethodCode?: Maybe<Scalars["String"]>
}

export type PricingAppliedLineItemShippingDiscount_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type PricingAppliedOrderShippingDiscount = {
  __typename?: "PricingAppliedOrderShippingDiscount"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<PricingAppliedOrderShippingDiscount>
  couponCode?: Maybe<Scalars["String"]>
  couponSetId?: Maybe<Scalars["Int"]>
  discount?: Maybe<PricingDiscount>
  impact: Scalars["Float"]
  shippingMethodCode?: Maybe<Scalars["String"]>
}

export type PricingAppliedOrderShippingDiscount_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type PricingDiscount = {
  __typename?: "PricingDiscount"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<PricingDiscount>
  amount: Scalars["Float"]
  amountType?: Maybe<Scalars["String"]>
  condition?: Maybe<PricingDiscountCondition>
  discountId: Scalars["Int"]
  doesNotApplyToMultiShipToOrders?: Maybe<Scalars["Boolean"]>
  doesNotApplyToProductsWithSalePrice?: Maybe<Scalars["Boolean"]>
  expirationDate?: Maybe<Scalars["DateTime"]>
  friendlyDescription?: Maybe<Scalars["String"]>
  includedPriceLists?: Maybe<Array<Scalars["String"]>>
  maxDiscountValuePerRedemption?: Maybe<Scalars["Float"]>
  maxRedemptions?: Maybe<Scalars["Int"]>
  maximumDiscountValuePerOrder?: Maybe<Scalars["Float"]>
  maximumRedemptionsPerOrder?: Maybe<Scalars["Int"]>
  maximumUsesPerUser?: Maybe<Scalars["Int"]>
  name?: Maybe<Scalars["String"]>
  redemptions: Scalars["Int"]
  requiresAuthenticatedUser?: Maybe<Scalars["Boolean"]>
  scope?: Maybe<Scalars["String"]>
  stackingLayer: Scalars["Int"]
  target?: Maybe<PricingDiscountTarget>
  type?: Maybe<Scalars["String"]>
}

export type PricingDiscount_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type PricingDiscountCondition = {
  __typename?: "PricingDiscountCondition"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<PricingDiscountCondition>
  couponCode?: Maybe<Scalars["String"]>
  customerSegmentIds?: Maybe<Array<Scalars["Int"]>>
  excludedCategoryIds?: Maybe<Array<Scalars["Int"]>>
  excludedProductCodes?: Maybe<Array<Scalars["String"]>>
  expirationDate?: Maybe<Scalars["DateTime"]>
  includedCategoryIds?: Maybe<Array<Scalars["Int"]>>
  includedProductCodes?: Maybe<Array<Scalars["String"]>>
  maximumOrderAmount?: Maybe<Scalars["Float"]>
  minimumCategorySubtotalBeforeDiscounts?: Maybe<Scalars["Float"]>
  minimumLifetimeValueAmount?: Maybe<Scalars["Float"]>
  minimumOrderAmount?: Maybe<Scalars["Float"]>
  minimumQuantityProductsRequiredInCategories?: Maybe<Scalars["Int"]>
  minimumQuantityRequiredProducts?: Maybe<Scalars["Int"]>
  paymentWorkflows?: Maybe<Array<Scalars["String"]>>
  requiresCoupon?: Maybe<Scalars["Boolean"]>
  startDate?: Maybe<Scalars["DateTime"]>
}

export type PricingDiscountCondition_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type PricingDiscountTarget = {
  __typename?: "PricingDiscountTarget"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<PricingDiscountTarget>
  excludedCategoriesOperator?: Maybe<Scalars["String"]>
  excludedCategoryIds?: Maybe<Array<Scalars["Int"]>>
  excludedProductCodes?: Maybe<Array<Scalars["String"]>>
  includeAllProducts?: Maybe<Scalars["Boolean"]>
  includedCategoriesOperator?: Maybe<Scalars["String"]>
  includedCategoryIds?: Maybe<Array<Scalars["Int"]>>
  includedProductCodes?: Maybe<Array<Scalars["String"]>>
  shippingMethods?: Maybe<Array<Scalars["String"]>>
  shippingZones?: Maybe<Array<Scalars["String"]>>
  type?: Maybe<Scalars["String"]>
}

export type PricingDiscountTarget_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type PricingProductAttribute = {
  __typename?: "PricingProductAttribute"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<PricingProductAttribute>
  dataType?: Maybe<Scalars["String"]>
  description?: Maybe<Scalars["String"]>
  inputType?: Maybe<Scalars["String"]>
  name?: Maybe<Scalars["String"]>
  valueType?: Maybe<Scalars["String"]>
}

export type PricingProductAttribute_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type PricingProductProperty = {
  __typename?: "PricingProductProperty"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<PricingProductProperty>
  attributeDetail?: Maybe<PricingProductAttribute>
  attributeFQN?: Maybe<Scalars["String"]>
  isHidden?: Maybe<Scalars["Boolean"]>
  isMultiValue?: Maybe<Scalars["Boolean"]>
  values?: Maybe<Array<Maybe<PricingProductPropertyValue>>>
}

export type PricingProductProperty_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type PricingProductPropertyValue = {
  __typename?: "PricingProductPropertyValue"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<PricingProductPropertyValue>
  stringValue?: Maybe<Scalars["String"]>
  value?: Maybe<Scalars["Object"]>
}

export type PricingProductPropertyValue_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type PricingTaxAttribute = {
  __typename?: "PricingTaxAttribute"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<PricingTaxAttribute>
  attributeDefinitionId?: Maybe<Scalars["Int"]>
  fullyQualifiedName?: Maybe<Scalars["String"]>
  values?: Maybe<Array<Scalars["Object"]>>
}

export type PricingTaxAttribute_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type PricingTaxContext = {
  __typename?: "PricingTaxContext"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<PricingTaxContext>
  customerId?: Maybe<Scalars["String"]>
  destinationAddress?: Maybe<CrAddress>
  originAddress?: Maybe<CrAddress>
  taxContextId?: Maybe<Scalars["String"]>
  taxExemptId?: Maybe<Scalars["String"]>
}

export type PricingTaxContext_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type PricingTaxableLineItem = {
  __typename?: "PricingTaxableLineItem"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<PricingTaxableLineItem>
  data?: Maybe<Scalars["Object"]>
  destinationAddress?: Maybe<CrAddress>
  discountTotal?: Maybe<Scalars["Float"]>
  discountedTotal?: Maybe<Scalars["Float"]>
  feeTotal?: Maybe<Scalars["Float"]>
  handlingAmount?: Maybe<Scalars["Float"]>
  id?: Maybe<Scalars["String"]>
  isTaxable?: Maybe<Scalars["Boolean"]>
  lineItemPrice: Scalars["Float"]
  originAddress?: Maybe<CrAddress>
  productCode?: Maybe<Scalars["String"]>
  productDiscount?: Maybe<PricingAppliedLineItemProductDiscount>
  productDiscounts?: Maybe<Array<Maybe<PricingAppliedLineItemProductDiscount>>>
  productName?: Maybe<Scalars["String"]>
  productProperties?: Maybe<Array<Maybe<PricingProductProperty>>>
  quantity: Scalars["Int"]
  reason?: Maybe<Scalars["String"]>
  shippingAmount: Scalars["Float"]
  shippingDiscount?: Maybe<PricingAppliedLineItemShippingDiscount>
  shippingDiscounts?: Maybe<
    Array<Maybe<PricingAppliedLineItemShippingDiscount>>
  >
  variantProductCode?: Maybe<Scalars["String"]>
}

export type PricingTaxableLineItem_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type PricingTaxableOrder = {
  __typename?: "PricingTaxableOrder"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<PricingTaxableOrder>
  attributes?: Maybe<Array<Maybe<PricingTaxAttribute>>>
  currencyCode?: Maybe<Scalars["String"]>
  data?: Maybe<Scalars["Object"]>
  handlingDiscount?: Maybe<PricingAppliedDiscount>
  handlingDiscounts?: Maybe<Array<Maybe<PricingAppliedDiscount>>>
  handlingFee: Scalars["Float"]
  lineItems?: Maybe<Array<Maybe<PricingTaxableLineItem>>>
  orderDate: Scalars["DateTime"]
  orderDiscount?: Maybe<PricingAppliedDiscount>
  orderDiscounts?: Maybe<Array<Maybe<PricingAppliedDiscount>>>
  orderId?: Maybe<Scalars["String"]>
  orderNumber?: Maybe<Scalars["Int"]>
  originalDocumentCode?: Maybe<Scalars["String"]>
  originalOrderDate: Scalars["DateTime"]
  shippingAmount: Scalars["Float"]
  shippingDiscount?: Maybe<PricingAppliedOrderShippingDiscount>
  shippingDiscounts?: Maybe<Array<Maybe<PricingAppliedOrderShippingDiscount>>>
  shippingMethodCode?: Maybe<Scalars["String"]>
  shippingMethodName?: Maybe<Scalars["String"]>
  taxContext?: Maybe<PricingTaxContext>
  taxRequestType?: Maybe<Scalars["String"]>
}

export type PricingTaxableOrder_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type Product = {
  __typename?: "Product"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<Product>
  availableShippingDiscounts?: Maybe<Array<Maybe<PrDiscount>>>
  bundledProducts?: Maybe<Array<Maybe<PrBundledProduct>>>
  catalogEndDate?: Maybe<Scalars["DateTime"]>
  catalogStartDate?: Maybe<Scalars["DateTime"]>
  categories?: Maybe<Array<Maybe<PrCategory>>>
  collectionMembersProductContent?: Maybe<Array<Maybe<ProductContent>>>
  content?: Maybe<ProductContent>
  createDate: Scalars["DateTime"]
  dateFirstAvailableInCatalog?: Maybe<Scalars["DateTime"]>
  daysAvailableInCatalog?: Maybe<Scalars["Int"]>
  fulfillmentTypesSupported?: Maybe<Array<Scalars["String"]>>
  goodsType?: Maybe<Scalars["String"]>
  inventoryInfo?: Maybe<ProductInventoryInfo>
  isActive?: Maybe<Scalars["Boolean"]>
  isPackagedStandAlone?: Maybe<Scalars["Boolean"]>
  isRecurring?: Maybe<Scalars["Boolean"]>
  isTaxable?: Maybe<Scalars["Boolean"]>
  locationsInStock?: Maybe<Array<Scalars["String"]>>
  measurements?: Maybe<PrPackageMeasurements>
  mfgPartNumber?: Maybe<Scalars["String"]>
  mfgPartNumbers?: Maybe<Array<Scalars["String"]>>
  options?: Maybe<Array<Maybe<ProductOption>>>
  personalizationScore: Scalars["Float"]
  price?: Maybe<ProductPrice>
  priceRange?: Maybe<ProductPriceRange>
  pricingBehavior?: Maybe<ProductPricingBehaviorInfo>
  productCode?: Maybe<Scalars["String"]>
  productCollectionMembers?: Maybe<Array<Maybe<ProductCollectionMember>>>
  productCollections?: Maybe<Array<Maybe<ProductCollectionInfo>>>
  productImageGroups?: Maybe<Array<Maybe<ProductImageGroup>>>
  productSequence?: Maybe<Scalars["Int"]>
  productType?: Maybe<Scalars["String"]>
  productTypeId?: Maybe<Scalars["Int"]>
  productUsage?: Maybe<Scalars["String"]>
  properties?: Maybe<Array<Maybe<ProductProperty>>>
  publishState?: Maybe<Scalars["String"]>
  purchasableState?: Maybe<ProductPurchasableState>
  purchaseLocation?: Maybe<Scalars["String"]>
  score: Scalars["Float"]
  sliceValue?: Maybe<Scalars["String"]>
  slicingAttributeFQN?: Maybe<Scalars["String"]>
  upCs?: Maybe<Array<Scalars["String"]>>
  upc?: Maybe<Scalars["String"]>
  updateDate: Scalars["DateTime"]
  validPriceLists?: Maybe<Array<Scalars["String"]>>
  variationProductCode?: Maybe<Scalars["String"]>
  variations?: Maybe<Array<Maybe<VariationSummary>>>
  volumePriceBands?: Maybe<Array<Maybe<ProductVolumePrice>>>
  volumePriceRange?: Maybe<ProductPriceRange>
}

export type Product_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type ProductPropertiesArgs = {
  filterAttribute?: Maybe<Scalars["String"]>
  filterOperator?: Maybe<Scalars["String"]>
  filterValue?: Maybe<Scalars["Object"]>
}

export type ProductCollection = {
  __typename?: "ProductCollection"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<ProductCollection>
  items?: Maybe<Array<Maybe<Product>>>
  nextCursorMark?: Maybe<Scalars["String"]>
  pageCount: Scalars["Int"]
  pageSize: Scalars["Int"]
  startIndex: Scalars["Int"]
  totalCount: Scalars["Int"]
}

export type ProductCollection_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type ProductCollectionInfo = {
  __typename?: "ProductCollectionInfo"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<ProductCollectionInfo>
  isPrimary?: Maybe<Scalars["Boolean"]>
  productCode?: Maybe<Scalars["String"]>
}

export type ProductCollectionInfo_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type ProductCollectionMember = {
  __typename?: "ProductCollectionMember"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<ProductCollectionMember>
  memberKey?: Maybe<ProductCollectionMemberKey>
}

export type ProductCollectionMember_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type ProductCollectionMemberKey = {
  __typename?: "ProductCollectionMemberKey"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<ProductCollectionMemberKey>
  value?: Maybe<Scalars["String"]>
}

export type ProductCollectionMemberKey_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type ProductContent = {
  __typename?: "ProductContent"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<ProductContent>
  metaTagDescription?: Maybe<Scalars["String"]>
  metaTagKeywords?: Maybe<Scalars["String"]>
  metaTagTitle?: Maybe<Scalars["String"]>
  productFullDescription?: Maybe<Scalars["String"]>
  productImages?: Maybe<Array<Maybe<ProductImage>>>
  productName?: Maybe<Scalars["String"]>
  productShortDescription?: Maybe<Scalars["String"]>
  seoFriendlyUrl?: Maybe<Scalars["String"]>
}

export type ProductContent_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type ProductCost = {
  __typename?: "ProductCost"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<ProductCost>
  cost: Scalars["Float"]
  productCode?: Maybe<Scalars["String"]>
}

export type ProductCost_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type ProductCostCollection = {
  __typename?: "ProductCostCollection"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<ProductCostCollection>
  items?: Maybe<Array<Maybe<ProductCost>>>
  totalCount: Scalars["Int"]
}

export type ProductCostCollection_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type ProductCostQueryInput = {
  productCodes?: Maybe<Array<Scalars["String"]>>
}

export type ProductForIndexing = {
  __typename?: "ProductForIndexing"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<ProductForIndexing>
  availableShippingDiscounts?: Maybe<Array<Maybe<PrDiscount>>>
  bundledProducts?: Maybe<Array<Maybe<PrBundledProduct>>>
  catalogEndDate?: Maybe<Scalars["DateTime"]>
  catalogStartDate?: Maybe<Scalars["DateTime"]>
  categories?: Maybe<Array<Maybe<PrCategory>>>
  collectionMembersProductContent?: Maybe<Array<Maybe<ProductContent>>>
  content?: Maybe<ProductContent>
  createDate: Scalars["DateTime"]
  dateFirstAvailableInCatalog?: Maybe<Scalars["DateTime"]>
  daysAvailableInCatalog?: Maybe<Scalars["Int"]>
  fulfillmentTypesSupported?: Maybe<Array<Scalars["String"]>>
  goodsType?: Maybe<Scalars["String"]>
  inventoryInfo?: Maybe<ProductInventoryInfo>
  isActive?: Maybe<Scalars["Boolean"]>
  isPackagedStandAlone?: Maybe<Scalars["Boolean"]>
  isRecurring?: Maybe<Scalars["Boolean"]>
  isTaxable?: Maybe<Scalars["Boolean"]>
  locationsInStock?: Maybe<Array<Scalars["String"]>>
  measurements?: Maybe<PrPackageMeasurements>
  mfgPartNumber?: Maybe<Scalars["String"]>
  mfgPartNumbers?: Maybe<Array<Scalars["String"]>>
  options?: Maybe<Array<Maybe<ProductOption>>>
  personalizationScore: Scalars["Float"]
  price?: Maybe<ProductPrice>
  priceRange?: Maybe<ProductPriceRange>
  pricingBehavior?: Maybe<ProductPricingBehaviorInfo>
  productCode?: Maybe<Scalars["String"]>
  productCollectionMembers?: Maybe<Array<Maybe<ProductCollectionMember>>>
  productCollections?: Maybe<Array<Maybe<ProductCollectionInfo>>>
  productImageGroups?: Maybe<Array<Maybe<ProductImageGroup>>>
  productSequence?: Maybe<Scalars["Int"]>
  productType?: Maybe<Scalars["String"]>
  productTypeId?: Maybe<Scalars["Int"]>
  productUsage?: Maybe<Scalars["String"]>
  properties?: Maybe<Array<Maybe<ProductProperty>>>
  publishState?: Maybe<Scalars["String"]>
  purchasableState?: Maybe<ProductPurchasableState>
  purchaseLocation?: Maybe<Scalars["String"]>
  score: Scalars["Float"]
  sliceValue?: Maybe<Scalars["String"]>
  slices?: Maybe<Array<Maybe<Product>>>
  slicingAttributeFQN?: Maybe<Scalars["String"]>
  upCs?: Maybe<Array<Scalars["String"]>>
  upc?: Maybe<Scalars["String"]>
  updateDate: Scalars["DateTime"]
  validPriceLists?: Maybe<Array<Scalars["String"]>>
  variationProductCode?: Maybe<Scalars["String"]>
  variations?: Maybe<Array<Maybe<VariationSummary>>>
  volumePriceBands?: Maybe<Array<Maybe<ProductVolumePrice>>>
  volumePriceRange?: Maybe<ProductPriceRange>
}

export type ProductForIndexing_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type ProductImage = {
  __typename?: "ProductImage"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<ProductImage>
  altText?: Maybe<Scalars["String"]>
  cmsId?: Maybe<Scalars["String"]>
  imageLabel?: Maybe<Scalars["String"]>
  imageUrl?: Maybe<Scalars["String"]>
  mediaType?: Maybe<Scalars["String"]>
  productImageGroupId?: Maybe<Scalars["String"]>
  sequence?: Maybe<Scalars["Int"]>
  videoUrl?: Maybe<Scalars["String"]>
}

export type ProductImage_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type ProductImageGroup = {
  __typename?: "ProductImageGroup"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<ProductImageGroup>
  productImageGroupId: Scalars["String"]
  productImageGroupTags?: Maybe<Array<Maybe<ProductImageGroupTag>>>
}

export type ProductImageGroup_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type ProductImageGroupTag = {
  __typename?: "ProductImageGroupTag"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<ProductImageGroupTag>
  attributeFqn?: Maybe<Scalars["String"]>
  value?: Maybe<Scalars["String"]>
}

export type ProductImageGroupTag_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type ProductInventoryInfo = {
  __typename?: "ProductInventoryInfo"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<ProductInventoryInfo>
  availableDate?: Maybe<Scalars["DateTime"]>
  manageStock?: Maybe<Scalars["Boolean"]>
  onlineLocationCode?: Maybe<Scalars["String"]>
  onlineSoftStockAvailable?: Maybe<Scalars["Int"]>
  onlineStockAvailable?: Maybe<Scalars["Int"]>
  outOfStockBehavior?: Maybe<Scalars["String"]>
}

export type ProductInventoryInfo_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type ProductOption = {
  __typename?: "ProductOption"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<ProductOption>
  attributeDetail?: Maybe<AttributeDetail>
  attributeFQN?: Maybe<Scalars["String"]>
  isMultiValue?: Maybe<Scalars["Boolean"]>
  isProductImageGroupSelector?: Maybe<Scalars["Boolean"]>
  isRequired?: Maybe<Scalars["Boolean"]>
  values?: Maybe<Array<Maybe<ProductOptionValue>>>
}

export type ProductOption_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type ProductOptionSelectionInput = {
  attributeFQN?: Maybe<Scalars["String"]>
  attributeValueId?: Maybe<Scalars["Int"]>
  shopperEnteredValue?: Maybe<Scalars["Object"]>
  value?: Maybe<Scalars["Object"]>
}

export type ProductOptionSelectionsInput = {
  options?: Maybe<Array<Maybe<ProductOptionSelectionInput>>>
  variationProductCode?: Maybe<Scalars["String"]>
}

export type ProductOptionValue = {
  __typename?: "ProductOptionValue"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<ProductOptionValue>
  attributeValueId: Scalars["Int"]
  bundledProduct?: Maybe<PrBundledProduct>
  deltaPrice?: Maybe<Scalars["Float"]>
  deltaWeight?: Maybe<Scalars["Float"]>
  displayInfo?: Maybe<AttributeVocabularyValueDisplayInfo>
  isDefault?: Maybe<Scalars["Boolean"]>
  isEnabled?: Maybe<Scalars["Boolean"]>
  isSelected?: Maybe<Scalars["Boolean"]>
  shopperEnteredValue?: Maybe<Scalars["Object"]>
  stringValue?: Maybe<Scalars["String"]>
  value?: Maybe<Scalars["Object"]>
}

export type ProductOptionValue_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type ProductPrice = {
  __typename?: "ProductPrice"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<ProductPrice>
  catalogListPrice?: Maybe<Scalars["Float"]>
  catalogSalePrice?: Maybe<Scalars["Float"]>
  creditValue?: Maybe<Scalars["Float"]>
  discount?: Maybe<PrAppliedDiscount>
  effectivePricelistCode?: Maybe<Scalars["String"]>
  msrp?: Maybe<Scalars["Float"]>
  price?: Maybe<Scalars["Float"]>
  priceListEntryCode?: Maybe<Scalars["String"]>
  priceListEntryMode?: Maybe<Scalars["String"]>
  priceType?: Maybe<Scalars["String"]>
  salePrice?: Maybe<Scalars["Float"]>
  salePriceType?: Maybe<Scalars["String"]>
}

export type ProductPrice_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type ProductPriceRange = {
  __typename?: "ProductPriceRange"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<ProductPriceRange>
  lower?: Maybe<ProductPrice>
  upper?: Maybe<ProductPrice>
}

export type ProductPriceRange_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type ProductPricingBehaviorInfo = {
  __typename?: "ProductPricingBehaviorInfo"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<ProductPricingBehaviorInfo>
  discountsRestricted?: Maybe<Scalars["Boolean"]>
  discountsRestrictedEndDate?: Maybe<Scalars["DateTime"]>
  discountsRestrictedStartDate?: Maybe<Scalars["DateTime"]>
}

export type ProductPricingBehaviorInfo_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type ProductProperty = {
  __typename?: "ProductProperty"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<ProductProperty>
  attributeDetail?: Maybe<AttributeDetail>
  attributeFQN?: Maybe<Scalars["String"]>
  isHidden?: Maybe<Scalars["Boolean"]>
  isMultiValue?: Maybe<Scalars["Boolean"]>
  propertyType?: Maybe<Scalars["String"]>
  values?: Maybe<Array<Maybe<ProductPropertyValue>>>
}

export type ProductProperty_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type ProductPropertyValue = {
  __typename?: "ProductPropertyValue"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<ProductPropertyValue>
  displayInfo?: Maybe<AttributeVocabularyValueDisplayInfo>
  stringValue?: Maybe<Scalars["String"]>
  value?: Maybe<Scalars["Object"]>
}

export type ProductPropertyValue_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type ProductPurchasableState = {
  __typename?: "ProductPurchasableState"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<ProductPurchasableState>
  isPurchasable?: Maybe<Scalars["Boolean"]>
  messages?: Maybe<Array<Maybe<ValidationMessage>>>
}

export type ProductPurchasableState_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type ProductSearchRandomAccessCursor = {
  __typename?: "ProductSearchRandomAccessCursor"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<ProductSearchRandomAccessCursor>
  cursorMarks?: Maybe<Array<Scalars["String"]>>
}

export type ProductSearchRandomAccessCursor_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type ProductSearchResult = {
  __typename?: "ProductSearchResult"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<ProductSearchResult>
  facets?: Maybe<Array<Maybe<Facet>>>
  items?: Maybe<Array<Maybe<Product>>>
  nextCursorMark?: Maybe<Scalars["String"]>
  pageCount: Scalars["Int"]
  pageSize: Scalars["Int"]
  searchEngine?: Maybe<Scalars["String"]>
  searchRedirect?: Maybe<Scalars["String"]>
  solrDebugInfo?: Maybe<SolrDebugInfo>
  startIndex: Scalars["Int"]
  totalCount: Scalars["Int"]
}

export type ProductSearchResult_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type ProductStock = {
  __typename?: "ProductStock"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<ProductStock>
  aggregateInventory?: Maybe<Scalars["Int"]>
  availableDate?: Maybe<Scalars["DateTime"]>
  isOnBackOrder?: Maybe<Scalars["Boolean"]>
  manageStock?: Maybe<Scalars["Boolean"]>
  stockAvailable?: Maybe<Scalars["Int"]>
}

export type ProductStock_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type ProductStockInput = {
  aggregateInventory?: Maybe<Scalars["Int"]>
  availableDate?: Maybe<Scalars["DateTime"]>
  isOnBackOrder?: Maybe<Scalars["Boolean"]>
  manageStock?: Maybe<Scalars["Boolean"]>
  stockAvailable?: Maybe<Scalars["Int"]>
}

export type ProductValidationSummary = {
  __typename?: "ProductValidationSummary"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<ProductValidationSummary>
  bundledProducts?: Maybe<Array<Maybe<BundledProductSummary>>>
  categories?: Maybe<Array<Maybe<PrCategory>>>
  fulfillmentTypesSupported?: Maybe<Array<Scalars["String"]>>
  goodsType?: Maybe<Scalars["String"]>
  image?: Maybe<ProductImage>
  inventoryInfo?: Maybe<ProductInventoryInfo>
  isPackagedStandAlone?: Maybe<Scalars["Boolean"]>
  isTaxable?: Maybe<Scalars["Boolean"]>
  measurements?: Maybe<PrPackageMeasurements>
  mfgPartNumber?: Maybe<Scalars["String"]>
  price?: Maybe<ProductPrice>
  pricingBehavior?: Maybe<ProductPricingBehaviorInfo>
  productCode?: Maybe<Scalars["String"]>
  productName?: Maybe<Scalars["String"]>
  productShortDescription?: Maybe<Scalars["String"]>
  productType?: Maybe<Scalars["String"]>
  productUsage?: Maybe<Scalars["String"]>
  properties?: Maybe<Array<Maybe<ProductProperty>>>
  purchasableState?: Maybe<ProductPurchasableState>
  purchaseLocation?: Maybe<Scalars["String"]>
  upc?: Maybe<Scalars["String"]>
  variationProductCode?: Maybe<Scalars["String"]>
}

export type ProductValidationSummary_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type ProductVolumePrice = {
  __typename?: "ProductVolumePrice"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<ProductVolumePrice>
  isCurrent?: Maybe<Scalars["Boolean"]>
  maxQty?: Maybe<Scalars["Int"]>
  minQty: Scalars["Int"]
  price?: Maybe<ProductPrice>
  priceRange?: Maybe<ProductPriceRange>
}

export type ProductVolumePrice_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type Property = {
  __typename?: "Property"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<Property>
  isMultiValued?: Maybe<Scalars["Boolean"]>
  isRequired?: Maybe<Scalars["Boolean"]>
  name?: Maybe<Scalars["String"]>
  propertyType?: Maybe<PropertyType>
}

export type Property_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type PropertyInput = {
  isMultiValued?: Maybe<Scalars["Boolean"]>
  isRequired?: Maybe<Scalars["Boolean"]>
  name?: Maybe<Scalars["String"]>
  propertyType?: Maybe<PropertyTypeInput>
}

export type PropertyType = {
  __typename?: "PropertyType"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<PropertyType>
  adminName?: Maybe<Scalars["String"]>
  dataType?: Maybe<Scalars["String"]>
  installationPackage?: Maybe<Scalars["String"]>
  isAggregatable?: Maybe<Scalars["Boolean"]>
  isQueryable?: Maybe<Scalars["Boolean"]>
  isSortable?: Maybe<Scalars["Boolean"]>
  name?: Maybe<Scalars["String"]>
  namespace?: Maybe<Scalars["String"]>
  propertyTypeFQN?: Maybe<Scalars["String"]>
  version?: Maybe<Scalars["String"]>
}

export type PropertyType_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type PropertyTypeCollection = {
  __typename?: "PropertyTypeCollection"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<PropertyTypeCollection>
  items?: Maybe<Array<Maybe<PropertyType>>>
  pageCount: Scalars["Int"]
  pageSize: Scalars["Int"]
  startIndex: Scalars["Int"]
  totalCount: Scalars["Int"]
}

export type PropertyTypeCollection_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type PropertyTypeInput = {
  adminName?: Maybe<Scalars["String"]>
  dataType?: Maybe<Scalars["String"]>
  installationPackage?: Maybe<Scalars["String"]>
  isAggregatable?: Maybe<Scalars["Boolean"]>
  isQueryable?: Maybe<Scalars["Boolean"]>
  isSortable?: Maybe<Scalars["Boolean"]>
  name?: Maybe<Scalars["String"]>
  namespace?: Maybe<Scalars["String"]>
  propertyTypeFQN?: Maybe<Scalars["String"]>
  version?: Maybe<Scalars["String"]>
}

export type PurchaseOrderCustomField = {
  __typename?: "PurchaseOrderCustomField"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<PurchaseOrderCustomField>
  code?: Maybe<Scalars["String"]>
  label?: Maybe<Scalars["String"]>
  value?: Maybe<Scalars["String"]>
}

export type PurchaseOrderCustomField_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type PurchaseOrderCustomFieldInput = {
  code?: Maybe<Scalars["String"]>
  label?: Maybe<Scalars["String"]>
  value?: Maybe<Scalars["String"]>
}

export type PurchaseOrderPayment = {
  __typename?: "PurchaseOrderPayment"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<PurchaseOrderPayment>
  customFields?: Maybe<Array<Maybe<PurchaseOrderCustomField>>>
  paymentTerm?: Maybe<PurchaseOrderPaymentTerm>
  purchaseOrderNumber?: Maybe<Scalars["String"]>
}

export type PurchaseOrderPayment_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type PurchaseOrderPaymentInput = {
  customFields?: Maybe<Array<Maybe<PurchaseOrderCustomFieldInput>>>
  paymentTerm?: Maybe<PurchaseOrderPaymentTermInput>
  purchaseOrderNumber?: Maybe<Scalars["String"]>
}

export type PurchaseOrderPaymentTerm = {
  __typename?: "PurchaseOrderPaymentTerm"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<PurchaseOrderPaymentTerm>
  code?: Maybe<Scalars["String"]>
  description?: Maybe<Scalars["String"]>
}

export type PurchaseOrderPaymentTerm_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type PurchaseOrderPaymentTermInput = {
  code?: Maybe<Scalars["String"]>
  description?: Maybe<Scalars["String"]>
}

export type PurchaseOrderTransaction = {
  __typename?: "PurchaseOrderTransaction"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<PurchaseOrderTransaction>
  additionalTransactionDetail?: Maybe<Scalars["String"]>
  auditInfo?: Maybe<CuAuditInfo>
  author?: Maybe<Scalars["String"]>
  availableBalance: Scalars["Float"]
  creditLimit: Scalars["Float"]
  customerPurchaseOrderAccountId: Scalars["Int"]
  externalId?: Maybe<Scalars["String"]>
  orderId?: Maybe<Scalars["String"]>
  purchaseOrderNumber?: Maybe<Scalars["String"]>
  siteId: Scalars["Int"]
  tenantId: Scalars["Int"]
  transactionAmount: Scalars["Float"]
  transactionDate: Scalars["DateTime"]
  transactionDescription?: Maybe<Scalars["String"]>
  transactionTypeId: Scalars["Int"]
}

export type PurchaseOrderTransaction_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type PurchaseOrderTransactionCollection = {
  __typename?: "PurchaseOrderTransactionCollection"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<PurchaseOrderTransactionCollection>
  items?: Maybe<Array<Maybe<PurchaseOrderTransaction>>>
  pageCount: Scalars["Int"]
  pageSize: Scalars["Int"]
  startIndex: Scalars["Int"]
  totalCount: Scalars["Int"]
}

export type PurchaseOrderTransactionCollection_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type PurchaseOrderTransactionInput = {
  additionalTransactionDetail?: Maybe<Scalars["String"]>
  auditInfo?: Maybe<CuAuditInfoInput>
  author?: Maybe<Scalars["String"]>
  availableBalance: Scalars["Float"]
  creditLimit: Scalars["Float"]
  customerPurchaseOrderAccountId: Scalars["Int"]
  externalId?: Maybe<Scalars["String"]>
  orderId?: Maybe<Scalars["String"]>
  purchaseOrderNumber?: Maybe<Scalars["String"]>
  siteId: Scalars["Int"]
  tenantId: Scalars["Int"]
  transactionAmount: Scalars["Float"]
  transactionDate: Scalars["DateTime"]
  transactionDescription?: Maybe<Scalars["String"]>
  transactionTypeId: Scalars["Int"]
}

export type Query = {
  __typename?: "Query"
  adminLocation?: Maybe<Location>
  adminLocationAttribute?: Maybe<LoAttribute>
  adminLocationAttributeVocabularyValues?: Maybe<
    Array<Maybe<LoAttributeVocabularyValue>>
  >
  adminLocationAttributes?: Maybe<LoAttributeCollection>
  adminLocationGroups?: Maybe<LocationGroupCollection>
  adminLocationType?: Maybe<LocationType>
  adminLocationTypes?: Maybe<Array<Maybe<LocationType>>>
  adminLocations?: Maybe<LocationCollection>
  authTicket?: Maybe<CustomerAuthTicket>
  b2bAccount?: Maybe<B2BAccount>
  b2bAccountAttributeVocabularyValues?: Maybe<CustomerAttribute>
  b2bAccountAttributes?: Maybe<CustomerAttributeCollection>
  b2bAccountUserRoles?: Maybe<UserRoleCollection>
  b2bAccountUsers?: Maybe<B2BUserCollection>
  b2bAccounts?: Maybe<B2BAccountCollection>
  carrierLocaleServiceTypes?: Maybe<Array<Maybe<ServiceType>>>
  cart?: Maybe<Cart>
  cartItem?: Maybe<CartItem>
  cartItems?: Maybe<CartItemCollection>
  cartSummary?: Maybe<CartSummary>
  cartsSummary?: Maybe<CartSummary>
  categories?: Maybe<CategoryPagedCollection>
  categoriesTree?: Maybe<CategoryCollection>
  category?: Maybe<PrCategory>
  channel?: Maybe<Channel>
  channelGroup?: Maybe<ChannelGroup>
  channelGroups?: Maybe<ChannelGroupCollection>
  channels?: Maybe<ChannelCollection>
  checkout?: Maybe<Checkout>
  checkoutActions?: Maybe<Array<Maybe<Scalars["String"]>>>
  checkoutAttributes?: Maybe<Array<Maybe<OrderAttribute>>>
  checkoutDestination?: Maybe<Destination>
  checkoutDestinations?: Maybe<Array<Maybe<Destination>>>
  checkoutShippingMethods?: Maybe<Array<Maybe<CheckoutGroupRates>>>
  checkouts?: Maybe<CheckoutCollection>
  currentCart?: Maybe<Cart>
  currentCartExtendedProperties?: Maybe<Array<Maybe<ExtendedProperty>>>
  currentCartItem?: Maybe<CartItem>
  currentCartItems?: Maybe<CartItemCollection>
  currentCartMessages?: Maybe<CartChangeMessageCollection>
  customerAccount?: Maybe<CustomerAccount>
  customerAccountAttribute?: Maybe<CustomerAttribute>
  customerAccountAttributeDefinition?: Maybe<CuAttribute>
  customerAccountAttributeDefinitions?: Maybe<CuAttributeCollection>
  customerAccountAttributeVocabularyValues?: Maybe<
    Array<Maybe<CuAttributeVocabularyValue>>
  >
  customerAccountAttributes?: Maybe<CustomerAttributeCollection>
  customerAccountAuditLog?: Maybe<CustomerAuditEntryCollection>
  customerAccountCard?: Maybe<Card>
  customerAccountCards?: Maybe<CardCollection>
  customerAccountContact?: Maybe<CustomerContact>
  customerAccountContacts?: Maybe<CustomerContactCollection>
  customerAccountLoginState?: Maybe<LoginState>
  customerAccountNote?: Maybe<CustomerNote>
  customerAccountNotes?: Maybe<CustomerNoteCollection>
  customerAccountQuote?: Maybe<Quote>
  customerAccountQuoteItems?: Maybe<Array<Maybe<CrOrderItem>>>
  customerAccountSegments?: Maybe<CustomerSegmentCollection>
  customerAccountTransactions?: Maybe<Array<Maybe<Transaction>>>
  customerAccounts?: Maybe<CustomerAccountCollection>
  customerCredit?: Maybe<CuCredit>
  customerCreditAuditTrail?: Maybe<CreditAuditEntryCollection>
  customerCreditTransactions?: Maybe<CreditTransactionCollection>
  customerCredits?: Maybe<CreditCollection>
  customerPurchaseOrderAccount?: Maybe<CustomerPurchaseOrderAccount>
  customerPurchaseOrderAccountTransaction?: Maybe<PurchaseOrderTransactionCollection>
  customerSegment?: Maybe<CustomerSegment>
  customerSegments?: Maybe<CustomerSegmentCollection>
  customerSet?: Maybe<CustomerSet>
  customerSets?: Maybe<CustomerSetCollection>
  customerWishlist?: Maybe<Wishlist>
  customerWishlistItems?: Maybe<WishlistItemCollection>
  documentDrafts?: Maybe<DocumentDraftSummaryPagedCollection>
  documentList?: Maybe<DocumentList>
  documentListDocument?: Maybe<Document>
  documentListDocumentContent?: Maybe<Scalars["Boolean"]>
  documentListDocumentTransform?: Maybe<Scalars["Boolean"]>
  documentListDocuments?: Maybe<DocumentCollection>
  documentListTreeDocument?: Maybe<Document>
  documentListTreeDocumentContent?: Maybe<Scalars["Boolean"]>
  documentListTreeDocumentTransform?: Maybe<Scalars["Boolean"]>
  documentListType?: Maybe<DocumentListType>
  documentListTypes?: Maybe<DocumentListTypeCollection>
  documentListViewDocuments?: Maybe<DocumentCollection>
  documentLists?: Maybe<DocumentListCollection>
  documentType?: Maybe<DocumentType>
  documentTypes?: Maybe<DocumentTypeCollection>
  dslLocation?: Maybe<Location>
  entityList?: Maybe<EntityList>
  entityListEntities?: Maybe<EntityCollection>
  entityListEntity?: Maybe<Scalars["Boolean"]>
  entityListEntityContainer?: Maybe<EntityContainer>
  entityListEntityContainers?: Maybe<EntityContainerCollection>
  entityListView?: Maybe<ListView>
  entityListViewEntities?: Maybe<EntityCollection>
  entityListViewEntity?: Maybe<Scalars["Boolean"]>
  entityListViewEntityContainer?: Maybe<EntityContainer>
  entityListViewEntityContainers?: Maybe<EntityContainerCollection>
  entityListViews?: Maybe<ListViewCollection>
  entityLists?: Maybe<EntityListCollection>
  exchangeRates?: Maybe<Array<Maybe<CurrencyExchangeRate>>>
  getAnonymousShopperToken?: Maybe<CustomerAuthTicket>
  getCurrentAccount?: Maybe<CustomerAccount>
  inStockNotification?: Maybe<InStockNotificationSubscription>
  inStockNotifications?: Maybe<InStockNotificationSubscriptionCollection>
  localeServiceTypes?: Maybe<Array<Maybe<ServiceType>>>
  location?: Maybe<Location>
  locationGroup?: Maybe<LocationGroup>
  locationGroupConfig?: Maybe<LocationGroupConfiguration>
  locationUsage?: Maybe<LocationUsage>
  locationUsages?: Maybe<LocationUsageCollection>
  order?: Maybe<Order>
  orderActions?: Maybe<Array<Maybe<Scalars["String"]>>>
  orderAttributes?: Maybe<Array<Maybe<OrderAttribute>>>
  orderBillingInfo?: Maybe<BillingInfo>
  orderCancelReasons?: Maybe<CancelReasonCollection>
  orderDigitalPackage?: Maybe<DigitalPackage>
  orderDigitalPackageActions?: Maybe<Array<Maybe<Scalars["String"]>>>
  orderExtendedProperties?: Maybe<Array<Maybe<ExtendedProperty>>>
  orderFulfillmentInfo?: Maybe<FulfillmentInfo>
  orderItem?: Maybe<CrOrderItem>
  orderItems?: Maybe<OrderItemCollection>
  orderNote?: Maybe<OrderNote>
  orderNotes?: Maybe<Array<Maybe<OrderNote>>>
  orderPackage?: Maybe<CrPackageObj>
  orderPackageActions?: Maybe<Array<Maybe<Scalars["String"]>>>
  orderPackageLabel?: Maybe<Scalars["Boolean"]>
  orderPayment?: Maybe<Payment>
  orderPaymentActions?: Maybe<Array<Maybe<Scalars["String"]>>>
  orderPayments?: Maybe<PaymentCollection>
  orderPickup?: Maybe<Pickup>
  orderPickupActions?: Maybe<Array<Maybe<Scalars["String"]>>>
  orderReturnableItems?: Maybe<OrderReturnableItemCollection>
  orderRoutingRoutingSuggestionLog?: Maybe<Array<Maybe<JsonNode>>>
  orderShipment?: Maybe<Shipment>
  orderShipmentMethods?: Maybe<Array<Maybe<ShippingRate>>>
  orderTaxableOrders?: Maybe<Array<Maybe<PricingTaxableOrder>>>
  orderValidationResults?: Maybe<Array<Maybe<OrderValidationResult>>>
  orders?: Maybe<OrderCollection>
  priceList?: Maybe<PriceList>
  product?: Maybe<Product>
  productLocationInventory?: Maybe<LocationInventoryCollection>
  productSearch?: Maybe<ProductSearchResult>
  productSearchRandomAccessCursor?: Maybe<ProductSearchRandomAccessCursor>
  productVersion?: Maybe<ProductForIndexing>
  products?: Maybe<ProductCollection>
  propertyType?: Maybe<PropertyType>
  propertyTypes?: Maybe<PropertyTypeCollection>
  quote?: Maybe<Quote>
  quoteItem?: Maybe<CrOrderItem>
  quoteItems?: Maybe<Array<Maybe<CrOrderItem>>>
  quotes?: Maybe<QuoteCollection>
  resolvedPriceList?: Maybe<ResolvedPriceList>
  returnActions?: Maybe<Array<Maybe<Scalars["String"]>>>
  returnItem?: Maybe<ReturnItem>
  returnItems?: Maybe<ReturnItemCollection>
  returnNote?: Maybe<OrderNote>
  returnNotes?: Maybe<Array<Maybe<OrderNote>>>
  returnPackage?: Maybe<CrPackageObj>
  returnPackageLabel?: Maybe<Scalars["Boolean"]>
  returnPayment?: Maybe<Payment>
  returnPayments?: Maybe<PaymentCollection>
  returnReason?: Maybe<ReturnObj>
  returnReasons?: Maybe<ReasonCollection>
  returnShipment?: Maybe<Shipment>
  returnShippingLabel?: Maybe<CarrierServiceGenerateLabelResponse>
  returns?: Maybe<ReturnCollection>
  spLocation?: Maybe<Location>
  spLocations?: Maybe<LocationCollection>
  suggestionSearch?: Maybe<SearchSuggestionResult>
  targetRule?: Maybe<TargetRule>
  targetRules?: Maybe<TargetRuleCollection>
  usageTypeLocations?: Maybe<LocationCollection>
  userCart?: Maybe<Cart>
  userCartSummary?: Maybe<CartSummary>
  wishlist?: Maybe<Wishlist>
  wishlistItem?: Maybe<WishlistItem>
  wishlistItems?: Maybe<WishlistItemCollection>
  wishlists?: Maybe<WishlistCollection>
}

export type QueryAdminLocationArgs = {
  locationCode: Scalars["String"]
}

export type QueryAdminLocationAttributeArgs = {
  attributeFQN: Scalars["String"]
}

export type QueryAdminLocationAttributeVocabularyValuesArgs = {
  attributeFQN: Scalars["String"]
}

export type QueryAdminLocationAttributesArgs = {
  filter?: Maybe<Scalars["String"]>
  pageSize?: Maybe<Scalars["Int"]>
  sortBy?: Maybe<Scalars["String"]>
  startIndex?: Maybe<Scalars["Int"]>
}

export type QueryAdminLocationGroupsArgs = {
  filter?: Maybe<Scalars["String"]>
  pageSize?: Maybe<Scalars["Int"]>
  sortBy?: Maybe<Scalars["String"]>
  startIndex?: Maybe<Scalars["Int"]>
}

export type QueryAdminLocationTypeArgs = {
  locationTypeCode: Scalars["String"]
}

export type QueryAdminLocationsArgs = {
  filter?: Maybe<Scalars["String"]>
  pageSize?: Maybe<Scalars["Int"]>
  sortBy?: Maybe<Scalars["String"]>
  startIndex?: Maybe<Scalars["Int"]>
}

export type QueryAuthTicketArgs = {
  accountId?: Maybe<Scalars["Int"]>
}

export type QueryB2bAccountArgs = {
  accountId: Scalars["Int"]
}

export type QueryB2bAccountAttributeVocabularyValuesArgs = {
  accountId: Scalars["Int"]
  attributeFQN: Scalars["String"]
}

export type QueryB2bAccountAttributesArgs = {
  accountId: Scalars["Int"]
  filter?: Maybe<Scalars["String"]>
  pageSize?: Maybe<Scalars["Int"]>
  sortBy?: Maybe<Scalars["String"]>
  startIndex?: Maybe<Scalars["Int"]>
}

export type QueryB2bAccountUserRolesArgs = {
  accountId: Scalars["Int"]
  userId: Scalars["String"]
}

export type QueryB2bAccountUsersArgs = {
  accountId: Scalars["Int"]
  filter?: Maybe<Scalars["String"]>
  pageSize?: Maybe<Scalars["Int"]>
  q?: Maybe<Scalars["String"]>
  qLimit?: Maybe<Scalars["Int"]>
  sortBy?: Maybe<Scalars["String"]>
  startIndex?: Maybe<Scalars["Int"]>
}

export type QueryB2bAccountsArgs = {
  fields?: Maybe<Scalars["String"]>
  filter?: Maybe<Scalars["String"]>
  pageSize?: Maybe<Scalars["Int"]>
  q?: Maybe<Scalars["String"]>
  qLimit?: Maybe<Scalars["Int"]>
  sortBy?: Maybe<Scalars["String"]>
  startIndex?: Maybe<Scalars["Int"]>
}

export type QueryCarrierLocaleServiceTypesArgs = {
  carrierId: Scalars["String"]
  localeCode: Scalars["String"]
}

export type QueryCartArgs = {
  cartId: Scalars["String"]
}

export type QueryCartItemArgs = {
  cartId: Scalars["String"]
  cartItemId: Scalars["String"]
}

export type QueryCartItemsArgs = {
  cartId: Scalars["String"]
}

export type QueryCartSummaryArgs = {
  cartId: Scalars["String"]
}

export type QueryCategoriesArgs = {
  filter?: Maybe<Scalars["String"]>
  pageSize?: Maybe<Scalars["Int"]>
  sortBy?: Maybe<Scalars["String"]>
  startIndex?: Maybe<Scalars["Int"]>
}

export type QueryCategoryArgs = {
  allowInactive?: Maybe<Scalars["Boolean"]>
  categoryId: Scalars["Int"]
}

export type QueryChannelArgs = {
  code: Scalars["String"]
}

export type QueryChannelGroupArgs = {
  code: Scalars["String"]
}

export type QueryChannelGroupsArgs = {
  filter?: Maybe<Scalars["String"]>
  pageSize?: Maybe<Scalars["Int"]>
  sortBy?: Maybe<Scalars["String"]>
  startIndex?: Maybe<Scalars["Int"]>
}

export type QueryChannelsArgs = {
  filter?: Maybe<Scalars["String"]>
  pageSize?: Maybe<Scalars["Int"]>
  sortBy?: Maybe<Scalars["String"]>
  startIndex?: Maybe<Scalars["Int"]>
}

export type QueryCheckoutArgs = {
  checkoutId: Scalars["String"]
}

export type QueryCheckoutActionsArgs = {
  checkoutId: Scalars["String"]
}

export type QueryCheckoutAttributesArgs = {
  checkoutId: Scalars["String"]
}

export type QueryCheckoutDestinationArgs = {
  checkoutId: Scalars["String"]
  destinationId: Scalars["String"]
}

export type QueryCheckoutDestinationsArgs = {
  checkoutId: Scalars["String"]
}

export type QueryCheckoutShippingMethodsArgs = {
  checkoutId: Scalars["String"]
}

export type QueryCheckoutsArgs = {
  filter?: Maybe<Scalars["String"]>
  pageSize?: Maybe<Scalars["Int"]>
  q?: Maybe<Scalars["String"]>
  qLimit?: Maybe<Scalars["Int"]>
  sortBy?: Maybe<Scalars["String"]>
  startIndex?: Maybe<Scalars["Int"]>
}

export type QueryCurrentCartItemArgs = {
  cartItemId: Scalars["String"]
}

export type QueryCustomerAccountArgs = {
  accountId: Scalars["Int"]
  userId?: Maybe<Scalars["String"]>
}

export type QueryCustomerAccountAttributeArgs = {
  accountId: Scalars["Int"]
  attributeFQN: Scalars["String"]
  userId?: Maybe<Scalars["String"]>
}

export type QueryCustomerAccountAttributeDefinitionArgs = {
  attributeFQN: Scalars["String"]
}

export type QueryCustomerAccountAttributeDefinitionsArgs = {
  filter?: Maybe<Scalars["String"]>
  pageSize?: Maybe<Scalars["Int"]>
  sortBy?: Maybe<Scalars["String"]>
  startIndex?: Maybe<Scalars["Int"]>
}

export type QueryCustomerAccountAttributeVocabularyValuesArgs = {
  attributeFQN: Scalars["String"]
}

export type QueryCustomerAccountAttributesArgs = {
  accountId: Scalars["Int"]
  filter?: Maybe<Scalars["String"]>
  pageSize?: Maybe<Scalars["Int"]>
  sortBy?: Maybe<Scalars["String"]>
  startIndex?: Maybe<Scalars["Int"]>
  userId?: Maybe<Scalars["String"]>
}

export type QueryCustomerAccountAuditLogArgs = {
  accountId: Scalars["Int"]
  filter?: Maybe<Scalars["String"]>
  pageSize?: Maybe<Scalars["Int"]>
  sortBy?: Maybe<Scalars["String"]>
  startIndex?: Maybe<Scalars["Int"]>
}

export type QueryCustomerAccountCardArgs = {
  accountId: Scalars["Int"]
  cardId: Scalars["String"]
}

export type QueryCustomerAccountCardsArgs = {
  accountId: Scalars["Int"]
}

export type QueryCustomerAccountContactArgs = {
  accountId: Scalars["Int"]
  contactId: Scalars["Int"]
  userId?: Maybe<Scalars["String"]>
}

export type QueryCustomerAccountContactsArgs = {
  accountId: Scalars["Int"]
  filter?: Maybe<Scalars["String"]>
  pageSize?: Maybe<Scalars["Int"]>
  sortBy?: Maybe<Scalars["String"]>
  startIndex?: Maybe<Scalars["Int"]>
  userId?: Maybe<Scalars["String"]>
}

export type QueryCustomerAccountLoginStateArgs = {
  accountId: Scalars["Int"]
  userId?: Maybe<Scalars["String"]>
}

export type QueryCustomerAccountNoteArgs = {
  accountId: Scalars["Int"]
  noteId: Scalars["Int"]
}

export type QueryCustomerAccountNotesArgs = {
  accountId: Scalars["Int"]
  filter?: Maybe<Scalars["String"]>
  pageSize?: Maybe<Scalars["Int"]>
  sortBy?: Maybe<Scalars["String"]>
  startIndex?: Maybe<Scalars["Int"]>
}

export type QueryCustomerAccountQuoteArgs = {
  customerAccountId: Scalars["Int"]
  draft?: Maybe<Scalars["Boolean"]>
  quoteName: Scalars["String"]
}

export type QueryCustomerAccountQuoteItemsArgs = {
  customerAccountId: Scalars["Int"]
  filter?: Maybe<Scalars["String"]>
  pageSize?: Maybe<Scalars["Int"]>
  quoteName: Scalars["String"]
  sortBy?: Maybe<Scalars["String"]>
  startIndex?: Maybe<Scalars["Int"]>
}

export type QueryCustomerAccountSegmentsArgs = {
  accountId: Scalars["Int"]
  filter?: Maybe<Scalars["String"]>
  pageSize?: Maybe<Scalars["Int"]>
  sortBy?: Maybe<Scalars["String"]>
  startIndex?: Maybe<Scalars["Int"]>
}

export type QueryCustomerAccountTransactionsArgs = {
  accountId: Scalars["Int"]
}

export type QueryCustomerAccountsArgs = {
  fields?: Maybe<Scalars["String"]>
  filter?: Maybe<Scalars["String"]>
  isAnonymous?: Maybe<Scalars["Boolean"]>
  pageSize?: Maybe<Scalars["Int"]>
  q?: Maybe<Scalars["String"]>
  qLimit?: Maybe<Scalars["Int"]>
  sortBy?: Maybe<Scalars["String"]>
  startIndex?: Maybe<Scalars["Int"]>
}

export type QueryCustomerCreditArgs = {
  code: Scalars["String"]
}

export type QueryCustomerCreditAuditTrailArgs = {
  code: Scalars["String"]
  filter?: Maybe<Scalars["String"]>
  pageSize?: Maybe<Scalars["Int"]>
  sortBy?: Maybe<Scalars["String"]>
  startIndex?: Maybe<Scalars["Int"]>
}

export type QueryCustomerCreditTransactionsArgs = {
  code: Scalars["String"]
  filter?: Maybe<Scalars["String"]>
  pageSize?: Maybe<Scalars["Int"]>
  sortBy?: Maybe<Scalars["String"]>
  startIndex?: Maybe<Scalars["Int"]>
}

export type QueryCustomerCreditsArgs = {
  filter?: Maybe<Scalars["String"]>
  pageSize?: Maybe<Scalars["Int"]>
  sortBy?: Maybe<Scalars["String"]>
  startIndex?: Maybe<Scalars["Int"]>
}

export type QueryCustomerPurchaseOrderAccountArgs = {
  accountId: Scalars["Int"]
}

export type QueryCustomerPurchaseOrderAccountTransactionArgs = {
  accountId: Scalars["Int"]
  filter?: Maybe<Scalars["String"]>
  pageSize?: Maybe<Scalars["Int"]>
  sortBy?: Maybe<Scalars["String"]>
  startIndex?: Maybe<Scalars["Int"]>
}

export type QueryCustomerSegmentArgs = {
  id: Scalars["Int"]
}

export type QueryCustomerSegmentsArgs = {
  filter?: Maybe<Scalars["String"]>
  pageSize?: Maybe<Scalars["Int"]>
  sortBy?: Maybe<Scalars["String"]>
  startIndex?: Maybe<Scalars["Int"]>
}

export type QueryCustomerSetArgs = {
  code: Scalars["String"]
}

export type QueryCustomerSetsArgs = {
  pageSize?: Maybe<Scalars["Int"]>
  sortBy?: Maybe<Scalars["String"]>
  startIndex?: Maybe<Scalars["Int"]>
}

export type QueryCustomerWishlistArgs = {
  customerAccountId: Scalars["Int"]
  wishlistName: Scalars["String"]
}

export type QueryCustomerWishlistItemsArgs = {
  customerAccountId: Scalars["Int"]
  filter?: Maybe<Scalars["String"]>
  pageSize?: Maybe<Scalars["Int"]>
  sortBy?: Maybe<Scalars["String"]>
  startIndex?: Maybe<Scalars["Int"]>
  wishlistName: Scalars["String"]
}

export type QueryDocumentDraftsArgs = {
  documentLists?: Maybe<Scalars["String"]>
  pageSize?: Maybe<Scalars["Int"]>
  startIndex?: Maybe<Scalars["Int"]>
}

export type QueryDocumentListArgs = {
  documentListName: Scalars["String"]
}

export type QueryDocumentListDocumentArgs = {
  documentId: Scalars["String"]
  documentListName: Scalars["String"]
  includeInactive?: Maybe<Scalars["Boolean"]>
}

export type QueryDocumentListDocumentContentArgs = {
  documentId: Scalars["String"]
  documentListName: Scalars["String"]
}

export type QueryDocumentListDocumentTransformArgs = {
  crop?: Maybe<Scalars["String"]>
  documentId: Scalars["String"]
  documentListName: Scalars["String"]
  height?: Maybe<Scalars["Int"]>
  max?: Maybe<Scalars["Int"]>
  maxHeight?: Maybe<Scalars["Int"]>
  maxWidth?: Maybe<Scalars["Int"]>
  quality?: Maybe<Scalars["Int"]>
  width?: Maybe<Scalars["Int"]>
}

export type QueryDocumentListDocumentsArgs = {
  documentListName: Scalars["String"]
  filter?: Maybe<Scalars["String"]>
  includeInactive?: Maybe<Scalars["Boolean"]>
  includeSubPaths?: Maybe<Scalars["Boolean"]>
  pageSize?: Maybe<Scalars["Int"]>
  path?: Maybe<Scalars["String"]>
  queryScope?: Maybe<Scalars["String"]>
  sortBy?: Maybe<Scalars["String"]>
  startIndex?: Maybe<Scalars["Int"]>
}

export type QueryDocumentListTreeDocumentArgs = {
  documentListName: Scalars["String"]
  documentName: Scalars["String"]
  includeInactive?: Maybe<Scalars["Boolean"]>
}

export type QueryDocumentListTreeDocumentContentArgs = {
  documentListName: Scalars["String"]
  documentName: Scalars["String"]
}

export type QueryDocumentListTreeDocumentTransformArgs = {
  crop?: Maybe<Scalars["String"]>
  documentListName: Scalars["String"]
  documentName: Scalars["String"]
  height?: Maybe<Scalars["Int"]>
  max?: Maybe<Scalars["Int"]>
  maxHeight?: Maybe<Scalars["Int"]>
  maxWidth?: Maybe<Scalars["Int"]>
  quality?: Maybe<Scalars["Int"]>
  width?: Maybe<Scalars["Int"]>
}

export type QueryDocumentListTypeArgs = {
  documentListTypeFQN: Scalars["String"]
}

export type QueryDocumentListTypesArgs = {
  pageSize?: Maybe<Scalars["Int"]>
  startIndex?: Maybe<Scalars["Int"]>
}

export type QueryDocumentListViewDocumentsArgs = {
  documentListName: Scalars["String"]
  filter?: Maybe<Scalars["String"]>
  includeInactive?: Maybe<Scalars["Boolean"]>
  pageSize?: Maybe<Scalars["Int"]>
  sortBy?: Maybe<Scalars["String"]>
  startIndex?: Maybe<Scalars["Int"]>
  viewName: Scalars["String"]
}

export type QueryDocumentListsArgs = {
  pageSize?: Maybe<Scalars["Int"]>
  startIndex?: Maybe<Scalars["Int"]>
}

export type QueryDocumentTypeArgs = {
  documentTypeName: Scalars["String"]
}

export type QueryDocumentTypesArgs = {
  pageSize?: Maybe<Scalars["Int"]>
  startIndex?: Maybe<Scalars["Int"]>
}

export type QueryDslLocationArgs = {
  includeAttributeDefinition?: Maybe<Scalars["Boolean"]>
}

export type QueryEntityListArgs = {
  entityListFullName: Scalars["String"]
}

export type QueryEntityListEntitiesArgs = {
  entityListFullName: Scalars["String"]
  filter?: Maybe<Scalars["String"]>
  pageSize?: Maybe<Scalars["Int"]>
  sortBy?: Maybe<Scalars["String"]>
  startIndex?: Maybe<Scalars["Int"]>
}

export type QueryEntityListEntityArgs = {
  entityListFullName: Scalars["String"]
  id: Scalars["String"]
}

export type QueryEntityListEntityContainerArgs = {
  entityListFullName: Scalars["String"]
  id: Scalars["String"]
}

export type QueryEntityListEntityContainersArgs = {
  entityListFullName: Scalars["String"]
  filter?: Maybe<Scalars["String"]>
  pageSize?: Maybe<Scalars["Int"]>
  sortBy?: Maybe<Scalars["String"]>
  startIndex?: Maybe<Scalars["Int"]>
}

export type QueryEntityListViewArgs = {
  entityListFullName: Scalars["String"]
  viewName: Scalars["String"]
}

export type QueryEntityListViewEntitiesArgs = {
  entityListFullName: Scalars["String"]
  filter?: Maybe<Scalars["String"]>
  pageSize?: Maybe<Scalars["Int"]>
  startIndex?: Maybe<Scalars["Int"]>
  viewName: Scalars["String"]
}

export type QueryEntityListViewEntityArgs = {
  entityId: Scalars["String"]
  entityListFullName: Scalars["String"]
  viewName: Scalars["String"]
}

export type QueryEntityListViewEntityContainerArgs = {
  entityId: Scalars["String"]
  entityListFullName: Scalars["String"]
  viewName: Scalars["String"]
}

export type QueryEntityListViewEntityContainersArgs = {
  entityListFullName: Scalars["String"]
  filter?: Maybe<Scalars["String"]>
  pageSize?: Maybe<Scalars["Int"]>
  startIndex?: Maybe<Scalars["Int"]>
  viewName: Scalars["String"]
}

export type QueryEntityListViewsArgs = {
  entityListFullName: Scalars["String"]
}

export type QueryEntityListsArgs = {
  filter?: Maybe<Scalars["String"]>
  pageSize?: Maybe<Scalars["Int"]>
  sortBy?: Maybe<Scalars["String"]>
  startIndex?: Maybe<Scalars["Int"]>
}

export type QueryInStockNotificationArgs = {
  id: Scalars["Int"]
}

export type QueryInStockNotificationsArgs = {
  filter?: Maybe<Scalars["String"]>
  pageSize?: Maybe<Scalars["Int"]>
  sortBy?: Maybe<Scalars["String"]>
  startIndex?: Maybe<Scalars["Int"]>
}

export type QueryLocaleServiceTypesArgs = {
  localeCode: Scalars["String"]
}

export type QueryLocationArgs = {
  includeAttributeDefinition?: Maybe<Scalars["Boolean"]>
  locationCode: Scalars["String"]
}

export type QueryLocationGroupArgs = {
  groupId?: Maybe<Scalars["Int"]>
  locationGroupCode?: Maybe<Scalars["String"]>
}

export type QueryLocationGroupConfigArgs = {
  locationCode?: Maybe<Scalars["String"]>
  locationGroupCode?: Maybe<Scalars["String"]>
  locationGroupId?: Maybe<Scalars["Int"]>
}

export type QueryLocationUsageArgs = {
  code: Scalars["String"]
}

export type QueryOrderArgs = {
  draft?: Maybe<Scalars["Boolean"]>
  includeBin?: Maybe<Scalars["Boolean"]>
  mode?: Maybe<Scalars["String"]>
  orderId: Scalars["String"]
}

export type QueryOrderActionsArgs = {
  orderId: Scalars["String"]
}

export type QueryOrderAttributesArgs = {
  orderId: Scalars["String"]
}

export type QueryOrderBillingInfoArgs = {
  draft?: Maybe<Scalars["Boolean"]>
  orderId: Scalars["String"]
}

export type QueryOrderCancelReasonsArgs = {
  category?: Maybe<Scalars["String"]>
}

export type QueryOrderDigitalPackageArgs = {
  digitalPackageId: Scalars["String"]
  orderId: Scalars["String"]
}

export type QueryOrderDigitalPackageActionsArgs = {
  digitalPackageId: Scalars["String"]
  orderId: Scalars["String"]
}

export type QueryOrderExtendedPropertiesArgs = {
  draft?: Maybe<Scalars["Boolean"]>
  orderId: Scalars["String"]
}

export type QueryOrderFulfillmentInfoArgs = {
  draft?: Maybe<Scalars["Boolean"]>
  orderId: Scalars["String"]
}

export type QueryOrderItemArgs = {
  draft?: Maybe<Scalars["Boolean"]>
  lineId?: Maybe<Scalars["Int"]>
  orderId?: Maybe<Scalars["String"]>
  orderItemId?: Maybe<Scalars["String"]>
}

export type QueryOrderItemsArgs = {
  draft?: Maybe<Scalars["Boolean"]>
  orderId: Scalars["String"]
}

export type QueryOrderNoteArgs = {
  noteId: Scalars["String"]
  orderId: Scalars["String"]
}

export type QueryOrderNotesArgs = {
  orderId: Scalars["String"]
}

export type QueryOrderPackageArgs = {
  orderId: Scalars["String"]
  packageId: Scalars["String"]
}

export type QueryOrderPackageActionsArgs = {
  orderId: Scalars["String"]
  packageId: Scalars["String"]
}

export type QueryOrderPackageLabelArgs = {
  orderId: Scalars["String"]
  packageId: Scalars["String"]
}

export type QueryOrderPaymentArgs = {
  orderId: Scalars["String"]
  paymentId: Scalars["String"]
}

export type QueryOrderPaymentActionsArgs = {
  orderId: Scalars["String"]
  paymentId: Scalars["String"]
}

export type QueryOrderPaymentsArgs = {
  orderId: Scalars["String"]
}

export type QueryOrderPickupArgs = {
  orderId: Scalars["String"]
  pickupId: Scalars["String"]
}

export type QueryOrderPickupActionsArgs = {
  orderId: Scalars["String"]
  pickupId: Scalars["String"]
}

export type QueryOrderReturnableItemsArgs = {
  orderId: Scalars["String"]
}

export type QueryOrderRoutingRoutingSuggestionLogArgs = {
  externalResponseID?: Maybe<Scalars["String"]>
  orderID?: Maybe<Scalars["Int"]>
  responseID?: Maybe<Scalars["Int"]>
  suggestionID?: Maybe<Scalars["Int"]>
}

export type QueryOrderShipmentArgs = {
  orderId: Scalars["String"]
  shipmentId: Scalars["String"]
}

export type QueryOrderShipmentMethodsArgs = {
  draft?: Maybe<Scalars["Boolean"]>
  orderId: Scalars["String"]
}

export type QueryOrderTaxableOrdersArgs = {
  orderId: Scalars["String"]
}

export type QueryOrderValidationResultsArgs = {
  orderId: Scalars["String"]
}

export type QueryOrdersArgs = {
  filter?: Maybe<Scalars["String"]>
  includeBin?: Maybe<Scalars["Boolean"]>
  mode?: Maybe<Scalars["String"]>
  pageSize?: Maybe<Scalars["Int"]>
  q?: Maybe<Scalars["String"]>
  qLimit?: Maybe<Scalars["Int"]>
  sortBy?: Maybe<Scalars["String"]>
  startIndex?: Maybe<Scalars["Int"]>
}

export type QueryPriceListArgs = {
  priceListCode?: Maybe<Scalars["String"]>
}

export type QueryProductArgs = {
  acceptVariantProductCode?: Maybe<Scalars["Boolean"]>
  allowInactive?: Maybe<Scalars["Boolean"]>
  includeAllImages?: Maybe<Scalars["Boolean"]>
  productCode: Scalars["String"]
  purchaseLocation?: Maybe<Scalars["String"]>
  quantity?: Maybe<Scalars["Int"]>
  skipInventoryCheck?: Maybe<Scalars["Boolean"]>
  sliceValue?: Maybe<Scalars["String"]>
  supressOutOfStock404?: Maybe<Scalars["Boolean"]>
  variationProductCode?: Maybe<Scalars["String"]>
  variationProductCodeFilter?: Maybe<Scalars["String"]>
}

export type QueryProductLocationInventoryArgs = {
  locationCodes?: Maybe<Scalars["String"]>
  productCode: Scalars["String"]
}

export type QueryProductSearchArgs = {
  cursorMark?: Maybe<Scalars["String"]>
  defaultSort?: Maybe<Scalars["String"]>
  defaultSortDefinitionName?: Maybe<Scalars["String"]>
  enableSearchTuningRules?: Maybe<Scalars["Boolean"]>
  facet?: Maybe<Scalars["String"]>
  facetFieldRangeQuery?: Maybe<Scalars["String"]>
  facetHierDepth?: Maybe<Scalars["String"]>
  facetHierPrefix?: Maybe<Scalars["String"]>
  facetHierValue?: Maybe<Scalars["String"]>
  facetPageSize?: Maybe<Scalars["String"]>
  facetPrefix?: Maybe<Scalars["String"]>
  facetSettings?: Maybe<Scalars["String"]>
  facetStartIndex?: Maybe<Scalars["String"]>
  facetTemplate?: Maybe<Scalars["String"]>
  facetTemplateExclude?: Maybe<Scalars["String"]>
  facetTemplateSubset?: Maybe<Scalars["String"]>
  facetValueFilter?: Maybe<Scalars["String"]>
  facetValueSort?: Maybe<Scalars["String"]>
  filter?: Maybe<Scalars["String"]>
  includeAllImages?: Maybe<Scalars["Boolean"]>
  mid?: Maybe<Scalars["String"]>
  omitNamespace?: Maybe<Scalars["Boolean"]>
  pageSize?: Maybe<Scalars["Int"]>
  query?: Maybe<Scalars["String"]>
  responseOptions?: Maybe<Scalars["String"]>
  searchSettings?: Maybe<Scalars["String"]>
  searchTuningRuleCode?: Maybe<Scalars["String"]>
  searchTuningRuleContext?: Maybe<Scalars["String"]>
  shouldSlice?: Maybe<Scalars["Boolean"]>
  sortBy?: Maybe<Scalars["String"]>
  sortDefinitionName?: Maybe<Scalars["String"]>
  startIndex?: Maybe<Scalars["Int"]>
}

export type QueryProductSearchRandomAccessCursorArgs = {
  filter?: Maybe<Scalars["String"]>
  pageSize?: Maybe<Scalars["Int"]>
  query?: Maybe<Scalars["String"]>
}

export type QueryProductVersionArgs = {
  lastModifiedDate?: Maybe<Scalars["DateTime"]>
  productCode: Scalars["String"]
  productVersion?: Maybe<Scalars["Int"]>
}

export type QueryProductsArgs = {
  cursorMark?: Maybe<Scalars["String"]>
  defaultSort?: Maybe<Scalars["String"]>
  filter?: Maybe<Scalars["String"]>
  includeAllImages?: Maybe<Scalars["Boolean"]>
  mid?: Maybe<Scalars["String"]>
  pageSize?: Maybe<Scalars["Int"]>
  responseOptions?: Maybe<Scalars["String"]>
  sortBy?: Maybe<Scalars["String"]>
  startIndex?: Maybe<Scalars["Int"]>
}

export type QueryPropertyTypeArgs = {
  propertyTypeName: Scalars["String"]
}

export type QueryPropertyTypesArgs = {
  pageSize?: Maybe<Scalars["Int"]>
  startIndex?: Maybe<Scalars["Int"]>
}

export type QueryQuoteArgs = {
  draft?: Maybe<Scalars["Boolean"]>
  quoteId: Scalars["String"]
}

export type QueryQuoteItemArgs = {
  draft?: Maybe<Scalars["Boolean"]>
  quoteId: Scalars["String"]
  quoteItemId: Scalars["String"]
}

export type QueryQuoteItemsArgs = {
  filter?: Maybe<Scalars["String"]>
  pageSize?: Maybe<Scalars["Int"]>
  quoteId: Scalars["String"]
  sortBy?: Maybe<Scalars["String"]>
  startIndex?: Maybe<Scalars["Int"]>
}

export type QueryQuotesArgs = {
  filter?: Maybe<Scalars["String"]>
  pageSize?: Maybe<Scalars["Int"]>
  q?: Maybe<Scalars["String"]>
  qLimit?: Maybe<Scalars["Int"]>
  sortBy?: Maybe<Scalars["String"]>
  startIndex?: Maybe<Scalars["Int"]>
}

export type QueryResolvedPriceListArgs = {
  customerAccountId?: Maybe<Scalars["Int"]>
}

export type QueryReturnActionsArgs = {
  returnId: Scalars["String"]
}

export type QueryReturnItemArgs = {
  returnId: Scalars["String"]
  returnItemId: Scalars["String"]
}

export type QueryReturnItemsArgs = {
  returnId: Scalars["String"]
}

export type QueryReturnNoteArgs = {
  noteId: Scalars["String"]
  returnId: Scalars["String"]
}

export type QueryReturnNotesArgs = {
  returnId: Scalars["String"]
}

export type QueryReturnPackageArgs = {
  packageId: Scalars["String"]
  returnId: Scalars["String"]
}

export type QueryReturnPackageLabelArgs = {
  packageId: Scalars["String"]
  returnAsBase64Png?: Maybe<Scalars["Boolean"]>
  returnId: Scalars["String"]
}

export type QueryReturnPaymentArgs = {
  paymentId: Scalars["String"]
  returnId: Scalars["String"]
}

export type QueryReturnPaymentsArgs = {
  returnId: Scalars["String"]
}

export type QueryReturnReasonArgs = {
  returnId: Scalars["String"]
}

export type QueryReturnShipmentArgs = {
  returnId: Scalars["String"]
  shipmentId: Scalars["String"]
}

export type QueryReturnShippingLabelArgs = {
  returnId: Scalars["String"]
}

export type QueryReturnsArgs = {
  filter?: Maybe<Scalars["String"]>
  pageSize?: Maybe<Scalars["Int"]>
  q?: Maybe<Scalars["String"]>
  sortBy?: Maybe<Scalars["String"]>
  startIndex?: Maybe<Scalars["Int"]>
}

export type QuerySpLocationArgs = {
  includeAttributeDefinition?: Maybe<Scalars["Boolean"]>
  locationCode: Scalars["String"]
}

export type QuerySpLocationsArgs = {
  filter?: Maybe<Scalars["String"]>
  includeAttributeDefinition?: Maybe<Scalars["Boolean"]>
  pageSize?: Maybe<Scalars["Int"]>
  sortBy?: Maybe<Scalars["String"]>
  startIndex?: Maybe<Scalars["Int"]>
}

export type QuerySuggestionSearchArgs = {
  filter?: Maybe<Scalars["String"]>
  groups?: Maybe<Scalars["String"]>
  mid?: Maybe<Scalars["String"]>
  pageSize?: Maybe<Scalars["Int"]>
  query?: Maybe<Scalars["String"]>
}

export type QueryTargetRuleArgs = {
  code: Scalars["String"]
}

export type QueryTargetRulesArgs = {
  filter?: Maybe<Scalars["String"]>
  pageSize?: Maybe<Scalars["Int"]>
  sortBy?: Maybe<Scalars["String"]>
  startIndex?: Maybe<Scalars["Int"]>
}

export type QueryUsageTypeLocationsArgs = {
  filter?: Maybe<Scalars["String"]>
  includeAttributeDefinition?: Maybe<Scalars["Boolean"]>
  locationUsageType: Scalars["String"]
  pageSize?: Maybe<Scalars["Int"]>
  sortBy?: Maybe<Scalars["String"]>
  startIndex?: Maybe<Scalars["Int"]>
}

export type QueryUserCartArgs = {
  userId: Scalars["String"]
}

export type QueryUserCartSummaryArgs = {
  userId: Scalars["String"]
}

export type QueryWishlistArgs = {
  wishlistId: Scalars["String"]
}

export type QueryWishlistItemArgs = {
  wishlistId: Scalars["String"]
  wishlistItemId: Scalars["String"]
}

export type QueryWishlistItemsArgs = {
  filter?: Maybe<Scalars["String"]>
  pageSize?: Maybe<Scalars["Int"]>
  sortBy?: Maybe<Scalars["String"]>
  startIndex?: Maybe<Scalars["Int"]>
  wishlistId: Scalars["String"]
}

export type QueryWishlistsArgs = {
  filter?: Maybe<Scalars["String"]>
  pageSize?: Maybe<Scalars["Int"]>
  q?: Maybe<Scalars["String"]>
  qLimit?: Maybe<Scalars["Int"]>
  sortBy?: Maybe<Scalars["String"]>
  startIndex?: Maybe<Scalars["Int"]>
}

export type Quote = {
  __typename?: "Quote"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<Quote>
  adjustment?: Maybe<Adjustment>
  auditHistory?: Maybe<Array<Maybe<AuditRecord>>>
  auditInfo?: Maybe<CrAuditInfo>
  channelCode?: Maybe<Scalars["String"]>
  comments?: Maybe<Array<Maybe<QuoteComment>>>
  couponCodes?: Maybe<Array<Scalars["String"]>>
  currencyCode?: Maybe<Scalars["String"]>
  customerAccountId?: Maybe<Scalars["Int"]>
  customerInteractionType?: Maybe<Scalars["String"]>
  customerTaxId?: Maybe<Scalars["String"]>
  data?: Maybe<Scalars["Object"]>
  dutyAmount?: Maybe<Scalars["Float"]>
  dutyTotal: Scalars["Float"]
  email?: Maybe<Scalars["String"]>
  expirationDate?: Maybe<Scalars["DateTime"]>
  feeTotal: Scalars["Float"]
  fulfillmentInfo?: Maybe<FulfillmentInfo>
  handlingAdjustment?: Maybe<Adjustment>
  handlingAmount?: Maybe<Scalars["Float"]>
  handlingDiscounts?: Maybe<Array<Maybe<CrAppliedDiscount>>>
  handlingSubTotal: Scalars["Float"]
  handlingTax?: Maybe<Scalars["Float"]>
  handlingTaxTotal: Scalars["Float"]
  handlingTotal: Scalars["Float"]
  hasDraft?: Maybe<Scalars["Boolean"]>
  id?: Maybe<Scalars["String"]>
  invalidCoupons?: Maybe<Array<Maybe<InvalidCoupon>>>
  ipAddress?: Maybe<Scalars["String"]>
  isDraft?: Maybe<Scalars["Boolean"]>
  isTaxExempt?: Maybe<Scalars["Boolean"]>
  itemLevelHandlingDiscountTotal: Scalars["Float"]
  itemLevelProductDiscountTotal: Scalars["Float"]
  itemLevelShippingDiscountTotal: Scalars["Float"]
  itemTaxTotal: Scalars["Float"]
  itemTotal: Scalars["Float"]
  items?: Maybe<Array<Maybe<CrOrderItem>>>
  locationCode?: Maybe<Scalars["String"]>
  name?: Maybe<Scalars["String"]>
  number?: Maybe<Scalars["Int"]>
  orderDiscounts?: Maybe<Array<Maybe<CrAppliedDiscount>>>
  orderLevelHandlingDiscountTotal: Scalars["Float"]
  orderLevelProductDiscountTotal: Scalars["Float"]
  orderLevelShippingDiscountTotal: Scalars["Float"]
  priceListCode?: Maybe<Scalars["String"]>
  shippingAdjustment?: Maybe<Adjustment>
  shippingAmount: Scalars["Float"]
  shippingDiscounts?: Maybe<Array<Maybe<ShippingDiscount>>>
  shippingSubTotal: Scalars["Float"]
  shippingTax?: Maybe<Scalars["Float"]>
  shippingTaxTotal: Scalars["Float"]
  shippingTotal: Scalars["Float"]
  siteId: Scalars["Int"]
  sourceDevice?: Maybe<Scalars["String"]>
  status?: Maybe<Scalars["String"]>
  subTotal: Scalars["Float"]
  submittedDate?: Maybe<Scalars["DateTime"]>
  taxData?: Maybe<Scalars["Object"]>
  tenantId: Scalars["Int"]
  total: Scalars["Float"]
  userId?: Maybe<Scalars["String"]>
  visitId?: Maybe<Scalars["String"]>
  webSessionId?: Maybe<Scalars["String"]>
}

export type Quote_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type QuoteCollection = {
  __typename?: "QuoteCollection"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<QuoteCollection>
  items?: Maybe<Array<Maybe<Quote>>>
  pageCount: Scalars["Int"]
  pageSize: Scalars["Int"]
  startIndex: Scalars["Int"]
  totalCount: Scalars["Int"]
}

export type QuoteCollection_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type QuoteComment = {
  __typename?: "QuoteComment"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<QuoteComment>
  auditInfo?: Maybe<CrAuditInfo>
  id?: Maybe<Scalars["String"]>
  text?: Maybe<Scalars["String"]>
}

export type QuoteComment_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type QuoteCommentInput = {
  auditInfo?: Maybe<CrAuditInfoInput>
  id?: Maybe<Scalars["String"]>
  text?: Maybe<Scalars["String"]>
}

export type QuoteInput = {
  adjustment?: Maybe<AdjustmentInput>
  auditHistory?: Maybe<Array<Maybe<AuditRecordInput>>>
  auditInfo?: Maybe<CrAuditInfoInput>
  channelCode?: Maybe<Scalars["String"]>
  comments?: Maybe<Array<Maybe<QuoteCommentInput>>>
  couponCodes?: Maybe<Array<Scalars["String"]>>
  currencyCode?: Maybe<Scalars["String"]>
  customerAccountId?: Maybe<Scalars["Int"]>
  customerInteractionType?: Maybe<Scalars["String"]>
  customerTaxId?: Maybe<Scalars["String"]>
  data?: Maybe<Scalars["Object"]>
  dutyAmount?: Maybe<Scalars["Float"]>
  dutyTotal: Scalars["Float"]
  email?: Maybe<Scalars["String"]>
  expirationDate?: Maybe<Scalars["DateTime"]>
  feeTotal: Scalars["Float"]
  fulfillmentInfo?: Maybe<FulfillmentInfoInput>
  handlingAdjustment?: Maybe<AdjustmentInput>
  handlingAmount?: Maybe<Scalars["Float"]>
  handlingDiscounts?: Maybe<Array<Maybe<CrAppliedDiscountInput>>>
  handlingSubTotal: Scalars["Float"]
  handlingTax?: Maybe<Scalars["Float"]>
  handlingTaxTotal: Scalars["Float"]
  handlingTotal: Scalars["Float"]
  hasDraft?: Maybe<Scalars["Boolean"]>
  id?: Maybe<Scalars["String"]>
  invalidCoupons?: Maybe<Array<Maybe<InvalidCouponInput>>>
  ipAddress?: Maybe<Scalars["String"]>
  isDraft?: Maybe<Scalars["Boolean"]>
  isTaxExempt?: Maybe<Scalars["Boolean"]>
  itemLevelHandlingDiscountTotal: Scalars["Float"]
  itemLevelProductDiscountTotal: Scalars["Float"]
  itemLevelShippingDiscountTotal: Scalars["Float"]
  itemTaxTotal: Scalars["Float"]
  itemTotal: Scalars["Float"]
  items?: Maybe<Array<Maybe<CrOrderItemInput>>>
  locationCode?: Maybe<Scalars["String"]>
  name?: Maybe<Scalars["String"]>
  number?: Maybe<Scalars["Int"]>
  orderDiscounts?: Maybe<Array<Maybe<CrAppliedDiscountInput>>>
  orderLevelHandlingDiscountTotal: Scalars["Float"]
  orderLevelProductDiscountTotal: Scalars["Float"]
  orderLevelShippingDiscountTotal: Scalars["Float"]
  priceListCode?: Maybe<Scalars["String"]>
  shippingAdjustment?: Maybe<AdjustmentInput>
  shippingAmount: Scalars["Float"]
  shippingDiscounts?: Maybe<Array<Maybe<ShippingDiscountInput>>>
  shippingSubTotal: Scalars["Float"]
  shippingTax?: Maybe<Scalars["Float"]>
  shippingTaxTotal: Scalars["Float"]
  shippingTotal: Scalars["Float"]
  siteId: Scalars["Int"]
  sourceDevice?: Maybe<Scalars["String"]>
  status?: Maybe<Scalars["String"]>
  subTotal: Scalars["Float"]
  submittedDate?: Maybe<Scalars["DateTime"]>
  taxData?: Maybe<Scalars["Object"]>
  tenantId: Scalars["Int"]
  total: Scalars["Float"]
  userId?: Maybe<Scalars["String"]>
  visitId?: Maybe<Scalars["String"]>
  webSessionId?: Maybe<Scalars["String"]>
}

export type ReasonCollection = {
  __typename?: "ReasonCollection"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<ReasonCollection>
  items?: Maybe<Array<Scalars["String"]>>
  totalCount: Scalars["Int"]
}

export type ReasonCollection_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type Refund = {
  __typename?: "Refund"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<Refund>
  amount: Scalars["Float"]
  auditInfo?: Maybe<CrAuditInfo>
  id?: Maybe<Scalars["String"]>
  orderId?: Maybe<Scalars["String"]>
  payment?: Maybe<Payment>
  reason?: Maybe<Scalars["String"]>
  reasonCode?: Maybe<Scalars["String"]>
  refundMethod?: Maybe<Scalars["String"]>
}

export type Refund_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type RefundInput = {
  amount: Scalars["Float"]
  auditInfo?: Maybe<CrAuditInfoInput>
  id?: Maybe<Scalars["String"]>
  orderId?: Maybe<Scalars["String"]>
  payment?: Maybe<PaymentInput>
  reason?: Maybe<Scalars["String"]>
  reasonCode?: Maybe<Scalars["String"]>
  refundMethod?: Maybe<Scalars["String"]>
}

export type RegularHours = {
  __typename?: "RegularHours"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<RegularHours>
  friday?: Maybe<Hours>
  monday?: Maybe<Hours>
  saturday?: Maybe<Hours>
  sunday?: Maybe<Hours>
  thursday?: Maybe<Hours>
  timeZone?: Maybe<Scalars["String"]>
  tuesday?: Maybe<Hours>
  wednesday?: Maybe<Hours>
}

export type RegularHours_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type RegularHoursInput = {
  friday?: Maybe<HoursInput>
  monday?: Maybe<HoursInput>
  saturday?: Maybe<HoursInput>
  sunday?: Maybe<HoursInput>
  thursday?: Maybe<HoursInput>
  timeZone?: Maybe<Scalars["String"]>
  tuesday?: Maybe<HoursInput>
  wednesday?: Maybe<HoursInput>
}

export type RepriceShipmentObjectInput = {
  newShipment?: Maybe<ShipmentInput>
  originalShipment?: Maybe<ShipmentInput>
}

export type ResetPasswordInfoInput = {
  customerSetCode?: Maybe<Scalars["String"]>
  emailAddress?: Maybe<Scalars["String"]>
  userName?: Maybe<Scalars["String"]>
}

export type ResolvedPriceList = {
  __typename?: "ResolvedPriceList"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<ResolvedPriceList>
  description?: Maybe<Scalars["String"]>
  name?: Maybe<Scalars["String"]>
  priceListCode?: Maybe<Scalars["String"]>
  priceListId: Scalars["Int"]
}

export type ResolvedPriceList_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type RestockableReturnItemInput = {
  locationCode?: Maybe<Scalars["String"]>
  quantity: Scalars["Int"]
  returnItemId?: Maybe<Scalars["String"]>
}

export type ReturnActionInput = {
  actionName?: Maybe<Scalars["String"]>
  returnIds?: Maybe<Array<Scalars["String"]>>
}

export type ReturnBundle = {
  __typename?: "ReturnBundle"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<ReturnBundle>
  productCode?: Maybe<Scalars["String"]>
  quantity: Scalars["Int"]
}

export type ReturnBundle_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type ReturnBundleInput = {
  productCode?: Maybe<Scalars["String"]>
  quantity: Scalars["Int"]
}

export type ReturnCollection = {
  __typename?: "ReturnCollection"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<ReturnCollection>
  items?: Maybe<Array<Maybe<ReturnObj>>>
  pageCount: Scalars["Int"]
  pageSize: Scalars["Int"]
  startIndex: Scalars["Int"]
  totalCount: Scalars["Int"]
}

export type ReturnCollection_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type ReturnItem = {
  __typename?: "ReturnItem"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<ReturnItem>
  bundledProducts?: Maybe<Array<Maybe<ReturnBundle>>>
  data?: Maybe<Scalars["Object"]>
  excludeProductExtras?: Maybe<Scalars["Boolean"]>
  id?: Maybe<Scalars["String"]>
  notes?: Maybe<Array<Maybe<OrderNote>>>
  orderItemId?: Maybe<Scalars["String"]>
  orderItemOptionAttributeFQN?: Maybe<Scalars["String"]>
  orderLineId?: Maybe<Scalars["Int"]>
  product?: Maybe<CrProduct>
  productLossAmount?: Maybe<Scalars["Float"]>
  productLossTaxAmount?: Maybe<Scalars["Float"]>
  quantityReceived: Scalars["Int"]
  quantityReplaced?: Maybe<Scalars["Int"]>
  quantityRestockable: Scalars["Int"]
  quantityRestocked: Scalars["Int"]
  quantityShipped: Scalars["Int"]
  reasons?: Maybe<Array<Maybe<ReturnReason>>>
  receiveStatus?: Maybe<Scalars["String"]>
  refundAmount?: Maybe<Scalars["Float"]>
  refundStatus?: Maybe<Scalars["String"]>
  replaceStatus?: Maybe<Scalars["String"]>
  returnNotRequired?: Maybe<Scalars["Boolean"]>
  returnProcessingFee?: Maybe<Scalars["Float"]>
  returnProcessingFeeApplied?: Maybe<Scalars["Float"]>
  returnType?: Maybe<Scalars["String"]>
  shipmentItemId?: Maybe<Scalars["Int"]>
  shipmentNumber?: Maybe<Scalars["Int"]>
  shippingAndHandlingRefunded?: Maybe<Scalars["Boolean"]>
  shippingLossAmount?: Maybe<Scalars["Float"]>
  shippingLossTaxAmount?: Maybe<Scalars["Float"]>
  totalWithWeightedShippingAndHandling?: Maybe<Scalars["Float"]>
  totalWithoutWeightedShippingAndHandling?: Maybe<Scalars["Float"]>
}

export type ReturnItem_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type ReturnItemCollection = {
  __typename?: "ReturnItemCollection"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<ReturnItemCollection>
  items?: Maybe<Array<Maybe<ReturnItem>>>
  totalCount: Scalars["Int"]
}

export type ReturnItemCollection_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type ReturnItemInput = {
  bundledProducts?: Maybe<Array<Maybe<ReturnBundleInput>>>
  data?: Maybe<Scalars["Object"]>
  excludeProductExtras?: Maybe<Scalars["Boolean"]>
  id?: Maybe<Scalars["String"]>
  notes?: Maybe<Array<Maybe<OrderNoteInput>>>
  orderItemId?: Maybe<Scalars["String"]>
  orderItemOptionAttributeFQN?: Maybe<Scalars["String"]>
  orderLineId?: Maybe<Scalars["Int"]>
  product?: Maybe<CrProductInput>
  productLossAmount?: Maybe<Scalars["Float"]>
  productLossTaxAmount?: Maybe<Scalars["Float"]>
  quantityReceived: Scalars["Int"]
  quantityReplaced?: Maybe<Scalars["Int"]>
  quantityRestockable: Scalars["Int"]
  quantityRestocked: Scalars["Int"]
  quantityShipped: Scalars["Int"]
  reasons?: Maybe<Array<Maybe<ReturnReasonInput>>>
  receiveStatus?: Maybe<Scalars["String"]>
  refundAmount?: Maybe<Scalars["Float"]>
  refundStatus?: Maybe<Scalars["String"]>
  replaceStatus?: Maybe<Scalars["String"]>
  returnNotRequired?: Maybe<Scalars["Boolean"]>
  returnProcessingFee?: Maybe<Scalars["Float"]>
  returnProcessingFeeApplied?: Maybe<Scalars["Float"]>
  returnType?: Maybe<Scalars["String"]>
  shipmentItemId?: Maybe<Scalars["Int"]>
  shipmentNumber?: Maybe<Scalars["Int"]>
  shippingAndHandlingRefunded?: Maybe<Scalars["Boolean"]>
  shippingLossAmount?: Maybe<Scalars["Float"]>
  shippingLossTaxAmount?: Maybe<Scalars["Float"]>
  totalWithWeightedShippingAndHandling?: Maybe<Scalars["Float"]>
  totalWithoutWeightedShippingAndHandling?: Maybe<Scalars["Float"]>
}

export type ReturnItemSpecifierInput = {
  quantity: Scalars["Int"]
  returnItemId?: Maybe<Scalars["String"]>
}

export type ReturnObj = {
  __typename?: "ReturnObj"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<ReturnObj>
  actionRequired?: Maybe<Scalars["Boolean"]>
  auditInfo?: Maybe<CrAuditInfo>
  availableActions?: Maybe<Array<Scalars["String"]>>
  canInitiateRefund?: Maybe<Scalars["Boolean"]>
  changeMessages?: Maybe<Array<Maybe<ChangeMessage>>>
  channelCode?: Maybe<Scalars["String"]>
  contact?: Maybe<Contact>
  currencyCode?: Maybe<Scalars["String"]>
  customerAccountId?: Maybe<Scalars["Int"]>
  customerInteractionType?: Maybe<Scalars["String"]>
  id?: Maybe<Scalars["String"]>
  isUnified?: Maybe<Scalars["Boolean"]>
  items?: Maybe<Array<Maybe<ReturnItem>>>
  locationCode?: Maybe<Scalars["String"]>
  lossTotal?: Maybe<Scalars["Float"]>
  notes?: Maybe<Array<Maybe<OrderNote>>>
  originalOrderId?: Maybe<Scalars["String"]>
  originalOrderNumber?: Maybe<Scalars["Int"]>
  packages?: Maybe<Array<Maybe<CrPackageObj>>>
  payments?: Maybe<Array<Maybe<Payment>>>
  productLossTaxTotal?: Maybe<Scalars["Float"]>
  productLossTotal?: Maybe<Scalars["Float"]>
  receiveStatus?: Maybe<Scalars["String"]>
  refundAmount?: Maybe<Scalars["Float"]>
  refundStatus?: Maybe<Scalars["String"]>
  refundToGC?: Maybe<Scalars["Boolean"]>
  replaceStatus?: Maybe<Scalars["String"]>
  returnNumber?: Maybe<Scalars["Int"]>
  returnOrderId?: Maybe<Scalars["String"]>
  returnType?: Maybe<Scalars["String"]>
  rmaDeadline?: Maybe<Scalars["DateTime"]>
  shippingLossTaxTotal?: Maybe<Scalars["Float"]>
  shippingLossTotal?: Maybe<Scalars["Float"]>
  siteId?: Maybe<Scalars["Int"]>
  status?: Maybe<Scalars["String"]>
  tenantId?: Maybe<Scalars["Int"]>
  userId?: Maybe<Scalars["String"]>
  visitId?: Maybe<Scalars["String"]>
  webSessionId?: Maybe<Scalars["String"]>
}

export type ReturnObj_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type ReturnObjInput = {
  actionRequired?: Maybe<Scalars["Boolean"]>
  auditInfo?: Maybe<CrAuditInfoInput>
  availableActions?: Maybe<Array<Scalars["String"]>>
  canInitiateRefund?: Maybe<Scalars["Boolean"]>
  changeMessages?: Maybe<Array<Maybe<ChangeMessageInput>>>
  channelCode?: Maybe<Scalars["String"]>
  contact?: Maybe<ContactInput>
  currencyCode?: Maybe<Scalars["String"]>
  customerAccountId?: Maybe<Scalars["Int"]>
  customerInteractionType?: Maybe<Scalars["String"]>
  id?: Maybe<Scalars["String"]>
  isUnified?: Maybe<Scalars["Boolean"]>
  items?: Maybe<Array<Maybe<ReturnItemInput>>>
  locationCode?: Maybe<Scalars["String"]>
  lossTotal?: Maybe<Scalars["Float"]>
  notes?: Maybe<Array<Maybe<OrderNoteInput>>>
  originalOrderId?: Maybe<Scalars["String"]>
  originalOrderNumber?: Maybe<Scalars["Int"]>
  packages?: Maybe<Array<Maybe<CrPackageObjInput>>>
  payments?: Maybe<Array<Maybe<PaymentInput>>>
  productLossTaxTotal?: Maybe<Scalars["Float"]>
  productLossTotal?: Maybe<Scalars["Float"]>
  receiveStatus?: Maybe<Scalars["String"]>
  refundAmount?: Maybe<Scalars["Float"]>
  refundStatus?: Maybe<Scalars["String"]>
  refundToGC?: Maybe<Scalars["Boolean"]>
  replaceStatus?: Maybe<Scalars["String"]>
  returnNumber?: Maybe<Scalars["Int"]>
  returnOrderId?: Maybe<Scalars["String"]>
  returnType?: Maybe<Scalars["String"]>
  rmaDeadline?: Maybe<Scalars["DateTime"]>
  shippingLossTaxTotal?: Maybe<Scalars["Float"]>
  shippingLossTotal?: Maybe<Scalars["Float"]>
  siteId?: Maybe<Scalars["Int"]>
  status?: Maybe<Scalars["String"]>
  tenantId?: Maybe<Scalars["Int"]>
  userId?: Maybe<Scalars["String"]>
  visitId?: Maybe<Scalars["String"]>
  webSessionId?: Maybe<Scalars["String"]>
}

export type ReturnReason = {
  __typename?: "ReturnReason"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<ReturnReason>
  quantity: Scalars["Int"]
  reason?: Maybe<Scalars["String"]>
}

export type ReturnReason_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type ReturnReasonInput = {
  quantity: Scalars["Int"]
  reason?: Maybe<Scalars["String"]>
}

export type SearchSuggestion = {
  __typename?: "SearchSuggestion"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<SearchSuggestion>
  suggestion?: Maybe<Scalars["Object"]>
  suggestionType?: Maybe<Scalars["String"]>
}

export type SearchSuggestion_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type SearchSuggestionGroup = {
  __typename?: "SearchSuggestionGroup"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<SearchSuggestionGroup>
  name?: Maybe<Scalars["String"]>
  suggestions?: Maybe<Array<Maybe<SearchSuggestion>>>
}

export type SearchSuggestionGroup_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type SearchSuggestionResult = {
  __typename?: "SearchSuggestionResult"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<SearchSuggestionResult>
  query?: Maybe<Scalars["String"]>
  suggestionGroups?: Maybe<Array<Maybe<SearchSuggestionGroup>>>
}

export type SearchSuggestionResult_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type ServiceType = {
  __typename?: "ServiceType"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<ServiceType>
  code?: Maybe<Scalars["String"]>
  content?: Maybe<ServiceTypeLocalizedContent>
  deliveryDuration?: Maybe<Scalars["String"]>
}

export type ServiceType_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type ServiceTypeLocalizedContent = {
  __typename?: "ServiceTypeLocalizedContent"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<ServiceTypeLocalizedContent>
  localeCode?: Maybe<Scalars["String"]>
  name?: Maybe<Scalars["String"]>
}

export type ServiceTypeLocalizedContent_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type Shipment = {
  __typename?: "Shipment"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<Shipment>
  auditInfo?: Maybe<CrAuditInfo>
  backorderCreatedDate?: Maybe<Scalars["Int"]>
  canceledItems?: Maybe<Array<Maybe<CanceledItem>>>
  changeMessages?: Maybe<Array<Maybe<ChangeMessage>>>
  cost?: Maybe<Scalars["Float"]>
  currencyCode?: Maybe<Scalars["String"]>
  customer?: Maybe<Customer>
  customerAccountId?: Maybe<Scalars["Int"]>
  customerTaxId?: Maybe<Scalars["String"]>
  data?: Maybe<Scalars["Object"]>
  destination?: Maybe<Destination>
  dutyAdjustment: Scalars["Float"]
  dutyTotal: Scalars["Float"]
  email?: Maybe<Scalars["String"]>
  externalOrderId?: Maybe<Scalars["String"]>
  externalShipmentId?: Maybe<Scalars["String"]>
  fulfillmentDate?: Maybe<Scalars["DateTime"]>
  fulfillmentLocationCode?: Maybe<Scalars["String"]>
  fulfillmentStatus?: Maybe<Scalars["String"]>
  handlingAdjustment: Scalars["Float"]
  handlingSubtotal: Scalars["Float"]
  handlingTaxAdjustment: Scalars["Float"]
  handlingTaxTotal: Scalars["Float"]
  handlingTotal: Scalars["Float"]
  id?: Maybe<Scalars["String"]>
  isExpress?: Maybe<Scalars["Boolean"]>
  isTransfer?: Maybe<Scalars["Boolean"]>
  items?: Maybe<Array<Maybe<ShipmentItem>>>
  lineItemSubtotal: Scalars["Float"]
  lineItemTaxAdjustment: Scalars["Float"]
  lineItemTaxTotal: Scalars["Float"]
  lineItemTotal: Scalars["Float"]
  number?: Maybe<Scalars["Int"]>
  orderId?: Maybe<Scalars["String"]>
  orderNumber: Scalars["Int"]
  orderSubmitDate?: Maybe<Scalars["DateTime"]>
  origin?: Maybe<Contact>
  originalShipmentNumber?: Maybe<Scalars["Int"]>
  packages?: Maybe<Array<Maybe<CrPackageObj>>>
  parentShipmentNumber?: Maybe<Scalars["Int"]>
  pickStatus?: Maybe<Scalars["String"]>
  pickType?: Maybe<Scalars["String"]>
  pickupInfo?: Maybe<Scalars["Object"]>
  readyToCapture?: Maybe<Scalars["Boolean"]>
  shipmentAdjustment: Scalars["Float"]
  shipmentStatus?: Maybe<Scalars["String"]>
  shipmentStatusReason?: Maybe<ShipmentStatusReason>
  shipmentType?: Maybe<Scalars["String"]>
  shippingAdjustment: Scalars["Float"]
  shippingMethodCode?: Maybe<Scalars["String"]>
  shippingMethodName?: Maybe<Scalars["String"]>
  shippingSubtotal: Scalars["Float"]
  shippingTaxAdjustment: Scalars["Float"]
  shippingTaxTotal: Scalars["Float"]
  shippingTotal: Scalars["Float"]
  shopperNotes?: Maybe<FulfillmentShopperNotes>
  taxData?: Maybe<Scalars["Object"]>
  total: Scalars["Float"]
  transferShipmentNumbers?: Maybe<Array<Scalars["Int"]>>
  workflowProcessContainerId?: Maybe<Scalars["String"]>
  workflowProcessId?: Maybe<Scalars["String"]>
  workflowState?: Maybe<WorkflowState>
}

export type Shipment_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type ShipmentAdjustmentInput = {
  appeasementReason?: Maybe<AppeasementReasonInput>
  handlingAdjustment?: Maybe<Scalars["Float"]>
  handlingTaxAdjustment?: Maybe<Scalars["Float"]>
  itemAdjustment?: Maybe<Scalars["Float"]>
  itemTaxAdjustment?: Maybe<Scalars["Float"]>
  shippingAdjustment?: Maybe<Scalars["Float"]>
  shippingTaxAdjustment?: Maybe<Scalars["Float"]>
}

export type ShipmentInput = {
  auditInfo?: Maybe<CrAuditInfoInput>
  backorderCreatedDate?: Maybe<Scalars["Int"]>
  canceledItems?: Maybe<Array<Maybe<CanceledItemInput>>>
  changeMessages?: Maybe<Array<Maybe<ChangeMessageInput>>>
  cost?: Maybe<Scalars["Float"]>
  currencyCode?: Maybe<Scalars["String"]>
  customer?: Maybe<CustomerInput>
  customerAccountId?: Maybe<Scalars["Int"]>
  customerTaxId?: Maybe<Scalars["String"]>
  data?: Maybe<Scalars["Object"]>
  destination?: Maybe<DestinationInput>
  dutyAdjustment: Scalars["Float"]
  dutyTotal: Scalars["Float"]
  email?: Maybe<Scalars["String"]>
  externalOrderId?: Maybe<Scalars["String"]>
  externalShipmentId?: Maybe<Scalars["String"]>
  fulfillmentDate?: Maybe<Scalars["DateTime"]>
  fulfillmentLocationCode?: Maybe<Scalars["String"]>
  fulfillmentStatus?: Maybe<Scalars["String"]>
  handlingAdjustment: Scalars["Float"]
  handlingSubtotal: Scalars["Float"]
  handlingTaxAdjustment: Scalars["Float"]
  handlingTaxTotal: Scalars["Float"]
  handlingTotal: Scalars["Float"]
  id?: Maybe<Scalars["String"]>
  isExpress?: Maybe<Scalars["Boolean"]>
  isTransfer?: Maybe<Scalars["Boolean"]>
  items?: Maybe<Array<Maybe<ShipmentItemInput>>>
  lineItemSubtotal: Scalars["Float"]
  lineItemTaxAdjustment: Scalars["Float"]
  lineItemTaxTotal: Scalars["Float"]
  lineItemTotal: Scalars["Float"]
  number?: Maybe<Scalars["Int"]>
  orderId?: Maybe<Scalars["String"]>
  orderNumber: Scalars["Int"]
  orderSubmitDate?: Maybe<Scalars["DateTime"]>
  origin?: Maybe<ContactInput>
  originalShipmentNumber?: Maybe<Scalars["Int"]>
  packages?: Maybe<Array<Maybe<CrPackageObjInput>>>
  parentShipmentNumber?: Maybe<Scalars["Int"]>
  pickStatus?: Maybe<Scalars["String"]>
  pickType?: Maybe<Scalars["String"]>
  pickupInfo?: Maybe<Scalars["Object"]>
  readyToCapture?: Maybe<Scalars["Boolean"]>
  shipmentAdjustment: Scalars["Float"]
  shipmentStatus?: Maybe<Scalars["String"]>
  shipmentStatusReason?: Maybe<ShipmentStatusReasonInput>
  shipmentType?: Maybe<Scalars["String"]>
  shippingAdjustment: Scalars["Float"]
  shippingMethodCode?: Maybe<Scalars["String"]>
  shippingMethodName?: Maybe<Scalars["String"]>
  shippingSubtotal: Scalars["Float"]
  shippingTaxAdjustment: Scalars["Float"]
  shippingTaxTotal: Scalars["Float"]
  shippingTotal: Scalars["Float"]
  shopperNotes?: Maybe<FulfillmentShopperNotesInput>
  taxData?: Maybe<Scalars["Object"]>
  total: Scalars["Float"]
  transferShipmentNumbers?: Maybe<Array<Scalars["Int"]>>
  workflowProcessContainerId?: Maybe<Scalars["String"]>
  workflowProcessId?: Maybe<Scalars["String"]>
  workflowState?: Maybe<WorkflowStateInput>
}

export type ShipmentItem = {
  __typename?: "ShipmentItem"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<ShipmentItem>
  actualPrice: Scalars["Float"]
  auditInfo?: Maybe<CrAuditInfo>
  backorderReleaseDate?: Maybe<Scalars["DateTime"]>
  childItemIds?: Maybe<Array<Scalars["String"]>>
  data?: Maybe<Scalars["Object"]>
  duty: Scalars["Float"]
  fulfillmentFields?: Maybe<Array<Maybe<FulfillmentField>>>
  fulfillmentLocationCode?: Maybe<Scalars["String"]>
  giftCards?: Maybe<Array<Maybe<GiftCard>>>
  handling: Scalars["Float"]
  handlingDiscount: Scalars["Float"]
  handlingTax: Scalars["Float"]
  imageUrl?: Maybe<Scalars["String"]>
  isAssemblyRequired?: Maybe<Scalars["Boolean"]>
  isPackagedStandAlone?: Maybe<Scalars["Boolean"]>
  isTaxable?: Maybe<Scalars["Boolean"]>
  itemDiscount: Scalars["Float"]
  itemTax: Scalars["Float"]
  lineId: Scalars["Int"]
  lineItemCost: Scalars["Float"]
  locatorName?: Maybe<Scalars["String"]>
  measurements?: Maybe<CrPackageMeasurements>
  name?: Maybe<Scalars["String"]>
  optionAttributeFQN?: Maybe<Scalars["String"]>
  options?: Maybe<Array<Maybe<CrProductOption>>>
  originalOrderItemId?: Maybe<Scalars["String"]>
  overridePrice?: Maybe<Scalars["Float"]>
  parentId?: Maybe<Scalars["String"]>
  parentItemId?: Maybe<Scalars["String"]>
  productCode?: Maybe<Scalars["String"]>
  quantity: Scalars["Int"]
  readyForPickupQuantity?: Maybe<Scalars["Int"]>
  shipping: Scalars["Float"]
  shippingDiscount: Scalars["Float"]
  shippingTax: Scalars["Float"]
  taxData?: Maybe<Scalars["Object"]>
  taxableHandling: Scalars["Float"]
  taxableLineItemCost: Scalars["Float"]
  taxableShipping: Scalars["Float"]
  unitPrice: Scalars["Float"]
  variationProductCode?: Maybe<Scalars["String"]>
  weightedDutyAdjustment: Scalars["Float"]
  weightedHandlingAdjustment: Scalars["Float"]
  weightedHandlingTaxAdjustment: Scalars["Float"]
  weightedLineItemTaxAdjustment: Scalars["Float"]
  weightedShipmentAdjustment: Scalars["Float"]
  weightedShippingAdjustment: Scalars["Float"]
  weightedShippingTaxAdjustment: Scalars["Float"]
}

export type ShipmentItem_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type ShipmentItemAdjustmentInput = {
  appeasementReason?: Maybe<AppeasementReasonInput>
  overridePrice?: Maybe<Scalars["Float"]>
}

export type ShipmentItemInput = {
  actualPrice: Scalars["Float"]
  auditInfo?: Maybe<CrAuditInfoInput>
  backorderReleaseDate?: Maybe<Scalars["DateTime"]>
  childItemIds?: Maybe<Array<Scalars["String"]>>
  data?: Maybe<Scalars["Object"]>
  duty: Scalars["Float"]
  fulfillmentFields?: Maybe<Array<Maybe<FulfillmentFieldInput>>>
  fulfillmentLocationCode?: Maybe<Scalars["String"]>
  giftCards?: Maybe<Array<Maybe<GiftCardInput>>>
  handling: Scalars["Float"]
  handlingDiscount: Scalars["Float"]
  handlingTax: Scalars["Float"]
  imageUrl?: Maybe<Scalars["String"]>
  isAssemblyRequired?: Maybe<Scalars["Boolean"]>
  isPackagedStandAlone?: Maybe<Scalars["Boolean"]>
  isTaxable?: Maybe<Scalars["Boolean"]>
  itemDiscount: Scalars["Float"]
  itemTax: Scalars["Float"]
  lineId: Scalars["Int"]
  lineItemCost: Scalars["Float"]
  locatorName?: Maybe<Scalars["String"]>
  measurements?: Maybe<CrPackageMeasurementsInput>
  name?: Maybe<Scalars["String"]>
  optionAttributeFQN?: Maybe<Scalars["String"]>
  options?: Maybe<Array<Maybe<CrProductOptionInput>>>
  originalOrderItemId?: Maybe<Scalars["String"]>
  overridePrice?: Maybe<Scalars["Float"]>
  parentId?: Maybe<Scalars["String"]>
  parentItemId?: Maybe<Scalars["String"]>
  productCode?: Maybe<Scalars["String"]>
  quantity: Scalars["Int"]
  readyForPickupQuantity?: Maybe<Scalars["Int"]>
  shipping: Scalars["Float"]
  shippingDiscount: Scalars["Float"]
  shippingTax: Scalars["Float"]
  taxData?: Maybe<Scalars["Object"]>
  taxableHandling: Scalars["Float"]
  taxableLineItemCost: Scalars["Float"]
  taxableShipping: Scalars["Float"]
  unitPrice: Scalars["Float"]
  variationProductCode?: Maybe<Scalars["String"]>
  weightedDutyAdjustment: Scalars["Float"]
  weightedHandlingAdjustment: Scalars["Float"]
  weightedHandlingTaxAdjustment: Scalars["Float"]
  weightedLineItemTaxAdjustment: Scalars["Float"]
  weightedShipmentAdjustment: Scalars["Float"]
  weightedShippingAdjustment: Scalars["Float"]
  weightedShippingTaxAdjustment: Scalars["Float"]
}

export type ShipmentStatusReason = {
  __typename?: "ShipmentStatusReason"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<ShipmentStatusReason>
  moreInfo?: Maybe<Scalars["String"]>
  reasonCode?: Maybe<Scalars["String"]>
}

export type ShipmentStatusReason_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type ShipmentStatusReasonInput = {
  moreInfo?: Maybe<Scalars["String"]>
  reasonCode?: Maybe<Scalars["String"]>
}

export type ShippingAddressInput = {
  addressID: Scalars["Int"]
  addressLine1: Scalars["String"]
  city: Scalars["String"]
  countryCode: Scalars["String"]
  customerID: Scalars["Int"]
  latitude: Scalars["Float"]
  longitude: Scalars["Float"]
  phone: Scalars["String"]
  postalCode: Scalars["String"]
  state: Scalars["String"]
}

export type ShippingDiscount = {
  __typename?: "ShippingDiscount"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<ShippingDiscount>
  discount?: Maybe<CrAppliedDiscount>
  methodCode?: Maybe<Scalars["String"]>
}

export type ShippingDiscount_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type ShippingDiscountInput = {
  discount?: Maybe<CrAppliedDiscountInput>
  methodCode?: Maybe<Scalars["String"]>
}

export type ShippingMethodMappings = {
  __typename?: "ShippingMethodMappings"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<ShippingMethodMappings>
  enableSmartPost?: Maybe<Scalars["Boolean"]>
  express1DayDefault?: Maybe<Scalars["String"]>
  express2DayDefault?: Maybe<Scalars["String"]>
  express3DayDefault?: Maybe<Scalars["String"]>
  internationalUsReturnLabelShippingMethod?: Maybe<Scalars["String"]>
  returnLabelShippingMethod?: Maybe<Scalars["String"]>
  shippingMethods?: Maybe<Array<Scalars["String"]>>
  standardDefault?: Maybe<Scalars["String"]>
}

export type ShippingMethodMappings_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type ShippingOriginContact = {
  __typename?: "ShippingOriginContact"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<ShippingOriginContact>
  companyOrOrganization?: Maybe<Scalars["String"]>
  email?: Maybe<Scalars["String"]>
  firstName?: Maybe<Scalars["String"]>
  lastNameOrSurname?: Maybe<Scalars["String"]>
  middleNameOrInitial?: Maybe<Scalars["String"]>
  phoneNumber?: Maybe<Scalars["String"]>
}

export type ShippingOriginContact_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type ShippingOriginContactInput = {
  companyOrOrganization?: Maybe<Scalars["String"]>
  email?: Maybe<Scalars["String"]>
  firstName?: Maybe<Scalars["String"]>
  lastNameOrSurname?: Maybe<Scalars["String"]>
  middleNameOrInitial?: Maybe<Scalars["String"]>
  phoneNumber?: Maybe<Scalars["String"]>
}

export type ShippingRate = {
  __typename?: "ShippingRate"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<ShippingRate>
  currencyCode?: Maybe<Scalars["String"]>
  data?: Maybe<Scalars["Object"]>
  isValid?: Maybe<Scalars["Boolean"]>
  messages?: Maybe<Array<Scalars["String"]>>
  price?: Maybe<Scalars["Float"]>
  shippingMethodCode?: Maybe<Scalars["String"]>
  shippingMethodName?: Maybe<Scalars["String"]>
  shippingZoneCode?: Maybe<Scalars["String"]>
}

export type ShippingRate_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type ShippingRateInput = {
  currencyCode?: Maybe<Scalars["String"]>
  data?: Maybe<Scalars["Object"]>
  isValid?: Maybe<Scalars["Boolean"]>
  messages?: Maybe<Array<Scalars["String"]>>
  price?: Maybe<Scalars["Float"]>
  shippingMethodCode?: Maybe<Scalars["String"]>
  shippingMethodName?: Maybe<Scalars["String"]>
  shippingZoneCode?: Maybe<Scalars["String"]>
}

export type ShopperNotes = {
  __typename?: "ShopperNotes"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<ShopperNotes>
  comments?: Maybe<Scalars["String"]>
  deliveryInstructions?: Maybe<Scalars["String"]>
  giftMessage?: Maybe<Scalars["String"]>
}

export type ShopperNotes_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type ShopperNotesInput = {
  comments?: Maybe<Scalars["String"]>
  deliveryInstructions?: Maybe<Scalars["String"]>
  giftMessage?: Maybe<Scalars["String"]>
}

export type SolrDebugInfo = {
  __typename?: "SolrDebugInfo"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<SolrDebugInfo>
  blockedProductCodes?: Maybe<Array<Scalars["String"]>>
  boostFunctions?: Maybe<Array<Scalars["String"]>>
  boostQueries?: Maybe<Array<Scalars["String"]>>
  boostedProductCodes?: Maybe<Array<Scalars["String"]>>
  searchTuningRuleCode?: Maybe<Scalars["String"]>
}

export type SolrDebugInfo_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type SplitShipmentsObjectInput = {
  newShipments?: Maybe<Array<Maybe<ShipmentInput>>>
  originalShipment?: Maybe<ShipmentInput>
}

export type SubPayment = {
  __typename?: "SubPayment"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<SubPayment>
  amountCollected: Scalars["Float"]
  amountCredited: Scalars["Float"]
  amountRefunded: Scalars["Float"]
  amountRequested: Scalars["Float"]
  status?: Maybe<Scalars["String"]>
  target?: Maybe<PaymentActionTarget>
}

export type SubPayment_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type SubPaymentInput = {
  amountCollected: Scalars["Float"]
  amountCredited: Scalars["Float"]
  amountRefunded: Scalars["Float"]
  amountRequested: Scalars["Float"]
  status?: Maybe<Scalars["String"]>
  target?: Maybe<PaymentActionTargetInput>
}

export type SuggestedDiscount = {
  __typename?: "SuggestedDiscount"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<SuggestedDiscount>
  autoAdd?: Maybe<Scalars["Boolean"]>
  discountId: Scalars["Int"]
  hasMultipleProducts?: Maybe<Scalars["Boolean"]>
  hasOptions?: Maybe<Scalars["Boolean"]>
  productCode?: Maybe<Scalars["String"]>
}

export type SuggestedDiscount_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type SuggestedDiscountInput = {
  autoAdd?: Maybe<Scalars["Boolean"]>
  discountId: Scalars["Int"]
  hasMultipleProducts?: Maybe<Scalars["Boolean"]>
  hasOptions?: Maybe<Scalars["Boolean"]>
  productCode?: Maybe<Scalars["String"]>
}

export type SuggestionEvent = {
  __typename?: "SuggestionEvent"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<SuggestionEvent>
  causeID: Scalars["Int"]
  errors: Array<Scalars["String"]>
  name: Scalars["String"]
  type?: Maybe<TypeEnum>
}

export type SuggestionEvent_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type SuggestionLog = {
  __typename?: "SuggestionLog"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<SuggestionLog>
  created: Scalars["DateTime"]
  creatorUsername: Scalars["String"]
  environmentID: Scalars["Int"]
  events: Array<Maybe<SuggestionEvent>>
  externalResponseID: Scalars["String"]
  orderID: Scalars["Int"]
  pathString: Scalars["String"]
  persisted?: Maybe<Scalars["Boolean"]>
  siteID: Scalars["Int"]
  suggestionID: Scalars["Int"]
  tenantID: Scalars["Int"]
  updated: Scalars["DateTime"]
  updaterUsername: Scalars["String"]
}

export type SuggestionLog_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type SuggestionRequestInput = {
  bundlingStrategy?: Maybe<BundlingStrategyEnum>
  customData: Scalars["Object"]
  environmentID: Scalars["Int"]
  exclusionListLocationCode: Array<Maybe<ExclusionListEntryLocationCodeInput>>
  externalResponseID: Scalars["String"]
  fraud: Scalars["Int"]
  inventoryRequestType?: Maybe<InventoryRequestTypeEnum>
  isExpress?: Maybe<Scalars["Boolean"]>
  items: Array<Maybe<OrderItemInput>>
  locationCodeWhiteList: Array<Scalars["String"]>
  numShipmentsNotInRequest: Scalars["Int"]
  orderID: Scalars["Int"]
  orderType?: Maybe<OrderTypeEnum>
  pickupLocationCode: Scalars["String"]
  shippingAddress?: Maybe<ShippingAddressInput>
  total: Scalars["Float"]
}

export type SuggestionResponse = {
  __typename?: "SuggestionResponse"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<SuggestionResponse>
  assignmentSuggestions: Scalars["Object"]
  availableLocations: Array<Scalars["Int"]>
  externalResponseID: Scalars["String"]
  responseID: Scalars["Int"]
  stateChangeSuggestions: Scalars["Object"]
  suggestionLog?: Maybe<SuggestionLog>
}

export type SuggestionResponse_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type TargetRule = {
  __typename?: "TargetRule"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<TargetRule>
  code?: Maybe<Scalars["String"]>
  description?: Maybe<Scalars["String"]>
  domain?: Maybe<Scalars["String"]>
  expression?: Maybe<Scalars["String"]>
}

export type TargetRule_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type TargetRuleCollection = {
  __typename?: "TargetRuleCollection"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<TargetRuleCollection>
  items?: Maybe<Array<Maybe<TargetRule>>>
  totalCount: Scalars["Int"]
}

export type TargetRuleCollection_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type TargetRuleInput = {
  code?: Maybe<Scalars["String"]>
  description?: Maybe<Scalars["String"]>
  domain?: Maybe<Scalars["String"]>
  expression?: Maybe<Scalars["String"]>
}

export type TaskInput = {
  __typename?: "TaskInput"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<TaskInput>
  helpMessage?: Maybe<Scalars["String"]>
  label?: Maybe<Scalars["String"]>
  maxLength?: Maybe<Scalars["Int"]>
  maximum: Scalars["Float"]
  minLength?: Maybe<Scalars["Int"]>
  minimum: Scalars["Float"]
  name?: Maybe<Scalars["String"]>
  options?: Maybe<Array<Scalars["Object"]>>
  pattern?: Maybe<Scalars["String"]>
  required?: Maybe<Scalars["Boolean"]>
  type?: Maybe<Scalars["String"]>
}

export type TaskInput_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type TaskInputInput = {
  helpMessage?: Maybe<Scalars["String"]>
  label?: Maybe<Scalars["String"]>
  maxLength?: Maybe<Scalars["Int"]>
  maximum: Scalars["Float"]
  minLength?: Maybe<Scalars["Int"]>
  minimum: Scalars["Float"]
  name?: Maybe<Scalars["String"]>
  options?: Maybe<Array<Scalars["Object"]>>
  pattern?: Maybe<Scalars["String"]>
  required?: Maybe<Scalars["Boolean"]>
  type?: Maybe<Scalars["String"]>
}

export type ThresholdMessage = {
  __typename?: "ThresholdMessage"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<ThresholdMessage>
  discountId: Scalars["Int"]
  message?: Maybe<Scalars["String"]>
  requiresCouponCode?: Maybe<Scalars["Boolean"]>
  showInCart?: Maybe<Scalars["Boolean"]>
  showOnCheckout?: Maybe<Scalars["Boolean"]>
  thresholdValue: Scalars["Float"]
}

export type ThresholdMessage_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type ThresholdMessageInput = {
  discountId: Scalars["Int"]
  message?: Maybe<Scalars["String"]>
  requiresCouponCode?: Maybe<Scalars["Boolean"]>
  showInCart?: Maybe<Scalars["Boolean"]>
  showOnCheckout?: Maybe<Scalars["Boolean"]>
  thresholdValue: Scalars["Float"]
}

export type Tracking = {
  __typename?: "Tracking"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<Tracking>
  attributes?: Maybe<Scalars["Object"]>
  number?: Maybe<Scalars["String"]>
  url?: Maybe<Scalars["String"]>
}

export type Tracking_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type TrackingInput = {
  attributes?: Maybe<Scalars["Object"]>
  number?: Maybe<Scalars["String"]>
  url?: Maybe<Scalars["String"]>
}

export type Transaction = {
  __typename?: "Transaction"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<Transaction>
  amount: Scalars["Float"]
  currencyCode?: Maybe<Scalars["String"]>
  date: Scalars["DateTime"]
  interactionType?: Maybe<Scalars["String"]>
  transactionId?: Maybe<Scalars["String"]>
  transactionType?: Maybe<Scalars["String"]>
  visitId?: Maybe<Scalars["String"]>
}

export type Transaction_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type TransactionInput = {
  amount: Scalars["Float"]
  currencyCode?: Maybe<Scalars["String"]>
  date: Scalars["DateTime"]
  interactionType?: Maybe<Scalars["String"]>
  transactionId?: Maybe<Scalars["String"]>
  transactionType?: Maybe<Scalars["String"]>
  visitId?: Maybe<Scalars["String"]>
}

export enum TypeEnum {
  AfterAction = "AFTER_ACTION",
  AfterActionSort = "AFTER_ACTION_SORT",
  AutoAssignLimitExceeded = "AUTO_ASSIGN_LIMIT_EXCEEDED",
  DefaultResponse = "DEFAULT_RESPONSE",
  Filter = "FILTER",
  FoundFullOrderLocation = "FOUND_FULL_ORDER_LOCATION",
  Group = "GROUP",
  GroupFilter = "GROUP_FILTER",
  GroupSort = "GROUP_SORT",
  InventoryRequest = "INVENTORY_REQUEST",
  MakeLocationsAvailable = "MAKE_LOCATIONS_AVAILABLE",
  MaxSplitsExceeded = "MAX_SPLITS_EXCEEDED",
  NewRequest = "NEW_REQUEST",
  NoRouteFound = "NO_ROUTE_FOUND",
  RemovedInactiveLocations = "REMOVED_INACTIVE_LOCATIONS",
  RemovedInternationalLocations = "REMOVED_INTERNATIONAL_LOCATIONS",
  RemovedOnHoldLocations = "REMOVED_ON_HOLD_LOCATIONS",
  RemovedOverfulfilledLocations = "REMOVED_OVERFULFILLED_LOCATIONS",
  Response = "RESPONSE",
  RouteSelected = "ROUTE_SELECTED",
  Sort = "SORT",
}

export type UserRole = {
  __typename?: "UserRole"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<UserRole>
  assignedInScope?: Maybe<UserScope>
  auditInfo?: Maybe<CuAuditInfo>
  roleId: Scalars["Int"]
  roleName?: Maybe<Scalars["String"]>
  roleTags?: Maybe<Array<Scalars["String"]>>
  userId?: Maybe<Scalars["String"]>
}

export type UserRole_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type UserRoleCollection = {
  __typename?: "UserRoleCollection"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<UserRoleCollection>
  items?: Maybe<Array<Maybe<UserRole>>>
  totalCount: Scalars["Int"]
}

export type UserRoleCollection_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type UserRoleInput = {
  assignedInScope?: Maybe<UserScopeInput>
  auditInfo?: Maybe<CuAuditInfoInput>
  roleId: Scalars["Int"]
  roleName?: Maybe<Scalars["String"]>
  roleTags?: Maybe<Array<Scalars["String"]>>
  userId?: Maybe<Scalars["String"]>
}

export type UserScope = {
  __typename?: "UserScope"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<UserScope>
  id?: Maybe<Scalars["Int"]>
  name?: Maybe<Scalars["String"]>
  type?: Maybe<Scalars["String"]>
}

export type UserScope_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type UserScopeInput = {
  id?: Maybe<Scalars["Int"]>
  name?: Maybe<Scalars["String"]>
  type?: Maybe<Scalars["String"]>
}

export type ValidationMessage = {
  __typename?: "ValidationMessage"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<ValidationMessage>
  message?: Maybe<Scalars["String"]>
  severity?: Maybe<Scalars["String"]>
  source?: Maybe<Scalars["String"]>
  sourceId?: Maybe<Scalars["String"]>
  validationType?: Maybe<Scalars["String"]>
}

export type ValidationMessage_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type VariationOption = {
  __typename?: "VariationOption"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<VariationOption>
  attributeFQN?: Maybe<Scalars["String"]>
  value?: Maybe<Scalars["Object"]>
  valueSequence: Scalars["Int"]
}

export type VariationOption_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type VariationSummary = {
  __typename?: "VariationSummary"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<VariationSummary>
  inventoryInfo?: Maybe<ProductInventoryInfo>
  options?: Maybe<Array<Maybe<VariationOption>>>
  productCode?: Maybe<Scalars["String"]>
}

export type VariationSummary_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type View = {
  __typename?: "View"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<View>
  fields?: Maybe<Array<Maybe<ViewField>>>
  filter?: Maybe<Scalars["String"]>
  includeInactiveMode?: Maybe<Scalars["String"]>
  isAdminDefault?: Maybe<Scalars["Boolean"]>
  isVisibleInStorefront?: Maybe<Scalars["Boolean"]>
  metadata?: Maybe<Scalars["Object"]>
  name?: Maybe<Scalars["String"]>
  usages?: Maybe<Array<Scalars["String"]>>
}

export type View_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type ViewField = {
  __typename?: "ViewField"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<ViewField>
  name?: Maybe<Scalars["String"]>
  target?: Maybe<Scalars["String"]>
}

export type ViewField_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type ViewFieldInput = {
  name?: Maybe<Scalars["String"]>
  target?: Maybe<Scalars["String"]>
}

export type ViewInput = {
  fields?: Maybe<Array<Maybe<ViewFieldInput>>>
  filter?: Maybe<Scalars["String"]>
  includeInactiveMode?: Maybe<Scalars["String"]>
  isAdminDefault?: Maybe<Scalars["Boolean"]>
  isVisibleInStorefront?: Maybe<Scalars["Boolean"]>
  metadata?: Maybe<Scalars["Object"]>
  name?: Maybe<Scalars["String"]>
  usages?: Maybe<Array<Scalars["String"]>>
}

export type Wishlist = {
  __typename?: "Wishlist"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<Wishlist>
  auditInfo?: Maybe<CrAuditInfo>
  changeMessages?: Maybe<Array<Maybe<ChangeMessage>>>
  channelCode?: Maybe<Scalars["String"]>
  currencyCode?: Maybe<Scalars["String"]>
  customerAccountId?: Maybe<Scalars["Int"]>
  customerInteractionType?: Maybe<Scalars["String"]>
  data?: Maybe<Scalars["Object"]>
  discountThresholdMessages?: Maybe<Array<Maybe<ThresholdMessage>>>
  discountTotal?: Maybe<Scalars["Float"]>
  discountedSubtotal?: Maybe<Scalars["Float"]>
  discountedTotal?: Maybe<Scalars["Float"]>
  expirationDate?: Maybe<Scalars["DateTime"]>
  extendedProperties?: Maybe<Array<Maybe<ExtendedProperty>>>
  externalId?: Maybe<Scalars["String"]>
  feeTotal?: Maybe<Scalars["Float"]>
  fulfillmentInfo?: Maybe<FulfillmentInfo>
  handlingTaxTotal?: Maybe<Scalars["Float"]>
  id?: Maybe<Scalars["String"]>
  importDate?: Maybe<Scalars["DateTime"]>
  isImport?: Maybe<Scalars["Boolean"]>
  itemTaxTotal?: Maybe<Scalars["Float"]>
  items?: Maybe<Array<Maybe<WishlistItem>>>
  lastValidationDate?: Maybe<Scalars["DateTime"]>
  lineItemSubtotalWithOrderAdjustments?: Maybe<Scalars["Float"]>
  name?: Maybe<Scalars["String"]>
  orderDiscounts?: Maybe<Array<Maybe<CrAppliedDiscount>>>
  privacyType?: Maybe<Scalars["String"]>
  rejectedDiscounts?: Maybe<Array<Maybe<SuggestedDiscount>>>
  shippingAmountBeforeDiscountsAndAdjustments?: Maybe<Scalars["Float"]>
  shippingSubTotal?: Maybe<Scalars["Float"]>
  shippingTaxTotal?: Maybe<Scalars["Float"]>
  shippingTotal?: Maybe<Scalars["Float"]>
  siteId?: Maybe<Scalars["Int"]>
  sortOrder?: Maybe<Scalars["Int"]>
  subtotal?: Maybe<Scalars["Float"]>
  suggestedDiscounts?: Maybe<Array<Maybe<SuggestedDiscount>>>
  taxData?: Maybe<Scalars["Object"]>
  taxTotal?: Maybe<Scalars["Float"]>
  tenantId?: Maybe<Scalars["Int"]>
  total?: Maybe<Scalars["Float"]>
  typeTag?: Maybe<Scalars["String"]>
  userId?: Maybe<Scalars["String"]>
  version?: Maybe<Scalars["String"]>
  visitId?: Maybe<Scalars["String"]>
  webSessionId?: Maybe<Scalars["String"]>
}

export type Wishlist_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type WishlistCollection = {
  __typename?: "WishlistCollection"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<WishlistCollection>
  items?: Maybe<Array<Maybe<Wishlist>>>
  pageCount: Scalars["Int"]
  pageSize: Scalars["Int"]
  startIndex: Scalars["Int"]
  totalCount: Scalars["Int"]
}

export type WishlistCollection_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type WishlistInput = {
  auditInfo?: Maybe<CrAuditInfoInput>
  changeMessages?: Maybe<Array<Maybe<ChangeMessageInput>>>
  channelCode?: Maybe<Scalars["String"]>
  currencyCode?: Maybe<Scalars["String"]>
  customerAccountId?: Maybe<Scalars["Int"]>
  customerInteractionType?: Maybe<Scalars["String"]>
  data?: Maybe<Scalars["Object"]>
  discountThresholdMessages?: Maybe<Array<Maybe<ThresholdMessageInput>>>
  discountTotal?: Maybe<Scalars["Float"]>
  discountedSubtotal?: Maybe<Scalars["Float"]>
  discountedTotal?: Maybe<Scalars["Float"]>
  expirationDate?: Maybe<Scalars["DateTime"]>
  extendedProperties?: Maybe<Array<Maybe<ExtendedPropertyInput>>>
  externalId?: Maybe<Scalars["String"]>
  feeTotal?: Maybe<Scalars["Float"]>
  fulfillmentInfo?: Maybe<FulfillmentInfoInput>
  handlingTaxTotal?: Maybe<Scalars["Float"]>
  id?: Maybe<Scalars["String"]>
  importDate?: Maybe<Scalars["DateTime"]>
  isImport?: Maybe<Scalars["Boolean"]>
  itemTaxTotal?: Maybe<Scalars["Float"]>
  items?: Maybe<Array<Maybe<WishlistItemInput>>>
  lastValidationDate?: Maybe<Scalars["DateTime"]>
  lineItemSubtotalWithOrderAdjustments?: Maybe<Scalars["Float"]>
  name?: Maybe<Scalars["String"]>
  orderDiscounts?: Maybe<Array<Maybe<CrAppliedDiscountInput>>>
  privacyType?: Maybe<Scalars["String"]>
  rejectedDiscounts?: Maybe<Array<Maybe<SuggestedDiscountInput>>>
  shippingAmountBeforeDiscountsAndAdjustments?: Maybe<Scalars["Float"]>
  shippingSubTotal?: Maybe<Scalars["Float"]>
  shippingTaxTotal?: Maybe<Scalars["Float"]>
  shippingTotal?: Maybe<Scalars["Float"]>
  siteId?: Maybe<Scalars["Int"]>
  sortOrder?: Maybe<Scalars["Int"]>
  subtotal?: Maybe<Scalars["Float"]>
  suggestedDiscounts?: Maybe<Array<Maybe<SuggestedDiscountInput>>>
  taxData?: Maybe<Scalars["Object"]>
  taxTotal?: Maybe<Scalars["Float"]>
  tenantId?: Maybe<Scalars["Int"]>
  total?: Maybe<Scalars["Float"]>
  typeTag?: Maybe<Scalars["String"]>
  userId?: Maybe<Scalars["String"]>
  version?: Maybe<Scalars["String"]>
  visitId?: Maybe<Scalars["String"]>
  webSessionId?: Maybe<Scalars["String"]>
}

export type WishlistItem = {
  __typename?: "WishlistItem"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<WishlistItem>
  adjustedLineItemSubtotal?: Maybe<Scalars["Float"]>
  auditInfo?: Maybe<CrAuditInfo>
  autoAddDiscountId?: Maybe<Scalars["Int"]>
  childItemIds?: Maybe<Array<Scalars["String"]>>
  comments?: Maybe<Scalars["String"]>
  data?: Maybe<Scalars["Object"]>
  discountTotal?: Maybe<Scalars["Float"]>
  discountedTotal?: Maybe<Scalars["Float"]>
  extendedTotal?: Maybe<Scalars["Float"]>
  feeTotal?: Maybe<Scalars["Float"]>
  handlingAmount?: Maybe<Scalars["Float"]>
  id?: Maybe<Scalars["String"]>
  isAssemblyRequired?: Maybe<Scalars["Boolean"]>
  isRecurring?: Maybe<Scalars["Boolean"]>
  isTaxable?: Maybe<Scalars["Boolean"]>
  itemTaxTotal?: Maybe<Scalars["Float"]>
  lineId?: Maybe<Scalars["Int"]>
  localeCode?: Maybe<Scalars["String"]>
  parentItemId?: Maybe<Scalars["String"]>
  priorityType?: Maybe<Scalars["String"]>
  product?: Maybe<CrProduct>
  productDiscount?: Maybe<AppliedLineItemProductDiscount>
  productDiscounts?: Maybe<Array<Maybe<AppliedLineItemProductDiscount>>>
  purchasableStatusType?: Maybe<Scalars["String"]>
  purchaseLocation?: Maybe<Scalars["String"]>
  quantity: Scalars["Int"]
  shippingAmountBeforeDiscountsAndAdjustments?: Maybe<Scalars["Float"]>
  shippingDiscounts?: Maybe<Array<Maybe<AppliedLineItemShippingDiscount>>>
  shippingTaxTotal?: Maybe<Scalars["Float"]>
  shippingTotal?: Maybe<Scalars["Float"]>
  subtotal?: Maybe<Scalars["Float"]>
  taxData?: Maybe<Scalars["Object"]>
  taxableTotal?: Maybe<Scalars["Float"]>
  total?: Maybe<Scalars["Float"]>
  totalWithWeightedShippingAndHandling?: Maybe<Scalars["Float"]>
  totalWithoutWeightedShippingAndHandling?: Maybe<Scalars["Float"]>
  unitPrice?: Maybe<CommerceUnitPrice>
  weightedOrderAdjustment?: Maybe<Scalars["Float"]>
  weightedOrderDiscount?: Maybe<Scalars["Float"]>
  weightedOrderDuty?: Maybe<Scalars["Float"]>
  weightedOrderHandlingAdjustment?: Maybe<Scalars["Float"]>
  weightedOrderHandlingFee?: Maybe<Scalars["Float"]>
  weightedOrderHandlingFeeDiscount?: Maybe<Scalars["Float"]>
  weightedOrderHandlingFeeTax?: Maybe<Scalars["Float"]>
  weightedOrderShipping?: Maybe<Scalars["Float"]>
  weightedOrderShippingDiscount?: Maybe<Scalars["Float"]>
  weightedOrderShippingManualAdjustment?: Maybe<Scalars["Float"]>
  weightedOrderShippingTax?: Maybe<Scalars["Float"]>
  weightedOrderTax?: Maybe<Scalars["Float"]>
}

export type WishlistItem_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type WishlistItemCollection = {
  __typename?: "WishlistItemCollection"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<WishlistItemCollection>
  items?: Maybe<Array<Maybe<WishlistItem>>>
  pageCount: Scalars["Int"]
  pageSize: Scalars["Int"]
  startIndex: Scalars["Int"]
  totalCount: Scalars["Int"]
}

export type WishlistItemCollection_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type WishlistItemInput = {
  adjustedLineItemSubtotal?: Maybe<Scalars["Float"]>
  auditInfo?: Maybe<CrAuditInfoInput>
  autoAddDiscountId?: Maybe<Scalars["Int"]>
  childItemIds?: Maybe<Array<Scalars["String"]>>
  comments?: Maybe<Scalars["String"]>
  data?: Maybe<Scalars["Object"]>
  discountTotal?: Maybe<Scalars["Float"]>
  discountedTotal?: Maybe<Scalars["Float"]>
  extendedTotal?: Maybe<Scalars["Float"]>
  feeTotal?: Maybe<Scalars["Float"]>
  handlingAmount?: Maybe<Scalars["Float"]>
  id?: Maybe<Scalars["String"]>
  isAssemblyRequired?: Maybe<Scalars["Boolean"]>
  isRecurring?: Maybe<Scalars["Boolean"]>
  isTaxable?: Maybe<Scalars["Boolean"]>
  itemTaxTotal?: Maybe<Scalars["Float"]>
  lineId?: Maybe<Scalars["Int"]>
  localeCode?: Maybe<Scalars["String"]>
  parentItemId?: Maybe<Scalars["String"]>
  priorityType?: Maybe<Scalars["String"]>
  product?: Maybe<CrProductInput>
  productDiscount?: Maybe<AppliedLineItemProductDiscountInput>
  productDiscounts?: Maybe<Array<Maybe<AppliedLineItemProductDiscountInput>>>
  purchasableStatusType?: Maybe<Scalars["String"]>
  purchaseLocation?: Maybe<Scalars["String"]>
  quantity: Scalars["Int"]
  shippingAmountBeforeDiscountsAndAdjustments?: Maybe<Scalars["Float"]>
  shippingDiscounts?: Maybe<Array<Maybe<AppliedLineItemShippingDiscountInput>>>
  shippingTaxTotal?: Maybe<Scalars["Float"]>
  shippingTotal?: Maybe<Scalars["Float"]>
  subtotal?: Maybe<Scalars["Float"]>
  taxData?: Maybe<Scalars["Object"]>
  taxableTotal?: Maybe<Scalars["Float"]>
  total?: Maybe<Scalars["Float"]>
  totalWithWeightedShippingAndHandling?: Maybe<Scalars["Float"]>
  totalWithoutWeightedShippingAndHandling?: Maybe<Scalars["Float"]>
  unitPrice?: Maybe<CommerceUnitPriceInput>
  weightedOrderAdjustment?: Maybe<Scalars["Float"]>
  weightedOrderDiscount?: Maybe<Scalars["Float"]>
  weightedOrderDuty?: Maybe<Scalars["Float"]>
  weightedOrderHandlingAdjustment?: Maybe<Scalars["Float"]>
  weightedOrderHandlingFee?: Maybe<Scalars["Float"]>
  weightedOrderHandlingFeeDiscount?: Maybe<Scalars["Float"]>
  weightedOrderHandlingFeeTax?: Maybe<Scalars["Float"]>
  weightedOrderShipping?: Maybe<Scalars["Float"]>
  weightedOrderShippingDiscount?: Maybe<Scalars["Float"]>
  weightedOrderShippingManualAdjustment?: Maybe<Scalars["Float"]>
  weightedOrderShippingTax?: Maybe<Scalars["Float"]>
  weightedOrderTax?: Maybe<Scalars["Float"]>
}

export type WorkflowState = {
  __typename?: "WorkflowState"
  _get?: Maybe<Scalars["AnyScalar"]>
  _root?: Maybe<WorkflowState>
  attributes?: Maybe<Scalars["Object"]>
  auditInfo?: Maybe<CrAuditInfo>
  completedDate?: Maybe<Scalars["DateTime"]>
  processInstanceId?: Maybe<Scalars["String"]>
  shipmentState?: Maybe<Scalars["String"]>
  taskList?: Maybe<Array<Maybe<FulfillmentTask>>>
}

export type WorkflowState_GetArgs = {
  allowUndefined?: Maybe<Scalars["Boolean"]>
  defaultValue?: Maybe<Scalars["AnyScalar"]>
  path: Scalars["String"]
}

export type WorkflowStateInput = {
  attributes?: Maybe<Scalars["Object"]>
  auditInfo?: Maybe<CrAuditInfoInput>
  completedDate?: Maybe<Scalars["DateTime"]>
  processInstanceId?: Maybe<Scalars["String"]>
  shipmentState?: Maybe<Scalars["String"]>
  taskList?: Maybe<Array<Maybe<FulfillmentTaskInput>>>
}
