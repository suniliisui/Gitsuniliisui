/*globals $ jQuery registerWidgetObject wizard atmometadata FDN login updateView*/
/**
 *  SOA Software, Inc. Copyright (C) 2000-2011, All rights reserved
 *
 *  This  software is the confidential and proprietary information of SOA Software, Inc.
 *  and is subject to copyright protection under laws of the United States of America and
 *  other countries. The  use of this software should be in accordance with the license
 *  agreement terms you entered into with SOA Software, Inc.
 */

var submitForm = "connectionWidgetForm";
var submitURL = "/api/contracts";

/**
 * Declare the widget.
 */
var addModifyConnectionWidget = {};

addModifyConnectionWidget.name = 'widget.api.addmodifyconnection';

addModifyConnectionWidget.createWidgetInstance = function(instanceName) {
	var widgetInstance = {};
	widgetInstance.widgetObject = this;
	widgetInstance.widgetInstanceName = instanceName;
	if (this.template === undefined) {
		this.template = jQuery.template(null, $("#AddModifyConnectionTemplate"));
	}
	widgetInstance.widgetInstanceTemplate = this.template;
	
	widgetInstance.hasPolicies = false;
	widgetInstance.hasLegals = false;

	widgetInstance.draw = function(viewObj, childWidgetInstances, layoutWidgetInstanceDOMObj) {
		layoutWidgetInstanceDOMObj.empty();
		widgetInstance.el = layoutWidgetInstanceDOMObj;
		policies = new Policies({
			'policyType' : 'Service Level Policy'
		});
		policies.fetch({
			success : function(policies) {
				widgetInstance.renderWizard(viewObj, policies);
			}
		});
		
	};

	widgetInstance.renderWizard = function(viewObj, policies) {
		try {
			widgetInstance.data = widgetInstance.dataFetcher(viewObj, policies);
			var wizardTitles = [ 'Select App', 'Endpoint' ];
			if (policies.length > 0) {
				wizardTitles.push('Policies');
				widgetInstance.hasPolicies = true;
			}
			if (widgetInstance.data.legalData.length !== 0) {
				wizardTitles.push('Legal Agreements');
				widgetInstance.hasLegals = true;
			}
	
			this.addApiWizard = new wizard({
				name : 'API Access',
				titles : wizardTitles,
				parent : widgetInstance.el,
				template : widgetInstance.widgetInstanceTemplate,
				handler : widgetInstance.submitHandler,
				cancelText : 'Cancel API Access Wizard?',
				cancelCallback : function() {
					updateView("api", widgetInstance.el.find('input#apiId').val(), "details");
					return false;
				}
			}, widgetInstance);
	
			widgetInstance.bindEvents();
			widgetInstance.setSortEvent();
			widgetInstance.setTableRowsBG();
			widgetInstance.bindLegalEvents();
		} catch (e) {
			logger.error(e);
		}
	};

	widgetInstance.isUnderContract = function(appVersionId, appContracts) {
		for ( var x in appContracts.models) {
			if (appContracts.at(x).get('AppVersionID') === appVersionId && appContracts.at(x).get('APIVersionID') === currentView.objectVersionId) {
				return true;
			}
		}
		return false;
	};

	widgetInstance.bindEvents = function() {
		widgetInstance.el.find(".versionSelector").change(function(event) {
			// If the new app version has a contract with the API, then mark it
			var index = $(this).attr("id").split('_')[1];
			var appVersionId = $(this).val();
			widgetInstance.el.find("#appGuid_" + index).val(appVersionId);
			// Get all the contracts for an APP
			// create our Api object
			var app = new App({
				versionID : appVersionId
			});
			var contracts = new AppContracts({
				resource : app
			});
			contracts.fetch({
				success : function(appContracts) {
					if (widgetInstance.isUnderContract(appVersionId, appContracts)) {
						widgetInstance.el.find("#appContracted_" + index).show();
						widgetInstance.el.find("#appNotContracted_" + index).hide();
					} else {
						widgetInstance.el.find("#appContracted_" + index).hide();
						widgetInstance.el.find("#appNotContracted_" + index).show();
					}
				}
			});
		});
		widgetInstance.el.find(".versionSelector").trigger('change');

		widgetInstance.el.find("input:radio[name=appGuid]").change(function(event) {
			var appid = $(event.currentTarget).val();
			// check the policy attachments

		});

		// soa select
		widgetInstance.el.find('#connectionWidgetForm').find('SELECT').each(function() {
			soaSelect(document.getElementById($(this).attr('id')));
		});
	};

	widgetInstance.setSortEvent = function() {
		// Event for table sorting
		widgetInstance.el.find('span.sort').click(function(event) {
			// Get the table ID
			var tableId = $(this).closest('table').attr('id');
			var $table = widgetInstance.el.find('#' + tableId);

			// Get the name of the column
			var columnName = $(this).closest('th').text();

			// Get the header row for the table
			var $headerRow = $(this).closest('tr');

			// Get the data rows for the table
			var $dataRow = $($headerRow).nextAll('tr');
			var $rows = $($dataRow, $table);

			// Get the current click sort icon object
			var $sortIcon = this;

			// variable declaration to sort the selected data row ascendingly
			var sortAsc = function(columnIndex) {
				// Removes the exisitng 'desc' class and adds the 'asc' class
				$($sortIcon).removeClass('desc');
				$($sortIcon).addClass('asc');

				// returns function for sort function parameter
				return function(a, b) {
					// Get the data in the selected column and converts character to uppercase
					var keyA = $('td:eq(0)', a).text().toUpperCase();
					var keyB = $('td:eq(0)', b).text().toUpperCase();

					// If the column is a date type, get the data without changing it to uppercase and remove any unnecessary whitespaces
					if (columnName === 'Date') {
						keyA = $('td.app_date', a).text().replace(/\s/g, "");
						keyB = $('td.app_date', b).text().replace(/\s/g, "");

					}

					// returns comparison result
					return (keyA < keyB) ? -1 : (keyA > keyB) ? 1 : 0;
				};

			};

			// variable declaration to sort the selected data row descendingly
			var sortDesc = function() {
				// Removes the exisitng 'asc' class and adds the 'desc' class
				$($sortIcon).removeClass('asc');
				$($sortIcon).addClass('desc');

				// returns function for sort function parameter
				return function(a, b) {
					// Get the data in the selected column and converts character to uppercase
					var keyA = $('td:eq(0)', a).text().toUpperCase();
					var keyB = $('td:eq(0)', b).text().toUpperCase();

					// If the column is a date type, get the data without changing it to uppercase and remove any unnecessary whitespaces
					if (columnName === 'Date') {

						// If the column is a date type, get the data without changing it to uppercase and remove any unnecessary whitespaces
						keyA = $('td.app_date', a).text().replace(/\s/g, "");
						keyB = $('td.app_date', b).text().replace(/\s/g, "");
					}

					// returns comparison result
					return (keyA < keyB) ? 1 : (keyA > keyB) ? -1 : 0;
				};
			};

			// Sort descendingly
			if ($($sortIcon).hasClass('asc')) {
				console.log('Sorting descendingly');
				$rows.sort(sortDesc());
				// Sort ascendingly
			} else {
				console.log('Sorting ascendingly');
				$rows.sort(sortAsc());
			}

			// Appending the sorted rows into the table
			$.each($rows, function(index, value) {
				console.log(value);

				$($table).append(value);

				$(this).attr('index', index);

				if (index % 2 === 0) {
					$(this).removeClass('odd');
					$(this).addClass('even');
				} else {
					$(this).removeClass('even');
					$(this).addClass('odd');
				}
			});
			// error exception handling
			event.preventDefault();
		});

	};

	/**
	 * Add behaviors to Legal Pages.
	 */
	widgetInstance.bindLegalEvents = function() {

		widgetInstance.el.find("div.legalTitle").click(function() {
			for ( var i = 0; i < $('.legalTitle').length; i++) {
				$(".legalTitle[legalIndex=" + i + "]").removeClass("legalTitleOn");
				$(".legalContent[legalIndex=" + i + "]").removeClass("legalContentOn");
			}
			$(".legalTitle[legalIndex=" + $(this).attr('legalIndex') + "]").addClass("legalTitleOn");
			$(".legalContent[legalIndex=" + $(this).attr('legalIndex') + "]").addClass("legalContentOn");
		});

		widgetInstance.el.find(".legalDecline").click(function(e) {
			e.preventDefault();

			var rStr = "Decline ";
			var xObj = {};
			if ($('.legalTitle').length > 0) {
				for ( var i = 0; i < $('.legalTitle').length; i++) {
					if ($("div.legalTitle[legalIndex=" + i + "]").hasClass('legalTitleOn')) {
						xObj = $("div.legalTitle[legalIndex=" + i + "]");
						rStr += $("div.legalTitle[legalIndex=" + i + "]").text();
						break;
					}
				}
			} else {
				rStr += "Legals";
			}
			if($(xObj).find('.legalTitleAccepted').length==0){
				if (confirm(rStr + "?")) {
				}
			}
		});

		widgetInstance.el.find(".legalAccept").click(function(e) {
			e.preventDefault();
			
			var rStr = "Accept ";

			var xObj = {};

			if ($('.legalTitle').length > 0) {
				for ( var i = 0; i < $('.legalTitle').length; i++) {
					if ($("div.legalTitle[legalIndex=" + i + "]").hasClass('legalTitleOn')) {
						xObj = $("div.legalTitle[legalIndex=" + i + "]");
						break;
					}
				}
			} else {
				xObj += {};
			}

			if($(xObj).find('.legalTitleAccepted').length==0){
				if (confirm(rStr + $(xObj).text() + "?")) {
	
					var userAgreement = new UserAgreement({
						DocumentID : $('.legalTitleOn').attr('legalDocumentId'),
						AgreementScopeID : widgetInstance.appVersionID()
					});
					userAgreement.save({}, {
						success : function(agreement, response) {
							$(xObj).append("<span class='tickPlaceholder legalTitleAccepted'></span>");
						},
						error : function(agreement, response) {
							alert('Error saving agreement: ' + response.responseText);
						}
					});
				}
			}
		});
	};

	widgetInstance.appVersionID = function() {
		var selectedAppItem = widgetInstance.el.find("input:radio[name=appGuid]:checked");
		return selectedAppItem.closest('tr').find('.versionSelector').val();
	};

	/**
	 * Retrieve the data to populate the form.
	 */
	widgetInstance.dataFetcher = function(viewObj, policies) {
		var _data, rtn1 = {}, rtn2 = {}, rtn3 = {}, appcontracts = {};

		// Get the apps and appversions for a user
		var apps = new Apps();
		apps.fetch({
			async : false,
			success : function(apps) {
				_.each(apps.models, function(app) {
					var appversions = new AppVersions({
						resource : app
					});
					appversions.fetch({
						async : false,
						success : function(appversions) {
							app.versions = appversions;
						}
					});
				});
			}
		});

		rtn1 = apps;

		// Get the endpoints for the API
		var apiVersion = new ApiVersion({
			APIVersionID : viewObj.objectVersionId
		});

		apiVersion.fetch({
			async : false,
			success : function(apiVersion) {
				// Only show one endpoint of each type
				var endpoints = [];
				var sandboxEndpoint = false;
				var productionEndpoint = false;
				if (apiVersion.attributes.Endpoints.Endpoint) {
					_.each(apiVersion.attributes.Endpoints.Endpoint, function(endpoint) {
						if (endpoint.Category == 'Sandbox') {
							if (!sandboxEndpoint) {
								endpoints.push(endpoint);
								sandboxEndpoint = true;
							}
						}
						if (endpoint.Category == 'Production') {
							if (!productionEndpoint) {
								endpoints.push(endpoint);
								productionEndpoint = true;
							}
						}
					});
				}
				apiVersion.attributes.Endpoints.Endpoint = endpoints;
			}
		});

		rtn3 = apiVersion;

		// get legal data

		var docs = new AgreementDocuments({
			apiVersionID : viewObj.objectVersionId
		});

		docs.fetch({
			async : false,
			success : function(docs) {
				rtn2 = [];
				_.each(docs.models, function(doc) {
					var link = atmometadata.getContentAPIEndpoint(new FDN(viewObj.objectId)) + (doc.get('ContentPath').charAt(0) == '/' ? "" : "/") + doc.get('ContentPath');
					var content = {};
					$.ajax({
						type : "GET",
						url : link,
						cache : false,
						async : false,
						success : function(legalContent) {
							content = {};
							content.heading = doc.get('Name');
							content.documentId = doc.get('DocumentID');
							content.content = legalContent;
							rtn2.push(content);
						},
						error : function(data, textStatus, errorThrown) {
							alert('Error retrieving data. data= ' + '; textStatus= ' + textStatus + '; errorThrown= ' + errorThrown);
						}
					});
				});
			}
		});

		// get policies

		var data = {
			"formName" : submitForm,
			"formURL" : submitURL,
			"appData" : rtn1,
			"legalData" : rtn2,
			"apiVersion" : rtn3,
			"policies" : policies.models
		};
		return data;
	};

	widgetInstance.isAttachedPolicy = function(a, b) {
		alert(widgetInstance.el.find("input:radio[name=appGuid]:checked").val());
		return 'checked';
	};

	/**
	 * Since JS math functions do not work in templ{{if}}, the calculations for setting the odd/even background colors in the table has to be done after the template is loaded.
	 */
	widgetInstance.setTableRowsBG = function() {
		widgetInstance.el.find("tr[index]").each(function() {
			if (((parseInt($(this).attr('index'), 10) + 1) % 2) === 0) {
				$(this).addClass("odd");
			} else {
				$(this).addClass("even");
			}
		});
	};

	/**
	 * Submits form to server.
	 * 
	 * @returns
	 */
	widgetInstance.submitHandler = function(e) {
		// validation
		widgetInstance.el.find('#connectionWidgetForm .inputerror').removeClass('inputerror');
		if (widgetInstance.el.find('#connectionWidgetForm [name="appGuid"]:checked').length === 0) {
			widgetInstance.el.find('#selectAppTitle').addClass('inputerror');
		}

		// check for errors...
		widgetInstance.el.find('.wizardTabError').removeClass('wizardTabError');
		if (widgetInstance.el.find('.inputerror').length > 0) {
			widgetInstance.el.find('.inputerror').each(function() {
				tabparent = $(this).parents('div[tabindex]'); 
				errortab = $(tabparent).attr('tabindex');
				widgetInstance.el.find('.wizardHeadingAndTabs').find('div[tabindex=' + errortab + ']').addClass('wizardTabError');
				navigateWizardTabs(widgetInstance.el.find('#RequestConnection'), errortab);
			});
			return false;
		}

		if (true) {
			var policies = [];
			var selectedPolicies = widgetInstance.el.find("input:checkbox[name=policy]:checked");
			for ( var i = 0; i < selectedPolicies.length; i++) {
				policies.push({
					"PolicyKey" : selectedPolicies[i].value
				});
			}
			
			if (widgetInstance.el.find(".legalTitle").length > 0 && widgetInstance.el.find(".legalTitle").length > widgetInstance.el.find(".legalTitleAccepted").length) {
				alert("You need to accept all the legal agreements before you can proceed.");
				return false;
			}
			
			var runTimeId = widgetInstance.appVersionID();
			$.ajax({
				type : 'POST',
				url : atmometadata.getContractsAPIEndpoint(new FDN(runTimeId)),
				async:false,
				data : JSON.stringify({
					"APIVersionID" : widgetInstance.el.find("input#apiVersionId").val(), // the selected option field
					"RuntimeID" : runTimeId,
					"Environment" : widgetInstance.el.find("input:radio[name=Environment]:checked").val(), //
					"Policies" : {
						"Policy" : policies
					}
				}),
				accept : "text",
				dataType : "text",
				contentType : "application/json",
				success : function(data) {
					updateView("api", widgetInstance.el.find('input#apiId').val(), "details");
				},
				error : function(data) {
					alert('Error saving data: ' + data.responseText);
				}
			});
		}

	};

	return widgetInstance;
};

/**
 * ADD WIDGET TO UI
 */
registerWidgetObject(addModifyConnectionWidget);
