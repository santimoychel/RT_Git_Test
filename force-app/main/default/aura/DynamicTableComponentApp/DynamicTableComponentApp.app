<aura:application extends="force:slds">
	
    <c:DynamicDataTable 
               sObjectName="Opportunity" 
               fieldSetName="OpportunityFieldset" 
           />
  <!--  <c:LightningDataTableCell></c:LightningDataTableCell>-->
    <!--Object='contact'  queryFields='id,name,email' fullQuery='select id,name,email from contact'-->
</aura:application>