public with sharing class SSControllerOfDisplayLibraryFile {
    /* @AuraEnabled
public static List<ContentDocument> dispFileDeatails() {

List<ContentDocument> listOFDocument=[SELECT Id, Owner.Name, FileType, FileExtension,Title  FROM ContentDocument];
//  System.debug('listOFDocument'+listOFDocument);
return listOFDocument;
}*/
    @AuraEnabled
    public static List<ContentWorkspace> dispAllLibrary() {
        
        List<ContentWorkspace> listOFDocument=[SELECT Id, Name  FROM ContentWorkspace];
        //  System.debug('listOFDocument'+listOFDocument);
        return listOFDocument;
    }
    @AuraEnabled
    public static List<ContentWorkspace> getFolderId() {
        
        List<ContentWorkspace> listOFFolerId=[SELECT Id,Name FROM ContentWorkspace];
        //System.debug('listOFFolerId'+listOFFolerId);
        return listOFFolerId;
    }
    
    @AuraEnabled
    public static void createFolder(String folderName,String libraryId) {
        System.debug('folderName '+folderName);
        System.debug('folderName '+libraryId);
        ContentWorkspace cw = [SELECT Id, Name
                               FROM ContentWorkspace
                               WHERE Id =: libraryId
                              ];
        List < ContentFolderLink > cfl = [SELECT Id, ContentFolderId, ParentEntityId
                                          FROM ContentFolderLink
                                          WHERE ParentEntityId = : cw.Id
                                         ];
        
        if (cfl.size() > 0) {
            ContentFolder cf = new ContentFolder(Name = folderName, ParentContentFolderId = cfl[0].ContentFolderId);
            Insert cf;
        }
    }
    
    @AuraEnabled
    public static List<contentDocument> getImageId(){
        List<contentDocument> listOfImgId=[Select id,Title,FileType,CreatedBy.Name,ContentSize From contentDocument];
        System.debug('listOfImgId'+listOfImgId);
        return listOfImgId;
        
    }
    
    @AuraEnabled
    public static List<Item> getAccountTree(){
        
        
        List<item> items = new List<item>();
        
        //List of ContentWorkspace by library
        Map<String,ContentWorkspace> contWrkSpcbyLibrymap = new Map<String,ContentWorkspace>();
        for(ContentWorkspace cwsObj : [SELECT Id, Name, RootContentFolderId, DeveloperName, WorkspaceType FROM ContentWorkspace]){
            String key = cwsObj.RootContentFolderId;
            contWrkSpcbyLibrymap.put(key, cwsObj);
        }
        
        for(ContentWorkspace cwsObj : contWrkSpcbyLibrymap.values()){
            List<item> contFolderitemsLst = new List<item>();
            for(ContentFolder cfObj: [SELECT Id, Name, ParentContentFolderId, LastModifiedDate
                                      FROM ContentFolder
                                      WHERE ParentContentFolderId =:cwsObj.RootContentFolderId]){ //IN: contWrkSpcbyLibrymap.keySet()]){
                                          Item cfitem = new Item(cfObj.Name,String.valueOf(cfObj.Id),false,null);
                                          contFolderitemsLst.add(cfitem);
                                      }
            
            Item cwsitem = new Item(cwsObj.Name,String.valueOf(cwsObj.Id),false,contFolderitemsLst);
            items.add(cwsitem);
        }
        return items;
        
    }
    //Item Wrapper Class
    public class item{
        @AuraEnabled
        public String label {get; set;}
        @AuraEnabled
        public String name {get; set;}
        @AuraEnabled
        public Boolean expanded {get; set;}
        @AuraEnabled
        public List<item> items {get; set;}
        
        public item(String label, String name, Boolean expanded, List<item> items){
            this.label = label;
            this.name = name;
            this.expanded = expanded;
            this.items = items;
        }
    }
    @AuraEnabled
    public static String getfolderLabelName(String idoflabel){
        System.debug('idoflabel'+idoflabel);
        
        String sCw='';
        ContentFolder selectedContentFol=[SELECT Id, Name, ParentContentFolderId
                                          FROM ContentFolder
                                          WHERE Id =:idoflabel];
        System.debug('selectedContentFol'+ selectedContentFol);
        if(selectedContentFol != null){
            System.debug('Inside ifCondition');
            ContentWorkspace selectedConWorkSpace=[SELECT Id, Name
                                                   FROM ContentWorkspace 
                                                   WHERE RootContentFolderId  =:selectedContentFol.ParentContentFolderId];
            sCw= selectedConWorkSpace.Name+ '> '+selectedContentFol.Name;
        }else{
            System.debug('Inside Else Condition');
            ContentWorkspace selectedConWorkSpace=[SELECT Id, Name
                                                   FROM ContentWorkspace 
                                                   WHERE Id =:idoflabel];
            sCw= selectedConWorkSpace.Name;
        }
        
        
        return sCw;
    }
    @AuraEnabled
    public static   List<String> getfolderName(String idoffolder){  
        System.debug('idoffolder'+idoffolder);
        ContentWorkspace lcw= new ContentWorkspace();
        List< String > storeLcw= new List<String>();
        
        //contentfolder
        if(idoffolder.startsWith('07H2')){
            System.debug('Inside contentfolder');
            List<ContentFolder> listOfCF=[SELECT Id, Name, ParentContentFolderId FROM ContentFolder where Id=:idoffolder]; 
            System.debug('listOfCF'+listOfCF);
            List<ContentWorkspace> listOfCW=[SELECT Id, Name, RootContentFolderId FROM ContentWorkspace ];
            System.debug('listOfCW'+listOfCW);
            
            for(ContentFolder cf:listOfCF){
                for(ContentWorkspace cw:listOfCW){
                    if(cw.RootContentFolderId==cf.ParentContentFolderId){
                        lcw.name=cf.Name;
                        System.debug('>>'+  lcw.name);
                        storeLcw.add(lcw.name);
                    }
                }
            }
            
        }
        //contentworkspace
        else if(idoffolder.startsWith('0582v')){
            System.debug('Inside contentworkspace');
            List<ContentFolder> listOfCF=[SELECT Id, Name, ParentContentFolderId FROM ContentFolder]; 
            System.debug('listOfCF'+listOfCF);
            List<ContentWorkspace> listOfCW=[SELECT Id, Name, RootContentFolderId FROM ContentWorkspace  where Id=:idoffolder];
            System.debug('listOfCW'+listOfCW);
            
            for(ContentFolder cf:listOfCF){
                for(ContentWorkspace cw:listOfCW){
                    if(cw.RootContentFolderId==cf.ParentContentFolderId){
                        lcw.name=cf.Name;
                        System.debug('>>'+  lcw.name);
                        storeLcw.add(lcw.name);
                    }
                }
            }
        }else{
            System.debug('Something is wrong');
        }
        
        System.debug('storeLcw>>'+  storeLcw);
        return storeLcw;
        
        
    }
    @AuraEnabled
    public static   List<sobject> getrecordDetailsfromFolder(String idofcontentfolder){ 
        System.debug('id of content folder>>'+  idofcontentfolder);
        ContentWorkspace cw = [SELECT Id, Name,RootContentFolderId
                               FROM ContentWorkspace
                               WHERE id =: idofcontentfolder
                              ];
        list<SObject> listOfDocument= [SELECT ID,title, Owner.Name, FileType, FileExtension
                                       FROM contentdocument
                                       WHERE parentid=:cw.Id];
        system.debug('listOfDocument'+listOfDocument);
        list <sobject> appendList = new list<SObject>();
        
        list <sobject> folderList = [SELECT Name,parentcontentfolderid
                                     FROM contentfolder
                                     WHERE parentcontentfolderid=:cw.RootContentFolderId];
        //appendList.addall(folderList);
        appendList.addall(listOfDocument);
        return appendList;
        
        
        
        
        /*  List<ContentFolder> lstCF=[SELECT ParentContentFolderId, Id, Name
FROM ContentFolder
where id=:idofcontentfolder];


List<ContentWorkspace> lstCw=[SELECT RootContentFolderId, Id, Name FROM ContentWorkspace];    
System.debug('lstCF'+lstCF);
String stId='';
for(ContentFolder cf:lstCF){
for(ContentWorkspace cw:lstCw){
if(cf.ParentContentFolderId==cw.RootContentFolderId){

stId=cw.Id;
System.debug('stId'+stId);
}
}
}
List<ContentDocument> listOFDocument=[SELECT Id, Owner.Name, FileType, FileExtension,Title
FROM ContentDocument 
where parentId=:stId];

System.debug('listOFDocument'+listOFDocument);*/
        
        
    }
    @AuraEnabled
    public static list<SObject> getFolderAndFile(string idOfLibrary ){
        List<Sobject> appendList =new List<Sobject>();
        Set<Id> setOfWorkSpaceId=new Set <Id>();
        List<ContentWorkspace> listOfCW=[SELECT Id, RootContentFolderId
                                         FROM ContentWorkspace];
        
        for(ContentWorkspace cw:listOfCW ){
            setOfWorkSpaceId.add(cw.Id);
        }
        
        if(setOfWorkSpaceId.contains(idOfLibrary)){
            ContentWorkspace cw=[SELECT Id, RootContentFolderId
                                 FROM ContentWorkspace
                                 where id=:idOfLibrary
                                ];
            if(cw.Id!=null){
                List<ContentDocument> cd = [SELECT Id, ParentId, Title, ContentAssetId
                                            FROM ContentDocument
                                            where ParentId=:cw.Id];
                List<ContentfOLDER> listofFolder = [SELECT Id, parentcontentfolderid
                                                    FROM ContentfOLDER
                                                    where parentcontentfolderid=:cw.RootContentFolderId];
                appendList.addAll(cd);
            }
            else{
                List<Id> listOfId=new List<Id>();
                
                 List<ContentfOLDER> listofFolder = [SELECT Id, parentcontentfolderid
                                                    FROM ContentfOLDER
                                                    where id=:idOfLibrary];
             /*   ContentFolderMember cfm=[SELECT Id, ChildRecordId, ParentContentFolderId
                                         FROM ContentFolderMember 
                                         where ParentContentFolderId=:listofFolder.Id];
                
                for(ContentFolderMember conFolMem: cfm){
                    //listOfId.add(conFolMem);
                }*/
            }
            
            
        }
        
        
        return null; 
    }
    
}