global class Batch_ProjectExSch implements Schedulable  {
global void execute(SchedulableContext SC) {
      Batch_ProjectEx M = new Batch_ProjectEx(); 
     database.executebatch(M,200);

   }
}