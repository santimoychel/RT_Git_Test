global class TestScheduledApexFromTestMethod {
 public static String Cron_Expr='0 0 0 13 11 ? 2019';
     global void execute(SchedulableContext ctx) {
      Batch_Project__c bt=[SELECT Id,Status__c,CloseDate__c,ProjectRunningDate__c
                                         FROM Batch_Project__c
                                         WHERE  Id = :ctx.getTriggerId()];
         
     }
}