var _ = require("lodash");
const promoUtil = require("./util");
/*****Add Promotion****/
module.exports = function($scope, ovcPromoAPI, DAYS, API, EFFECT, PROMOTYPE, DISCOUNTTYPE, DEFAULTHOUR, promoValidation, promo, $state, Data, ovcDash, href, $timeout, translationService, OVC_LANGUAGE) {
    "ngInject";
    const resourceLabels = {};
    translationService.getTranslation(resourceLabels, OVC_LANGUAGE.default_lang, () => {
        if (promo.copy) {
            $scope.promo.active = false;
            $scope.promo.privateName += resourceLabels.translation.promotion.copyPromotionText;
        }
    });

    if (promo) {
        if (promo.copy) {
            promo.data = {};
            _.assign(promo.data,
                require("./copiedPromotion").value,
                {
                resourceLabels: {
                    nameResource: "",
                    descriptionResource: "",
                    alertMessageResource: ""
                }
            });
        }
        $scope.promo = promo.data;
        $scope.promotionRouterState = promo.copy ? "ovc.promotion-copy" : "ovc.promotion-edit";
        $scope.editing = promo.copy ? false : true;
        $scope.copying = promo.copy;
        promoUtil.setUpEditPromo($scope);
    } else {
        $scope.promo = promoUtil.getPromoSchema();
        $scope.editing = false;
        $scope.promotionRouterState = "ovc.promotion-add";
    }

    var validationErrors = [];
    $scope.validationMessages = [];

    function showValidationMessages() {
        $scope.validationMessages = _.map(validationErrors, function(error) {
            return $scope.translation.errors[error];
        });
    }

    $scope.hasError = function(errorId) {
        return _.includes(validationErrors, errorId);
    };

    $scope.goStep2 = function(event) {
        validationErrors = $scope.promo.active ? promoValidation.step1ValidActive($scope.promo) :
            promoValidation.step1ValidInactive($scope.promo);
        showValidationMessages();
        if (validationErrors.length) {
            event.stopPropagation();
            event.preventDefault();
        }
    };

    $scope.goStep3 = function(event) {
        validationErrors = $scope.promo.active ? promoValidation.step2ValidActive($scope.promo) :
            promoValidation.step2ValidInactive($scope.promo);
        showValidationMessages();
        if (validationErrors.length) {
            event.stopPropagation();
            event.preventDefault();
        }
    };

    $scope.goStep4 = function(event) {
        validationErrors = $scope.promo.active ? promoValidation.step3ValidActive($scope.promo) :
            promoValidation.step3ValidInactive($scope.promo);
        showValidationMessages();
        if (validationErrors.length) {
            event.stopPropagation();
            event.preventDefault();
        }
    };

    $scope.goStep5 = function(event) {
        validationErrors = $scope.promo.active ? promoValidation.step4ValidActive($scope.promo) :
            promoValidation.step4ValidInactive($scope.promo);
        showValidationMessages();
        if (validationErrors.length) {
            event.stopPropagation();
            event.preventDefault();
        }
    };

    $scope.goToErrors = function() {
        var goToState = null;
        if ((validationErrors = promoValidation.step1ValidActive($scope.promo)).length) {
            goToState = $scope.promotionRouterState + ".1";
        } else if (!$scope.editing && (validationErrors = promoValidation.step2ValidInactive($scope.promo)).length) {
            goToState = $scope.promotionRouterState + ".2";
        } else if ((validationErrors = promoValidation.step3ValidActive($scope.promo)).length) {
            goToState = $scope.promotionRouterState + ".3";
        } else if ((validationErrors = promoValidation.step4ValidActive($scope.promo)).length) {
            goToState = $scope.promotionRouterState + ".4";
        }
        showValidationMessages();
        if (goToState) {
            $state.go(goToState);
        } else {
            Data.toast({
                status: "success",
                message: $scope.translation.promotion.validationSuccess
            });
        }

    };
};
