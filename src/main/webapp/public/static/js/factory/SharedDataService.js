/**
 * Created by sleepbear on 2016. 3. 19..
 */
webing.service('sharedDataService', function() {
    return {
        canSearchTownOpen: false,
        currentDetailCardIndex : null,
        visited : true,
        getDetailPageClass : function(){
            var detailColorClass = [
                'first-card-',
                'second-card-',
                'third-card-',
                'fourth-card-'
            ];
            return detailColorClass[this.currentDetailCardIndex % 4] + "background";
        }
    };
});
