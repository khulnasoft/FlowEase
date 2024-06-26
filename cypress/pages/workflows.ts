import { BasePage } from './base';

export class WorkflowsPage extends BasePage {
	url = '/workflows';
	getters = {
		newWorkflowButtonCard: () => cy.getByTestId('new-workflow-card'),
		newWorkflowTemplateCard: () => cy.getByTestId('new-workflow-template-card'),
		searchBar: () => cy.getByTestId('resources-list-search'),
		createWorkflowButton: () => cy.getByTestId('resources-list-add'),
		workflowCards: () => cy.getByTestId('resources-list-item'),
		workflowCard: (workflowName: string) =>
			this.getters
				.workflowCards()
				.contains(workflowName)
				.parents('[data-test-id="resources-list-item"]'),
		workflowTags: (workflowName: string) =>
			this.getters.workflowCard(workflowName).findChildByTestId('workflow-card-tags'),
		workflowActivator: (workflowName: string) =>
			this.getters.workflowCard(workflowName).findChildByTestId('workflow-card-activator'),
		workflowActivatorStatus: (workflowName: string) =>
			this.getters.workflowActivator(workflowName).findChildByTestId('workflow-activator-status'),
		workflowCardActions: (workflowName: string) =>
			this.getters.workflowCard(workflowName).findChildByTestId('workflow-card-actions'),
		workflowDeleteButton: () =>
			cy.getByTestId('action-toggle-dropdown').filter(':visible').contains('Delete'),
		workflowFilterButton: () => cy.getByTestId('resources-list-filters-trigger').filter(':visible'),
		workflowTagsDropdown: () => cy.getByTestId('tags-dropdown'),
		workflowTagItem: (tag: string) => cy.getByTestId('tag').contains(tag),
		workflowStatusDropdown: () => cy.getByTestId('status-dropdown'),
		workflowStatusItem: (status: string) => cy.getByTestId('status').contains(status),
		workflowOwnershipDropdown: () => cy.getByTestId('user-select-trigger'),
		workflowOwner: (email: string) => cy.getByTestId('user-email').contains(email),
		workflowResetFilters: () => cy.getByTestId('workflows-filter-reset'),
		// Not yet implemented
		// myWorkflows: () => cy.getByTestId('my-workflows'),
		// allWorkflows: () => cy.getByTestId('all-workflows'),
		suggestedTemplatesPageContainer: () => cy.getByTestId('suggested-templates-page-container'),
		suggestedTemplatesCards: () =>
			cy.get('.agile__slides--regular [data-test-id=templates-info-card]'),
		suggestedTemplatesNewWorkflowButton: () =>
			cy.getByTestId('suggested-templates-new-workflow-button'),
		suggestedTemplatesSectionContainer: () =>
			cy.getByTestId('suggested-templates-section-container'),
		suggestedTemplatesPreviewModal: () => cy.getByTestId('suggested-templates-preview-modal'),
		suggestedTemplatesUseTemplateButton: () => cy.getByTestId('use-template-button'),
		suggestedTemplatesSectionDescription: () =>
			cy.getByTestId('suggested-template-section-description'),
	};

	actions = {
		createWorkflowFromCard: () => {
			this.getters.newWorkflowButtonCard().click();
		},
		deleteWorkFlow: (name: string) => {
			cy.visit(this.url);
			this.getters.workflowCardActions(name).click();
			this.getters.workflowDeleteButton().click();
			cy.intercept('DELETE', '/rest/workflows/*').as('deleteWorkflow');

			cy.get('button').contains('delete').click();
			cy.wait('@deleteWorkflow');
		},
	};
}
