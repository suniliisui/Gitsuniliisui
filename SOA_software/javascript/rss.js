function getEntityReference(rssItem, objtype) {
	var entityRefs = null;
	if (rssItem.EntityReferences && rssItem.EntityReferences != null) {
		var entityReferences = rssItem.EntityReferences;
		if (entityReferences.EntityReference && entityReferences.EntityReference != null) {
			entityRefs = entityReferences.EntityReference;
		}
	}
	var entityElement, entityRef, cats, cat;

	if (entityRefs != null) {
		for (entityElement in entityRefs) {
			entityRef = entityRefs[entityElement];
			if (entityRef.Category && entityRef.Category != null) {
				cats = entityRef.Category;
				for (cat in cats) {
					if (cats[cat].domain == 'uddi:soa.com:resourcetype' && cats[cat].value == objtype) {
						return entityRef;
					}
				}
			}
		}
	}
	//not found above. try EntityReference now
	entityRefs = null;
	if (rssItem.EntityReference) {
		if (rssItem.EntityReference.length) {
			entityRefs = rssItem.EntityReference;
		} else {
			entityRefs = [rssItem.EntityReference];
		}
	}
	if (entityRefs != null) {
		for (entityElement in entityRefs) {
			entityRef = entityRefs[entityElement];
			if (entityRef.Category && entityRef.Category != null) {
				cats = entityRef.Category;
				for (cat in cats) {
					if (cats[cat].domain == 'uddi:soa.com:resourcetype' && cats[cat].value == objtype) {
						return entityRef;
					}
				}
			}
		}
	}
	return null;
}

function isAPIAccessWithPrivateAPI(rssItem) {
	var apiVersionEntityRef = getEntityReference(rssItem, 'apiversion');
	if (apiVersionEntityRef.Category != null && apiVersionEntityRef.Category) {
		for (cat in apiVersionEntityRef.Category) {
			var domainCat = apiVersionEntityRef.Category[cat];
			if (domainCat.domain == 'uddi:soa.com:visibility') {
				if (domainCat.value == 'Limited') {
					return true;
				}
			}
		}
	}

	return false;

}

function isFollowingHasAccessWithPrivateAPI(rssItem) {
	var followedEntityRef = getEntityReference(rssItem, 'followed');
	if (followedEntityRef && followedEntityRef.Category != null && followedEntityRef.Category) {
		for (cat in followedEntityRef.Category) {
			var domainCat = followedEntityRef.Category[cat];
			if (domainCat.domain == 'uddi:soa.com:visibility') {
				if (domainCat.value == 'Limited') {
					return true;
				}
			}
		}
	}

	return false;

}

function isItemAccessLimited(rssItem) {
	if (rssItem.category != null && rssItem.category) {
		for (cat in rssItem.category) {
			var domainCat = rssItem.category[cat];
			if (domainCat.domain == 'uddi:soa.com:visibility') {
				if (domainCat.value == 'Limited') {
					return true;
				}
			}
		}
	}

	return false;
}

function isDiscussionItemClosed(rssItem) {
	itemCat = rssItem.category;
	if (itemCat) {
		for (cat in itemCat) {
			var domainCat = itemCat[cat];
			if (domainCat.domain == 'uddi:soa.com:state') {
				if (domainCat.value == 'com.soa.board.item.closed') {
					return true;
				}
			}
		}
	}

	return false;

}

function getReferenceContractDN(rssItem) {
	var contractEntityRef = getEntityReference(rssItem, 'contract');
	if (contractEntityRef != null) {
		return contractEntityRef.Guid;
	}
	return null;
}

function getReferenceApiDN(rssItem) {
	var apiEntityRef = getEntityReference(rssItem, 'api');
	if (apiEntityRef != null) {
		return apiEntityRef.Guid;
	}
	return null;
}

function getReferenceApiName(rssItem) {
	var apiEntityRef = getEntityReference(rssItem, 'api');
	if (apiEntityRef != null) {
		return apiEntityRef.Title;
	}
	return null;
}

function getReferenceAPIVersionDN(rssItem) {
	var apiVersionEntityRef = getEntityReference(rssItem, 'apiversion');
	if (apiVersionEntityRef != null) {
		return apiVersionEntityRef.Guid;
	}
	return null;
}

function getReferenceAPIVersionName(rssItem) {
	var apiVersionEntityRef = getEntityReference(rssItem, 'apiversion');
	if (apiVersionEntityRef != null) {
		return apiVersionEntityRef.Title;
	}
	return null;
}

function getReferenceAppDN(rssItem) {
	var appEntityRef = getEntityReference(rssItem, 'app');
	if (appEntityRef != null) {
		return appEntityRef.Guid;
	}
	return null;
}

function getReferenceAPPVersionDN(rssItem) {
	var appVersionEntityRef = getEntityReference(rssItem, 'app-version');
	if (appVersionEntityRef != null) {
		return appVersionEntityRef.Guid;
	}
	return null;
}

function getReferenceAPIVersionNo(rssItem) {
	var apiVersionEntityRef = getEntityReference(rssItem, 'apiversion');
	if (apiVersionEntityRef != null) {
		return apiVersionEntityRef.Title;
	}
	return null;
}

function getReferenceAppName(rssItem) {
	var appEntityRef = getEntityReference(rssItem, 'app');
	if (appEntityRef != null) {
		return appEntityRef.Title;
	}
	return null;
}

function getReferenceAppVersionNo(rssItem) {
	var appVersionEntityRef = getEntityReference(rssItem, 'app-version');
	if (appVersionEntityRef != null) {
		return appVersionEntityRef.Title;
	}
	return null;
}

function getReferenceAppVersionDN(rssItem) {
	var appVersionEntityRef = getEntityReference(rssItem, 'app-version');
	if (appVersionEntityRef != null) {
		return appVersionEntityRef.Guid;
	}
	return null;
}

function getReferenceUserDN(rssItem) {
	var apiEntityRef = getEntityReference(rssItem, 'user');
	if (apiEntityRef != null) {
		return apiEntityRef.Guid;
	}
	return null;
}

function getReferenceFollowedResourceDN(rssItem) {
	var apiEntityRef = getEntityReference(rssItem, 'followed');
	if (apiEntityRef != null) {
		return apiEntityRef.Guid;
	}
	return null;
}

function getAppContractEnvironment(rssItem) {
	return getApiContractEnvironment(rssItem);
}

function getApiContractEnvironment(rssItem) {
	if (!rssItem.category) {
		return null;
	} else if (!rssItem.category.length && rssItem.category.domain == 'uddi:soa.com:environment') {
		return rssItem.category.value;
	} else if (rssItem.category.length) {
		for (var i = 0; i < rssItem.category.length; i++) {
			if (rssItem.category[i].domain == 'uddi:soa.com:environment') {
				return rssItem.category[i].value;
			}
		}
	}
	return null;
}

function getCategory(rssItem, domainType) {
	if (rssItem.category != null && rssItem.category) {
		for (var cat in rssItem.category) {
			var domainCat = rssItem.category[cat];
			if (domainCat.domain == domainType) {
				return domainCat;
			}
		}
	}
	return null;
}

function getCategoryValue(rssItem, domainType) {
	var category = getCategory(rssItem, domainType);
	if (category != null) {
		return category.value;
	}
	return '';
}

function getResourceTypeCategoryValue(rssItem) {
	var category = getCategory(rssItem, 'uddi:soa.com:resourcetype');
	if (category != null) {
		return category.value;
	}
	return '';
}

function getWfTypeCategoryValue(rssItem) {
	var category = getCategory(rssItem, 'uddi:soa.com:wfstate');
	if (category != null) {
		return category.value;
	}
	return null;
}

function getTicketPriorityTypeCategoryValue(rssItem) {
	var category = getCategory(rssItem, 'uddi:soa.com:ticketlabel');
	if (category != null) {
		return category.value;
	}
	return null;
}

function getDocpathCategoryValue(rssItem) {
	var category = getCategory(rssItem, 'uddi:soa.com:docpath');
	if (category != null) {
		return category.value;
	}
	return null;
}

function getWorkflowState(rssItem) {
	return getWfTypeCategoryValue(rssItem);
}

function getImageByTitle(rssItem, title) {
	for (var im in rssItem.Image) {
		if (rssItem.Image[im].Title === title) {
			return rssItem.Image[im];
		}
	}
	return null;
}

function getEndpointByCategory(rssItem, category) {
	var i;
	if(rssItem && rssItem.Endpoints && rssItem.Endpoints.Endpoint && rssItem.Endpoints.Endpoint.length){
		for ( i = 0; i < rssItem.Endpoints.Endpoint.length; i++) {
			if (rssItem.Endpoints.Endpoint[i].Category === category) {
				return rssItem.Endpoints.Endpoint[i];
			}
		}
	}
	return null;
}
function checkEndpointByCategory(rssItem, category) {
	return !!getEndpointByCategory(rssItem, category);
}
function hasSandboxEndpoint(rssItem) {
	return checkEndpointByCategory(rssItem, "Sandbox");
}
function hasProductionEndpoint(rssItem) {
	return checkEndpointByCategory(rssItem, "Production");
}
function getSandboxEndpoint(rssItem) {
	return getEndpointByCategory(rssItem, "Sandbox");
}
function getProductionEndpoint(rssItem) {
	return getEndpointByCategory(rssItem, "Production");
}
