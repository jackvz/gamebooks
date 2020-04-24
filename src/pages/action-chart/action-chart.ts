// Angular and Ionic components
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// App components
import { SERIES, SERIES_OPTION } from '../../app/series-data';
import { TITLES } from '../../app/title-data';
import { Title } from '../../app/title';
import { GameService } from '../../app/game.service';
import { TitleService } from '../../app/title.service';

// Global vars
declare var gtag: any;

@Component({
  selector: 'page-action-chart',
  templateUrl: 'action-chart.html',
})
export class ActionChartPage {
  public series;
  public title;
  public pageMarkedUpContent;
  public titleData;
  public playerChart;
  public seriesOption;

  public showOriginalArtwork = false;

  public LoneWolf_KaiForm = new FormGroup({});
  public LoneWolf_MagnaKaiForm = new FormGroup({});
  public LoneWolf_GrandMasterForm = new FormGroup({});
  public LoneWolf_NewOrderForm = new FormGroup({});
  public GreyStarForm = new FormGroup({});
  public FreewayWarriorForm = new FormGroup({});

  get f1() { return this.LoneWolf_KaiForm.controls; }
  get f2() { return this.LoneWolf_MagnaKaiForm.controls; }
  get f3() { return this.LoneWolf_GrandMasterForm.controls; }
  get f4() { return this.LoneWolf_NewOrderForm.controls; }
  get f5() { return this.GreyStarForm.controls; }
  get f6() { return this.FreewayWarriorForm.controls; }

  constructor(
    private router: Router,
    private gameService: GameService,
    private titleService: TitleService,
    private sanitizer: DomSanitizer,
    /* tslint:disable-next-line */
    private formBuilder: FormBuilder,
  ) {
    this.LoneWolf_KaiForm = formBuilder.group({
      combatSkill: [this.gameService.game.playerChart.combatSkill],
      endurancePoints: [this.gameService.game.playerChart.endurancePoints],
      rank: [this.gameService.game.playerChart.rank],
      discipline1: [this.gameService.game.playerChart.discipline1],
      discipline2: [this.gameService.game.playerChart.discipline2],
      discipline3: [this.gameService.game.playerChart.discipline3],
      discipline4: [this.gameService.game.playerChart.discipline4],
      discipline5: [this.gameService.game.playerChart.discipline5],
      discipline6: [this.gameService.game.playerChart.discipline6],
      discipline7: [this.gameService.game.playerChart.discipline7],
      discipline8: [this.gameService.game.playerChart.discipline8],
      discipline9: [this.gameService.game.playerChart.discipline9],
      weapon1: [this.gameService.game.playerChart.weapon1],
      weapon2: [this.gameService.game.playerChart.weapon2],
      beltPouch: [this.gameService.game.playerChart.beltPouch, [Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      meals: [this.gameService.game.playerChart.meals, [Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      backpackItem1: [this.gameService.game.playerChart.backpackItem1],
      backpackItem2: [this.gameService.game.playerChart.backpackItem2],
      backpackItem3: [this.gameService.game.playerChart.backpackItem3],
      backpackItem4: [this.gameService.game.playerChart.backpackItem4],
      backpackItem5: [this.gameService.game.playerChart.backpackItem5],
      backpackItem6: [this.gameService.game.playerChart.backpackItem6],
      backpackItem7: [this.gameService.game.playerChart.backpackItem7],
      backpackItem8: [this.gameService.game.playerChart.backpackItem8],
      specialItems: [this.gameService.game.playerChart.specialItems],
      notes: [this.gameService.game.playerChart.notes],
    });
    this.LoneWolf_MagnaKaiForm = formBuilder.group({
      combatSkill: [this.gameService.game.playerChart.combatSkill],
      endurancePoints: [this.gameService.game.playerChart.endurancePoints],
      rank: [this.gameService.game.playerChart.rank],
      discipline1: [this.gameService.game.playerChart.discipline1],
      discipline2: [this.gameService.game.playerChart.discipline2],
      discipline3: [this.gameService.game.playerChart.discipline3],
      discipline4: [this.gameService.game.playerChart.discipline4],
      discipline5: [this.gameService.game.playerChart.discipline5],
      discipline6: [this.gameService.game.playerChart.discipline6],
      discipline7: [this.gameService.game.playerChart.discipline7],
      discipline8: [this.gameService.game.playerChart.discipline8],
      discipline9: [this.gameService.game.playerChart.discipline9],
      weapon1: [this.gameService.game.playerChart.weapon1],
      weapon2: [this.gameService.game.playerChart.weapon2],
      weaponMasteryDagger: [this.gameService.game.playerChart.weaponMasteryDagger],
      weaponMasteryMace: [this.gameService.game.playerChart.weaponMasteryMace],
      weaponMasteryWarhammer: [this.gameService.game.playerChart.weaponMasteryWarhammer],
      weaponMasteryAxe: [this.gameService.game.playerChart.weaponMasteryAxe],
      weaponMasteryQuarterstaff: [this.gameService.game.playerChart.weaponMasteryQuarterstaff],
      weaponMasterySpear: [this.gameService.game.playerChart.weaponMasterySpear],
      weaponMasteryShortSword: [this.gameService.game.playerChart.weaponMasteryShortSword],
      weaponMasteryBow: [this.gameService.game.playerChart.weaponMasteryBow],
      weaponMasterySword: [this.gameService.game.playerChart.weaponMasterySword],
      weaponMasteryBroadsword: [this.gameService.game.playerChart.weaponMasteryBroadsword],
      beltPouch: [this.gameService.game.playerChart.beltPouch, [Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      meals: [this.gameService.game.playerChart.meals, [Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      hasQuiver: [this.gameService.game.playerChart.hasQuiver],
      arrows: [this.gameService.game.playerChart.arrows, [Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      backpackItem1: [this.gameService.game.playerChart.backpackItem1],
      backpackItem2: [this.gameService.game.playerChart.backpackItem2],
      backpackItem3: [this.gameService.game.playerChart.backpackItem3],
      backpackItem4: [this.gameService.game.playerChart.backpackItem4],
      backpackItem5: [this.gameService.game.playerChart.backpackItem5],
      backpackItem6: [this.gameService.game.playerChart.backpackItem6],
      backpackItem7: [this.gameService.game.playerChart.backpackItem7],
      backpackItem8: [this.gameService.game.playerChart.backpackItem8],
      specialItems: [this.gameService.game.playerChart.specialItems],
      notes: [this.gameService.game.playerChart.notes],
    });
    this.LoneWolf_GrandMasterForm = formBuilder.group({
      combatSkill: [this.gameService.game.playerChart.combatSkill],
      endurancePoints: [this.gameService.game.playerChart.endurancePoints],
      rank: [this.gameService.game.playerChart.rank],
      discipline1: [this.gameService.game.playerChart.discipline1],
      discipline2: [this.gameService.game.playerChart.discipline2],
      discipline3: [this.gameService.game.playerChart.discipline3],
      discipline4: [this.gameService.game.playerChart.discipline4],
      discipline5: [this.gameService.game.playerChart.discipline5],
      discipline6: [this.gameService.game.playerChart.discipline6],
      discipline7: [this.gameService.game.playerChart.discipline7],
      discipline8: [this.gameService.game.playerChart.discipline8],
      discipline9: [this.gameService.game.playerChart.discipline9],
      discipline10: [this.gameService.game.playerChart.discipline10],
      discipline11: [this.gameService.game.playerChart.discipline11],
      weapon1: [this.gameService.game.playerChart.weapon1],
      weapon2: [this.gameService.game.playerChart.weapon2],
      kaiWeapon: [this.gameService.game.playerChart.kaiWeapon],
      weaponMasteryDagger: [this.gameService.game.playerChart.weaponMasteryDagger],
      weaponMasteryMace: [this.gameService.game.playerChart.weaponMasteryMace],
      weaponMasteryWarhammer: [this.gameService.game.playerChart.weaponMasteryWarhammer],
      weaponMasteryAxe: [this.gameService.game.playerChart.weaponMasteryAxe],
      weaponMasteryQuarterstaff: [this.gameService.game.playerChart.weaponMasteryQuarterstaff],
      weaponMasterySpear: [this.gameService.game.playerChart.weaponMasterySpear],
      weaponMasteryShortSword: [this.gameService.game.playerChart.weaponMasteryShortSword],
      weaponMasteryBow: [this.gameService.game.playerChart.weaponMasteryBow],
      weaponMasterySword: [this.gameService.game.playerChart.weaponMasterySword],
      weaponMasteryBroadsword: [this.gameService.game.playerChart.weaponMasteryBroadsword],
      beltPouch: [this.gameService.game.playerChart.beltPouch, [Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      meals: [this.gameService.game.playerChart.meals, [Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      hasQuiver: [this.gameService.game.playerChart.hasQuiver],
      arrows: [this.gameService.game.playerChart.arrows, [Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      backpackItem1: [this.gameService.game.playerChart.backpackItem1],
      backpackItem2: [this.gameService.game.playerChart.backpackItem2],
      backpackItem3: [this.gameService.game.playerChart.backpackItem3],
      backpackItem4: [this.gameService.game.playerChart.backpackItem4],
      backpackItem5: [this.gameService.game.playerChart.backpackItem5],
      backpackItem6: [this.gameService.game.playerChart.backpackItem6],
      backpackItem7: [this.gameService.game.playerChart.backpackItem7],
      backpackItem8: [this.gameService.game.playerChart.backpackItem8],
      backpackItem9: [this.gameService.game.playerChart.backpackItem9],
      backpackItem10: [this.gameService.game.playerChart.backpackItem10],
      specialItems: [this.gameService.game.playerChart.specialItems],
      notes: [this.gameService.game.playerChart.notes],
    });
    this.LoneWolf_NewOrderForm = formBuilder.group({
      combatSkill: [this.gameService.game.playerChart.combatSkill],
      endurancePoints: [this.gameService.game.playerChart.endurancePoints],
      rank: [this.gameService.game.playerChart.rank],
      discipline1: [this.gameService.game.playerChart.discipline1],
      discipline2: [this.gameService.game.playerChart.discipline2],
      discipline3: [this.gameService.game.playerChart.discipline3],
      discipline4: [this.gameService.game.playerChart.discipline4],
      discipline5: [this.gameService.game.playerChart.discipline5],
      discipline6: [this.gameService.game.playerChart.discipline6],
      discipline7: [this.gameService.game.playerChart.discipline7],
      discipline8: [this.gameService.game.playerChart.discipline8],
      discipline9: [this.gameService.game.playerChart.discipline9],
      discipline10: [this.gameService.game.playerChart.discipline10],
      discipline11: [this.gameService.game.playerChart.discipline11],
      discipline12: [this.gameService.game.playerChart.discipline12],
      weapon1: [this.gameService.game.playerChart.weapon1],
      weapon2: [this.gameService.game.playerChart.weapon2],
      kaiWeapon: [this.gameService.game.playerChart.kaiWeapon],
      weaponMasteryDagger: [this.gameService.game.playerChart.weaponMasteryDagger],
      weaponMasteryMace: [this.gameService.game.playerChart.weaponMasteryMace],
      weaponMasteryWarhammer: [this.gameService.game.playerChart.weaponMasteryWarhammer],
      weaponMasteryAxe: [this.gameService.game.playerChart.weaponMasteryAxe],
      weaponMasteryQuarterstaff: [this.gameService.game.playerChart.weaponMasteryQuarterstaff],
      weaponMasterySpear: [this.gameService.game.playerChart.weaponMasterySpear],
      weaponMasteryShortSword: [this.gameService.game.playerChart.weaponMasteryShortSword],
      weaponMasteryBow: [this.gameService.game.playerChart.weaponMasteryBow],
      weaponMasterySword: [this.gameService.game.playerChart.weaponMasterySword],
      weaponMasteryBroadsword: [this.gameService.game.playerChart.weaponMasteryBroadsword],
      beltPouch: [this.gameService.game.playerChart.beltPouch, [Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      meals: [this.gameService.game.playerChart.meals, [Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      hasQuiver: [this.gameService.game.playerChart.hasQuiver],
      arrows: [this.gameService.game.playerChart.arrows, [Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      backpackItem1: [this.gameService.game.playerChart.backpackItem1],
      backpackItem2: [this.gameService.game.playerChart.backpackItem2],
      backpackItem3: [this.gameService.game.playerChart.backpackItem3],
      backpackItem4: [this.gameService.game.playerChart.backpackItem4],
      backpackItem5: [this.gameService.game.playerChart.backpackItem5],
      backpackItem6: [this.gameService.game.playerChart.backpackItem6],
      backpackItem7: [this.gameService.game.playerChart.backpackItem7],
      backpackItem8: [this.gameService.game.playerChart.backpackItem8],
      backpackItem9: [this.gameService.game.playerChart.backpackItem9],
      backpackItem10: [this.gameService.game.playerChart.backpackItem10],
      specialItems: [this.gameService.game.playerChart.specialItems],
      notes: [this.gameService.game.playerChart.notes],
    });
    this.GreyStarForm = formBuilder.group({
      combatSkill: [this.gameService.game.playerChart.combatSkill],
      endurancePoints: [this.gameService.game.playerChart.endurancePoints],
      willPower: [this.gameService.game.playerChart.willPower],
      rank: [this.gameService.game.playerChart.rank],
      lesserMagick1: [this.gameService.game.playerChart.lesserMagick1],
      lesserMagick2: [this.gameService.game.playerChart.lesserMagick2],
      lesserMagick3: [this.gameService.game.playerChart.lesserMagick3],
      lesserMagick4: [this.gameService.game.playerChart.lesserMagick4],
      lesserMagick5: [this.gameService.game.playerChart.lesserMagick5],
      lesserMagick6: [this.gameService.game.playerChart.lesserMagick6],
      higherMagick1: [this.gameService.game.playerChart.higherMagick1],
      higherMagick2: [this.gameService.game.playerChart.higherMagick2],
      higherMagick3: [this.gameService.game.playerChart.higherMagick3],
      higherMagick4: [this.gameService.game.playerChart.higherMagick4],
      higherMagick5: [this.gameService.game.playerChart.higherMagick5],
      weapon1: [this.gameService.game.playerChart.weapon1],
      weapon2: [this.gameService.game.playerChart.weapon2],
      meals: [this.gameService.game.playerChart.meals, [Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      robePocket: [this.gameService.game.playerChart.robePocket, [Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      backpackItem1: [this.gameService.game.playerChart.backpackItem1],
      backpackItem2: [this.gameService.game.playerChart.backpackItem2],
      backpackItem3: [this.gameService.game.playerChart.backpackItem3],
      backpackItem4: [this.gameService.game.playerChart.backpackItem4],
      backpackItem5: [this.gameService.game.playerChart.backpackItem5],
      backpackItem6: [this.gameService.game.playerChart.backpackItem6],
      backpackItem7: [this.gameService.game.playerChart.backpackItem7],
      backpackItem8: [this.gameService.game.playerChart.backpackItem8],
      pouchItem1: [this.gameService.game.playerChart.pouchItem1],
      pouchItem2: [this.gameService.game.playerChart.pouchItem2],
      pouchItem3: [this.gameService.game.playerChart.pouchItem3],
      pouchItem4: [this.gameService.game.playerChart.pouchItem4],
      pouchItem5: [this.gameService.game.playerChart.pouchItem5],
      pouchItem6: [this.gameService.game.playerChart.pouchItem6],
      pouchItem7: [this.gameService.game.playerChart.pouchItem7],
      pouchItem8: [this.gameService.game.playerChart.pouchItem8],
      specialItems: [this.gameService.game.playerChart.specialItems],
      notes: [this.gameService.game.playerChart.notes],
    });
    this.FreewayWarriorForm = formBuilder.group({
      combatSkill: [this.gameService.game.playerChart.combatSkill],
      endurancePoints: [this.gameService.game.playerChart.endurancePoints],
      survivalSkillDrivingPoints: [this.gameService.game.playerChart.survivalSkillDrivingPoints, [Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      survivalSkillShootingPoints: [this.gameService.game.playerChart.survivalSkillShootingPoints, [Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      survivalSkillFieldCraftPoints: [this.gameService.game.playerChart.survivalSkillFieldCraftPoints, [Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      survivalSkillStealthPoints: [this.gameService.game.playerChart.survivalSkillStealthPoints, [Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      survivalSkillPerceptionPoints: [this.gameService.game.playerChart.survivalSkillPerceptionPoints, [Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      weapon1: [this.gameService.game.playerChart.weapon1],
      weapon2: [this.gameService.game.playerChart.weapon2],
      missileWeapon1: [this.gameService.game.playerChart.missileWeapon1],
      missileWeapon2: [this.gameService.game.playerChart.missileWeapon2],
      missileWeapon3: [this.gameService.game.playerChart.missileWeapon3],
      ammo9mm: [this.gameService.game.playerChart.ammo9mm, [Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      ammo7_62mm: [this.gameService.game.playerChart.ammo7_62mm, [Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      ammo12gauge: [this.gameService.game.playerChart.ammo12gauge, [Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      medKits: [this.gameService.game.playerChart.medKits, [Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      waterCanteen: [this.gameService.game.playerChart.waterCanteen],
      backpackItem1: [this.gameService.game.playerChart.backpackItem1],
      backpackItem2: [this.gameService.game.playerChart.backpackItem2],
      backpackItem3: [this.gameService.game.playerChart.backpackItem3],
      backpackItem4: [this.gameService.game.playerChart.backpackItem4],
      backpackItem5: [this.gameService.game.playerChart.backpackItem5],
      backpackItem6: [this.gameService.game.playerChart.backpackItem6],
      backpackItem7: [this.gameService.game.playerChart.backpackItem7],
      backpackItem8: [this.gameService.game.playerChart.backpackItem8],
      backpackItem9: [this.gameService.game.playerChart.backpackItem9],
      backpackItem10: [this.gameService.game.playerChart.backpackItem10],
      notes: [this.gameService.game.playerChart.notes],
    });
  }

  ngOnInit() {
    this.gameService.checkAgreed();
    this.gameService.checkSeriesAndTitleSelected();

    this.playerChart = this.gameService.game.playerChart;
    this.seriesOption = SERIES_OPTION;

    this.series = SERIES.find(seriesItem => seriesItem.id == this.gameService.game.seriesId);
    this.title = TITLES.find(title => title.seriesId == this.gameService.game.seriesId && title.id == this.gameService.game.titleId);

    this.LoneWolf_KaiForm.valueChanges.subscribe(chart => {
      this.gameService.game.playerChart = chart;
    });
    this.LoneWolf_MagnaKaiForm.valueChanges.subscribe(chart => {
      this.gameService.game.playerChart = chart;
    });
    this.LoneWolf_GrandMasterForm.valueChanges.subscribe(chart => {
      this.gameService.game.playerChart = chart;
    });
    this.LoneWolf_NewOrderForm.valueChanges.subscribe(chart => {
      this.gameService.game.playerChart = chart;
    });
    this.GreyStarForm.valueChanges.subscribe(chart => {
      this.gameService.game.playerChart = chart;
    });
    this.FreewayWarriorForm.valueChanges.subscribe(chart => {
      this.gameService.game.playerChart = chart;
    });

    this.titleService.getTitle(this.gameService.game.seriesId, this.gameService.game.titleId)
      .then((title) => {
        if (title && (<Title>title).xml) {
          var contentXhtml = (
            <HTMLDivElement>document.evaluate(
              '//div[@class="frontmatter"][./h2/a[@name="action"]]',
              (<Title>title).xml, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null
              ).singleNodeValue
            ).innerHTML;
          this.gameService.processXhtml(this.title, contentXhtml).then((processedMarkup) => {
            this.pageMarkedUpContent = this.sanitizer.bypassSecurityTrustHtml(<string>processedMarkup);
          });
        }
      }).catch(() => {
        this.router.navigateByUrl('/home');
      });

    <any>gtag('View', 'Action Chart', { 'event_label' : this.series.name + ' - ' + this.title.name });
  }

  ngAfterViewInit() {
    $('ion-content .scroll-content').scrollTop(0);
  }

  toggleShowOriginalArtwork(): void {
    this.showOriginalArtwork = !this.showOriginalArtwork;
  }
}
