// security domain types metadata
SecurityDomainTypesMetadata.LIST_VIEW_URL = "/system/securitydomains";
function SecurityDomainTypesMetadata() {
    this.domainTypesMetadata = [];
}
SecurityDomainTypesMetadata.prototype = {
	registerDomainType :function(domainTypeMetadata){
		this.domainTypesMetadata[domainTypeMetadata.domainType] = domainTypeMetadata;
	},
	getSecurityDomainTypes:function() {
		var domainTypes = [],i=0;
		for (var domainKey in this.domainTypesMetadata) {
			domainTypes.push(this.domainTypesMetadata[domainKey].domainType);
		}
		return domainTypes;
	},
	getViewHash:function(domainType) {
		if (this.domainTypesMetadata[domainType] == null) {
			soaAlert("Alert","Domain Type [" + domainType + "] not registered");
			return null;
		}
		return this.domainTypesMetadata[domainType].viewHash;
	},
	getEditViewHash:function(domainType,name){
		if (this.domainTypesMetadata[domainType] == null) {
			soaAlert("Alert","Domain Type [" + domainType + "] not registered");
			return null;
		}
		return this.domainTypesMetadata[domainType].editHash.replace("<name>",name);
	}
	
};
 
function SecurityDomainType(domainType, viewHash,editHash) {
	this.domainType = domainType;
	this.viewHash = viewHash;
	this.editHash = editHash;
}
 
var securityDomainTypes = new SecurityDomainTypesMetadata();