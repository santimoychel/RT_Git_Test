trigger OppRecordType on Opportunity (after insert ) {
    taskRecordMetaData.featchTheValueOfMetaData(Trigger.new);
    
}