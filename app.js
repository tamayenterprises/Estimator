const FORMSPREE_ENDPOINT = "https://formspree.io/f/xqeyglen";

const PRICING = {
  labor: {
    general: { ratePerPerson: 32, crewSize: 2 },
    electrical: { ratePerPerson: 45, crewSize: 2 }
  },

  drywall: {
    small: {
      label: "Small patch",
      materialMin: 18,
      materialMax: 35,
      hours: 1.5,
      materials: ["Patch repair kit", "Joint compound", "Basic tape", "Minor consumables"]
    },
    medium: {
      label: "Medium patch",
      materialMin: 35,
      materialMax: 70,
      hours: 2.5,
      materials: ["1 drywall sheet or equivalent piece", "Joint compound", "Drywall tape", "Screws", "Minor consumables"]
    },
    large: {
      label: "Large patch",
      materialMin: 70,
      materialMax: 125,
      hours: 4,
      materials: ["1 to 2 drywall sheets", "Joint compound", "Drywall tape", "Screws", "Minor consumables"]
    },
    xlarge: {
      label: "Very large patch",
      materialMin: 125,
      materialMax: 220,
      hours: 6,
      materials: ["2 to 3 drywall sheets", "Additional joint compound", "Drywall tape", "Screws", "Consumables and reinforcement"]
    }
  },

  drywallAdjustments: {
    damageLocation: {
      ceiling: { hoursMultiplier: 1.25, materialMinAdd: 8, materialMaxAdd: 18, label: "Adjustment for ceiling work" }
    },
    texture: {
      light: { hoursMultiplier: 1.15, materialMinAdd: 10, materialMaxAdd: 20, label: "Adjustment for light texture" },
      heavy: { hoursMultiplier: 1.3, materialMinAdd: 20, materialMaxAdd: 40, label: "Adjustment for heavy texture" }
    },
    workHeight: {
      medium: { hoursMultiplier: 1.1, materialMinAdd: 0, materialMaxAdd: 0, label: "Adjustment for 8-10 ft height" },
      high: { hoursMultiplier: 1.2, materialMinAdd: 8, materialMaxAdd: 20, label: "Adjustment for height above 10 ft" }
    },
    obstacles: {
      yes: { hoursMultiplier: 1.15, materialMinAdd: 0, materialMaxAdd: 0, label: "Adjustment for moving furniture or obstacles" }
    },
    insulation: {
      yes: { hoursAdd: 0.5, materialMinAdd: 12, materialMaxAdd: 25, label: "Includes possible insulation adjustment" }
    },
    paint: {
      patchOnly: { hoursAdd: 1, materialMinAdd: 15, materialMaxAdd: 35, label: "Includes painting the patch area only" },
      fullSurface: { hoursAdd: 2.5, materialMinAdd: 35, materialMaxAdd: 85, label: "Includes painting the full affected area" },
      connectedSurfaces: { hoursAdd: 4.5, materialMinAdd: 65, materialMaxAdd: 160, label: "Includes painting connected areas" },
      notSure: { hoursAdd: 2, materialMinAdd: 25, materialMaxAdd: 65, label: "Painting included, final scope to be confirmed" },
      noExistingPaint: { materialMinAdd: 15, materialMaxAdd: 35, label: "No existing paint available" },
      yesExistingPaint: { label: "Customer indicates existing paint is available" }
    },
    scopeContext: {
      standardSurface: { hoursAdd: 0.5, materialMinAdd: 10, materialMaxAdd: 20 },
      largeSurface: { hoursAdd: 1, materialMinAdd: 20, materialMaxAdd: 45 },
      connectedSurfaces: { hoursAdd: 1.5, materialMinAdd: 30, materialMaxAdd: 70 }
    }
  },

  lighting: {
    replace: {
      label: "Replace existing light fixture",
      materialMin: 15,
      materialMax: 40,
      hours: 1.5,
      materials: ["Wire nuts / connectors", "Mounting hardware", "Minor electrical consumables"]
    },
    add: {
      label: "Add new light fixture",
      materialMin: 45,
      materialMax: 110,
      hours: 3.5,
      materials: ["Electrical box", "Basic wiring (cable)", "Wire nuts / connectors", "Fasteners / staples", "Mounting hardware", "Electrical consumables"]
    },
    adjustments: {
      location: {
        ceiling: { hoursMultiplier: 1.1, materialMinAdd: 5, materialMaxAdd: 15, label: "Ceiling installation adjustment" },
        wall: { hoursMultiplier: 1.05, materialMinAdd: 0, materialMaxAdd: 10, label: "Wall installation adjustment" },
        exterior: { hoursMultiplier: 1.25, materialMinAdd: 25, materialMaxAdd: 60, label: "Exterior installation adjustment" }
      },
      fixtureType: {
        standard: { hoursMultiplier: 1, label: "Standard fixture", materialMinAdd: 0, materialMaxAdd: 0 },
        recessed: { hoursMultiplier: 1.25, label: "Recessed light installation", materialMinAdd: 15, materialMaxAdd: 40 },
        vanity: { hoursMultiplier: 1.1, label: "Vanity / wall light adjustment", materialMinAdd: 0, materialMaxAdd: 15 },
        pendant: { hoursMultiplier: 1.3, label: "Pendant / chandelier installation", materialMinAdd: 10, materialMaxAdd: 30 },
        exterior: { hoursMultiplier: 1.2, label: "Exterior fixture setup", materialMinAdd: 20, materialMaxAdd: 50 },
        notSure: { hoursMultiplier: 1.15, label: "Fixture type to be confirmed", materialMinAdd: 0, materialMaxAdd: 20 }
      },
      access: {
        veryEasy: { hoursMultiplier: 1, label: "Existing wiring already in place", materialMinAdd: 0, materialMaxAdd: 0 },
        easy: { hoursMultiplier: 1.15, label: "Minor access adjustments", materialMinAdd: 10, materialMaxAdd: 25 },
        moderate: { hoursMultiplier: 1.35, label: "Multiple openings required", materialMinAdd: 25, materialMaxAdd: 60 },
        difficult: { hoursMultiplier: 1.6, label: "Limited access / complex routing", materialMinAdd: 50, materialMaxAdd: 120 },
        notSure: { hoursMultiplier: 1.3, label: "Access conditions to be confirmed", materialMinAdd: 20, materialMaxAdd: 50 }
      },
      switch: {
        yes: { hoursAdd: 1.5, materialMinAdd: 20, materialMaxAdd: 45, label: "New switch installation" },
        no: { hoursAdd: 0, materialMinAdd: 0, materialMaxAdd: 0, label: "" },
        notSure: { hoursAdd: 0.8, materialMinAdd: 10, materialMaxAdd: 25, label: "Switch requirement to be confirmed" }
      },
      wireRun: {
        none: { hoursAdd: 0, materialMinAdd: 0, materialMaxAdd: 0, label: "" },
        short: { hoursAdd: 0.5, materialMinAdd: 10, materialMaxAdd: 25, label: "Short wiring run" },
        medium: { hoursAdd: 1.2, materialMinAdd: 20, materialMaxAdd: 50, label: "Medium wiring run" },
        long: { hoursAdd: 2, materialMinAdd: 40, materialMaxAdd: 90, label: "Long wiring run" },
        notSure: { hoursAdd: 1, materialMinAdd: 20, materialMaxAdd: 45, label: "Wiring distance to be confirmed" }
      },
      atticAccess: {
        yes: { hoursMultiplier: 0.9, label: "Access available from above or below", materialMinAdd: 0, materialMaxAdd: 0 },
        no: { hoursMultiplier: 1.25, label: "No access available from above or below", materialMinAdd: 0, materialMaxAdd: 0 },
        notSure: { hoursMultiplier: 1.1, label: "Access route conditions unknown", materialMinAdd: 0, materialMaxAdd: 0 }
      },
      repair: {
        yes: { hoursAdd: 2, materialMinAdd: 25, materialMaxAdd: 70, label: "Repairs included if openings are needed" },
        no: { hoursAdd: 0, materialMinAdd: 0, materialMaxAdd: 0, label: "" },
        notSure: { hoursAdd: 1, materialMinAdd: 15, materialMaxAdd: 40, label: "Repair scope to be confirmed" }
      },
      paintScope: {
        patchOnly: { hoursAdd: 1, materialMinAdd: 15, materialMaxAdd: 35, label: "Includes painting the patch area only" },
        fullSurface: { hoursAdd: 2.5, materialMinAdd: 35, materialMaxAdd: 85, label: "Includes painting the full affected area" },
        connectedSurfaces: { hoursAdd: 4.5, materialMinAdd: 65, materialMaxAdd: 160, label: "Includes painting connected areas" },
        notSure: { hoursAdd: 2, materialMinAdd: 25, materialMaxAdd: 65, label: "Painting scope to be confirmed" }
      },
      height: {
        standard: { hoursMultiplier: 1, label: "" },
        medium: { hoursMultiplier: 1.1, label: "8-10 ft height adjustment" },
        high: { hoursMultiplier: 1.25, label: "Over 10 ft height adjustment" }
      },
      obstacles: {
        yes: { hoursMultiplier: 1.15, label: "Furniture / obstacle adjustment" },
        no: { hoursMultiplier: 1, label: "" }
      },
      fixtureSupply: {
        yes: { materialMinAdd: 0, materialMaxAdd: 0, label: "" },
        no: { materialMinAdd: 40, materialMaxAdd: 120, label: "Fixture allowance included" },
        notSure: { materialMinAdd: 20, materialMaxAdd: 60, label: "Fixture allowance to be confirmed" }
      }
    }
  },

  paint: {
    scopeAdds: {
      walls: { hours: 3, matMin: 70, matMax: 140, label: "Walls included" },
      ceiling: { hours: 2, matMin: 40, matMax: 90, label: "Ceiling included" },
      trim: { hours: 1.25, matMin: 25, matMax: 55, label: "Baseboards / trim included" },
      doors: { hours: 1.0, matMin: 20, matMax: 45, label: "Doors included" },
      windows: { hours: 1.25, matMin: 20, matMax: 50, label: "Windows included" }
    },
    roomSize: {
      small: { hours: 0, matMin: 0, matMax: 0, label: "Small room" },
      medium: { hours: 1.5, matMin: 25, matMax: 60, label: "Medium room" },
      large: { hours: 3, matMin: 55, matMax: 120, label: "Large room" },
      open: { hours: 5, matMin: 95, matMax: 200, label: "Open / oversized room" },
      not_sure: { hours: 2, matMin: 35, matMax: 80, label: "Room size to be confirmed" }
    },
    roomCountMultiplier: { "1": 1, "2": 1.9, "3": 2.7, "4": 3.45, "5plus": 4.1 },
    colorChange: {
      no: { hours: 0, matMin: 0, matMax: 0, label: "" },
      yes: { hours: 1.5, matMin: 25, matMax: 65, label: "Significant color change" },
      notSure: { hours: 1, matMin: 15, matMax: 40, label: "Color change to be confirmed" }
    },
    surfaceCondition: {
      minimal: { hours: 0, matMin: 0, matMax: 0, label: "" },
      light: { hours: 1, matMin: 15, matMax: 40, label: "Light surface preparation" },
      moderate: { hours: 2.5, matMin: 40, matMax: 95, label: "Moderate surface preparation" },
      heavy: { hours: 5, matMin: 90, matMax: 200, label: "Heavy surface preparation" },
      notSure: { hours: 2, matMin: 30, matMax: 75, label: "Surface preparation to be confirmed" }
    },
    ceilingHeight: {
      under8: { hours: 0, matMin: 0, matMax: 0, label: "" },
      ft8to10: { hours: 0.75, matMin: 0, matMax: 15, label: "8-10 ft ceiling height" },
      over10: { hours: 1.75, matMin: 10, matMax: 35, label: "Over 10 ft ceiling height" },
      notSure: { hours: 1, matMin: 5, matMax: 20, label: "Ceiling height to be confirmed" }
    },
    finishLevel: {
      standard: { hours: 0, matMin: 0, matMax: 0, label: "" },
      cleanDetailed: { hours: 1.5, matMin: 10, matMax: 30, label: "Clean + detailed finish" },
      highEnd: { hours: 3, matMin: 20, matMax: 50, label: "High-end finish expectation" },
      notSure: { hours: 1, matMin: 10, matMax: 20, label: "Finish level to be confirmed" }
    },
    propertyType: {
      house: { hours: 0, matMin: 0, matMax: 0, label: "" },
      apartmentCondo: { hours: 1, matMin: 0, matMax: 0, label: "Apartment / condo logistics" },
      hoaManaged: { hours: 2, matMin: 0, matMax: 0, label: "Managed building / HOA coordination" },
      notSure: { hours: 1, matMin: 0, matMax: 0, label: "Property logistics to be confirmed" }
    },
    accessDifficulty: {
      easy: { hours: 0, matMin: 0, matMax: 0, label: "" },
      moderate: { hours: 1, matMin: 0, matMax: 0, label: "Moderate access difficulty" },
      difficult: { hours: 2.5, matMin: 0, matMax: 0, label: "Difficult access conditions" },
      notSure: { hours: 1.5, matMin: 0, matMax: 0, label: "Access conditions to be confirmed" }
    },
    paintHandling: {
      clientProvides: { hours: 0, matMin: 0, matMax: 0, label: "Paint provided by customer" },
      painterProvides: { hours: 0, matMin: 75, matMax: 220, label: "Paint supplied by painter" },
      notSure: { hours: 0, matMin: 40, matMax: 120, label: "Paint handling to be confirmed" }
    },
    obstacles: {
      empty: { hours: 0, matMin: 0, matMax: 0, label: "" },
      lightFurniture: { hours: 0.75, matMin: 10, matMax: 25, label: "Light furniture protection / moving" },
      fullyFurnished: { hours: 2, matMin: 20, matMax: 45, label: "Full room protection / moving" },
      notSure: { hours: 1, matMin: 10, matMax: 30, label: "Protection needs to be confirmed" }
    },
    yearBuilt: {
      after2000: { hours: 0, matMin: 0, matMax: 0, label: "" },
      from1980to2000: { hours: 0, matMin: 0, matMax: 0, label: "" },
      before1980: { hours: 1, matMin: 15, matMax: 40, label: "Possible lead-based paint conditions" },
      before1960: { hours: 2, matMin: 30, matMax: 75, label: "Higher likelihood of lead-based paint conditions" },
      notSure: { hours: 1.25, matMin: 20, matMax: 50, label: "Year built to be confirmed" }
    },
    leadPrepMode: {
      standard: { hours: 0, matMin: 0, matMax: 0, label: "" },
      enhanced: { hours: 4, matMin: 120, matMax: 300, label: "Enhanced preparation / lead-safe workflow" },
      notSure: { hours: 2, matMin: 60, matMax: 150, label: "Potential enhanced preparation to be confirmed" }
    },
    materials: ["Paint", "Primer", "Caulk", "Masking tape", "Plastic / protection materials", "Patch / prep consumables"]
  },

  tvMount: {
    base: {
      standard: { laborMin: 95, laborMax: 120, matMin: 8, matMax: 20, label: "Standard wall mount" },
      fireplace: { laborMin: 130, laborMax: 180, matMin: 10, matMax: 30, label: "Over fireplace installation" },
      corner: { laborMin: 125, laborMax: 165, matMin: 10, matMax: 25, label: "Corner mount" },
      notSure: { laborMin: 115, laborMax: 155, matMin: 10, matMax: 25, label: "Mounting type to be confirmed" }
    },
    tvSize: {
      small: { laborMin: 0, laborMax: 0, matMin: 0, matMax: 0, label: 'TV size up to 43"' },
      medium: { laborMin: 15, laborMax: 25, matMin: 0, matMax: 0, label: 'TV size 44" to 64"' },
      large: { laborMin: 35, laborMax: 60, matMin: 0, matMax: 0, label: 'TV size 65" to 84"' },
      xlarge: { laborMin: 60, laborMax: 100, matMin: 0, matMax: 0, label: 'TV size 85"+' }
    },
    wallType: {
      drywall: { laborMin: 0, laborMax: 0, matMin: 0, matMax: 0, label: 'Drywall surface' },
      plaster: { laborMin: 20, laborMax: 40, matMin: 5, matMax: 15, label: 'Plaster wall adjustment' },
      brick: { laborMin: 45, laborMax: 80, matMin: 10, matMax: 25, label: 'Brick surface adjustment' },
      tile: { laborMin: 55, laborMax: 90, matMin: 10, matMax: 25, label: 'Tile surface adjustment' },
      stone: { laborMin: 65, laborMax: 110, matMin: 15, matMax: 35, label: 'Stone surface adjustment' },
      notSure: { laborMin: 25, laborMax: 45, matMin: 5, matMax: 15, label: 'Surface to be confirmed' }
    },
    mountProvided: {
      yes: { laborMin: 0, laborMax: 0, matMin: 0, matMax: 0, label: 'Mount bracket provided by customer' },
      no: { laborMin: 0, laborMax: 0, matMin: 35, matMax: 120, label: 'Mount bracket allowance included' },
      notSure: { laborMin: 0, laborMax: 0, matMin: 25, matMax: 80, label: 'Mount bracket allowance to be confirmed' }
    },
    existingOutlet: {
      yes: { laborMin: 0, laborMax: 0, matMin: 0, matMax: 0, label: 'Outlet already available' },
      nearby: { laborMin: 10, laborMax: 20, matMin: 0, matMax: 0, label: 'Outlet nearby but not centered' },
      no: { laborMin: 20, laborMax: 35, matMin: 0, matMax: 0, label: 'No nearby outlet confirmed' },
      notSure: { laborMin: 10, laborMax: 20, matMin: 0, matMax: 0, label: 'Outlet condition to be confirmed' }
    },
    wireConceal: {
      none: { laborMin: 0, laborMax: 0, matMin: 0, matMax: 0, label: 'Simple visible cable setup' },
      cover: { laborMin: 20, laborMax: 40, matMin: 15, matMax: 40, label: 'External cable concealment' },
      inWall: { laborMin: 80, laborMax: 150, matMin: 25, matMax: 70, label: 'In-wall wire concealment' },
      notSure: { laborMin: 35, laborMax: 65, matMin: 10, matMax: 30, label: 'Wire concealment to be confirmed' }
    },
    powerWork: {
      no: { laborMin: 0, laborMax: 0, matMin: 0, matMax: 0, label: '' },
      yes: { laborMin: 120, laborMax: 220, matMin: 35, matMax: 95, label: 'Outlet relocation / addition behind TV' },
      notSure: { laborMin: 70, laborMax: 130, matMin: 20, matMax: 60, label: 'Power work to be confirmed' }
    },
    lowVoltage: {
      no: { laborMin: 0, laborMax: 0, matMin: 0, matMax: 0, label: '' },
      yes: { laborMin: 45, laborMax: 90, matMin: 10, matMax: 30, label: 'Low-voltage line relocation' },
      notSure: { laborMin: 25, laborMax: 50, matMin: 5, matMax: 15, label: 'Low-voltage work to be confirmed' }
    },
    soundbarInstall: {
      no: { laborMin: 0, laborMax: 0, matMin: 0, matMax: 0, label: '' },
      soundbar: { laborMin: 35, laborMax: 60, matMin: 5, matMax: 20, label: 'Soundbar installation' },
      shelf: { laborMin: 30, laborMax: 55, matMin: 5, matMax: 20, label: 'Accessory shelf installation' },
      both: { laborMin: 60, laborMax: 105, matMin: 10, matMax: 35, label: 'Soundbar + shelf installation' }
    },
    wallPatchPaint: {
      no: { laborMin: 0, laborMax: 0, matMin: 0, matMax: 0, label: '' },
      patchOnly: { laborMin: 45, laborMax: 90, matMin: 10, matMax: 30, label: 'Wall patching included' },
      patchPaint: { laborMin: 80, laborMax: 150, matMin: 20, matMax: 55, label: 'Wall patching + paint touch-up included' },
      notSure: { laborMin: 45, laborMax: 85, matMin: 10, matMax: 30, label: 'Wall repair scope to be confirmed' }
    },
    mountHeight: {
      standard: { laborMin: 0, laborMax: 0, matMin: 0, matMax: 0, label: 'Standard work height' },
      high: { laborMin: 20, laborMax: 40, matMin: 0, matMax: 0, label: 'High work area adjustment' },
      veryHigh: { laborMin: 45, laborMax: 85, matMin: 0, matMax: 0, label: 'Very high / difficult access adjustment' }
    }
  },

  plumbing: {
    faucet: {
      baseLaborMin: 250,
      baseLaborMax: 250,
      hours: 2.0,
      fixtureAllowanceMin: 40,
      fixtureAllowanceMax: 180,
      shutoffAddLaborMin: 60,
      shutoffAddLaborMax: 120,
      shutoffAddMatMin: 25,
      shutoffAddMatMax: 50,
      activeIssueAddLaborMin: 100,
      activeIssueAddLaborMax: 150,
      access: {
        easy: { laborMin: 0, laborMax: 0 },
        moderate: { laborMin: 35, laborMax: 75 },
        difficult: { laborMin: 75, laborMax: 140 },
        notSure: { laborMin: 40, laborMax: 90 }
      },
      materials: ["Supply lines", "Faucet connectors", "Sealant / plumber's putty", "Minor consumables"]
    },

    toilet: {
      baseLaborMin: 250,
      baseLaborMax: 350,
      hours: 3.0,
      fixtureAllowanceMin: 120,
      fixtureAllowanceMax: 250,
      floorIssue: {
        no: { laborMin: 0, laborMax: 0, matMin: 0, matMax: 0 },
        crackedTile: { laborMin: 250, laborMax: 450, matMin: 90, matMax: 220 },
        softFloor: { laborMin: 350, laborMax: 650, matMin: 140, matMax: 320 },
        uneven: { laborMin: 120, laborMax: 250, matMin: 30, matMax: 90 },
        notSure: { laborMin: 150, laborMax: 300, matMin: 40, matMax: 120 }
      },
      loose: {
        yes: { laborMin: 50, laborMax: 100 },
        no: { laborMin: 0, laborMax: 0 },
        notSure: { laborMin: 25, laborMax: 60 }
      },
      access: {
        easy: { laborMin: 0, laborMax: 0 },
        moderate: { laborMin: 40, laborMax: 90 },
        difficult: { laborMin: 90, laborMax: 180 },
        notSure: { laborMin: 50, laborMax: 110 }
      },
      materials: ["Wax ring / seal", "Closet bolts", "Supply line", "Minor consumables"]
    },

    vanity: {
      baseLaborMin: 400,
      baseLaborMax: 500,
      hours: 4.5,
      fixtureAllowanceMin: 150,
      fixtureAllowanceMax: 300,
      sameSize: {
        yes: { laborMin: 0, laborMax: 0 },
        no: { laborMin: 120, laborMax: 260 },
        notSure: { laborMin: 80, laborMax: 180 }
      },
      touchup: {
        no: { laborMin: 0, laborMax: 0 },
        wall: { laborMin: 60, laborMax: 140 },
        tile: { laborMin: 180, laborMax: 350 },
        floor: { laborMin: 120, laborMax: 260 },
        multiple: { laborMin: 220, laborMax: 450 },
        notSure: { laborMin: 90, laborMax: 180 }
      },
      leakDamage: {
        no: { laborMin: 0, laborMax: 0, matMin: 0, matMax: 0 },
        minor: { laborMin: 75, laborMax: 160, matMin: 20, matMax: 60 },
        major: { laborMin: 180, laborMax: 320, matMin: 60, matMax: 160 },
        notSure: { laborMin: 90, laborMax: 180, matMin: 25, matMax: 80 }
      },
      materials: ["P-trap parts", "Supply lines", "Caulk / sealant", "Minor consumables"]
    },

    garbageDisposal: {
      baseLaborMin: 250,
      baseLaborMax: 325,
      hours: 2.5,
      fixtureAllowanceMin: 120,
      fixtureAllowanceMax: 250,
      areaDamage: {
        no: { laborMin: 0, laborMax: 0 },
        cabinetDamage: { laborMin: 50, laborMax: 110 },
        waterDamage: { laborMin: 75, laborMax: 150 },
        both: { laborMin: 120, laborMax: 220 },
        notSure: { laborMin: 60, laborMax: 130 }
      },
      powerReady: {
        yes: { laborMin: 0, laborMax: 0, matMin: 0, matMax: 0 },
        no: { laborMin: 120, laborMax: 260, matMin: 30, matMax: 90 },
        notSure: { laborMin: 60, laborMax: 140, matMin: 15, matMax: 50 }
      },
      access: {
        easy: { laborMin: 0, laborMax: 0 },
        moderate: { laborMin: 35, laborMax: 80 },
        difficult: { laborMin: 80, laborMax: 160 },
        notSure: { laborMin: 40, laborMax: 90 }
      },
      materials: ["Disposal connection kit", "Discharge fittings", "Electrical connection consumables", "Minor consumables"]
    },

    shutoff: {
      baseOneLaborMin: 250,
      baseOneLaborMax: 250,
      secondValveMultiplier: 0.5,
      extraValveMultiplier: 0.4,
      baseMatMin: 20,
      baseMatMax: 45,
      access: {
        easy: { laborMin: 0, laborMax: 0 },
        moderate: { laborMin: 40, laborMax: 80 },
        difficult: { laborMin: 75, laborMax: 150 }
      },
      condition: {
        normal: { laborMin: 0, laborMax: 0 },
        old: { laborMin: 20, laborMax: 40 },
        stuck: { laborMin: 40, laborMax: 90 },
        seized: { laborMin: 75, laborMax: 160 },
        notSure: { laborMin: 30, laborMax: 70 }
      },
      materials: ["Shutoff valve(s)", "Compression fittings", "Minor consumables"]
    },

    leak: {
      accessibleLaborMin: 350,
      accessibleLaborMax: 500,
      accessibleHours: 3.5,
      behindWallLaborMin: 500,
      behindWallLaborMax: 700,
      behindWallHours: 5.5,
      accessibleMatMin: 20,
      accessibleMatMax: 80,
      behindWallMatMin: 40,
      behindWallMatMax: 120,
      duration: {
        today: { laborMin: 0, laborMax: 0 },
        fewDays: { laborMin: 40, laborMax: 80 },
        weekPlus: { laborMin: 75, laborMax: 150 },
        notSure: { laborMin: 30, laborMax: 70 }
      },
      affectedSurfaces: {
        no: { laborMin: 0, laborMax: 0 },
        wall: { laborMin: 60, laborMax: 140 },
        ceiling: { laborMin: 80, laborMax: 180 },
        floor: { laborMin: 80, laborMax: 180 },
        cabinet: { laborMin: 60, laborMax: 140 },
        multiple: { laborMin: 140, laborMax: 300 },
        notSure: { laborMin: 60, laborMax: 130 }
      },
      damageSigns: {
        no: { laborMin: 0, laborMax: 0 },
        minor: { laborMin: 40, laborMax: 100 },
        major: { laborMin: 100, laborMax: 220 },
        notSure: { laborMin: 50, laborMax: 120 }
      },
      openAccessWork: {
        yes: { laborMin: 120, laborMax: 260 },
        no: { laborMin: 0, laborMax: 0 },
        notSure: { laborMin: 70, laborMax: 160 }
      },
      repairAfterStop: {
        yes: { laborMin: 100, laborMax: 220 },
        no: { laborMin: 0, laborMax: 0 },
        notSure: { laborMin: 60, laborMax: 140 }
      },
      access: {
        easy: { type: "accessible" },
        moderate: { type: "accessible", laborMin: 40, laborMax: 90 },
        difficult: { type: "behindWall" },
        notSure: { type: "behindWall", laborMin: 0, laborMax: 0 }
      },
      materials: ["Repair fittings", "Pipe section / connector materials", "Sealants", "Minor consumables"]
    },

    newFixture: {
      baseLaborMin: 450,
      baseLaborMax: 700,
      hours: 5.0,
      fixtureAllowanceMin: 60,
      fixtureAllowanceMax: 180,
      supplyAvailable: {
        yes: { laborMin: 0, laborMax: 0 },
        no: { laborMin: 120, laborMax: 260 },
        notSure: { laborMin: 60, laborMax: 140 }
      },
      drainAvailable: {
        yes: { laborMin: 0, laborMax: 0 },
        no: { laborMin: 140, laborMax: 320 },
        notSure: { laborMin: 70, laborMax: 160 }
      },
      openingNeeded: {
        yes: { laborMin: 120, laborMax: 260 },
        no: { laborMin: 0, laborMax: 0 },
        notSure: { laborMin: 70, laborMax: 160 }
      },
      access: {
        easy: { laborMin: 0, laborMax: 0 },
        moderate: { laborMin: 100, laborMax: 180 },
        difficult: { laborMin: 220, laborMax: 400 },
        notSure: { laborMin: 120, laborMax: 220 }
      },
      repairScope: {
        installOnly: { laborMin: 0, laborMax: 0 },
        includeFinishRepairsIfNeeded: { laborMin: 60, laborMax: 140 }
      },
      materials: ["Basic fittings", "Connection materials", "Mounting / fastening consumables", "Minor consumables"]
    }
  },

  furnitureDresser: {
    base: {
      small: { totalMin: 80, totalMax: 160, hours: 1.5, label: "Small dresser assembly" },
      medium: { totalMin: 130, totalMax: 190, hours: 2, label: "Medium dresser assembly" },
      large: { totalMin: 190, totalMax: 280, hours: 2.75, label: "Large dresser assembly" },
      xlarge: { totalMin: 280, totalMax: 420, hours: 3.5, label: "Extra-large dresser assembly" },
      notSure: { totalMin: 130, totalMax: 240, hours: 2.25, label: "Dresser size to be confirmed" }
    },
    // Only removeDispose may change price. Other job-prep answers stay $0.
    oldFurniture: {
      no: { totalMin: 0, totalMax: 0 },
      moveOnly: { totalMin: 0, totalMax: 0 },
      removeDispose: { totalMin: 90, totalMax: 180, label: "Old furniture removal and disposal" },
      notSure: { totalMin: 0, totalMax: 0, manualReview: true, label: "Old furniture handling flagged for manual review" }
    },
    includedServices: [
      "Professional assembly",
      "Leveling and adjustments",
      "Included mirror attachment",
      "Basic wall anchoring when requested",
      "Movement within the home",
      "Work-area cleanup"
    ],
    materials: ["Assembly hardware included in base price", "Anchoring hardware when requested"]
  },

  furnitureBedFrame: {
    base: {
      twin: { totalMin: 90, totalMax: 160, hours: 1.75, label: "Twin bed frame assembly" },
      twinXL: { totalMin: 100, totalMax: 170, hours: 1.85, label: "Twin XL bed frame assembly" },
      full: { totalMin: 120, totalMax: 190, hours: 2, label: "Full bed frame assembly" },
      queen: { totalMin: 150, totalMax: 230, hours: 2.25, label: "Queen bed frame assembly" },
      king: { totalMin: 190, totalMax: 290, hours: 2.75, label: "King bed frame assembly" },
      californiaKing: { totalMin: 220, totalMax: 320, hours: 3, label: "California King bed frame assembly" },
      bunkBed: { totalMin: 250, totalMax: 420, hours: 3.5, label: "Bunk bed assembly" },
      loftBed: { totalMin: 280, totalMax: 450, hours: 3.75, label: "Loft bed assembly" },
      daybed: { totalMin: 150, totalMax: 260, hours: 2.25, label: "Daybed assembly" },
      otherNotSure: { totalMin: 150, totalMax: 280, hours: 2.5, label: "Bed type to be confirmed" },
      murphyBed: { manualReview: true, label: "Murphy bed — personalized review required" }
    },
    oldFurniture: {
      no: { totalMin: 0, totalMax: 0 },
      moveOnly: { totalMin: 0, totalMax: 0 },
      removeDispose: { totalMin: 90, totalMax: 180, label: "Existing bed removal and disposal" },
      notSure: { totalMin: 0, totalMax: 0, manualReview: true, label: "Existing bed handling flagged for manual review" }
    },
    includedServices: [
      "Professional assembly",
      "Included headboard and footboard installation",
      "Included drawer or storage-component assembly",
      "Final adjustments",
      "Mattress placement when requested",
      "Basic work-area cleanup"
    ],
    materials: ["Assembly hardware included in base price"]
  },

  furnitureTvStand: {
    base: {
      small: { totalMin: 90, totalMax: 160, hours: 1.75, label: "Small TV stand assembly" },
      medium: { totalMin: 140, totalMax: 220, hours: 2.25, label: "Medium TV stand assembly" },
      large: { totalMin: 190, totalMax: 290, hours: 2.75, label: "Large TV stand assembly" },
      xlarge: { totalMin: 250, totalMax: 390, hours: 3.25, label: "Extra-large TV stand assembly" },
      notSure: { totalMin: 150, totalMax: 260, hours: 2.5, label: "TV stand size to be confirmed" }
    },
    fireplace: {
      yes: { totalMin: 40, totalMax: 75, label: "Electric fireplace insert assembly and installation" },
      no: { totalMin: 0, totalMax: 0 },
      notSure: { totalMin: 0, totalMax: 0, manualReview: true, label: "Fireplace insert details require review" }
    },
    oldFurniture: {
      no: { totalMin: 0, totalMax: 0 },
      moveOnly: { totalMin: 0, totalMax: 0 },
      removeDispose: { totalMin: 90, totalMax: 180, label: "Existing TV stand removal and disposal" },
      notSure: { totalMin: 0, totalMax: 0, manualReview: true, label: "Existing TV stand handling flagged for manual review" }
    },
    includedServices: [
      "Professional assembly",
      "Doors, drawers, and shelf installation",
      "Included lighting-component assembly",
      "Final placement and adjustments",
      "Basic work-area cleanup"
    ],
    materials: ["Assembly hardware included in base price"]
  },

  furnitureDesk: {
    base: {
      smallWritingDesk: { totalMin: 80, totalMax: 140, hours: 1.5, label: "Small writing desk assembly" },
      standardDesk: { totalMin: 100, totalMax: 180, hours: 1.75, label: "Standard desk assembly" },
      largeDesk: { totalMin: 150, totalMax: 240, hours: 2.25, label: "Large desk assembly" },
      lShapedDesk: { totalMin: 180, totalMax: 290, hours: 2.75, label: "L-shaped desk assembly" },
      executiveDesk: { totalMin: 200, totalMax: 320, hours: 3.0, label: "Executive desk assembly" },
      standingDeskManual: { totalMin: 130, totalMax: 220, hours: 2.25, label: "Manual standing desk assembly" },
      standingDeskElectric: { totalMin: 160, totalMax: 260, hours: 2.5, label: "Electric standing desk assembly" },
      gamingDesk: { totalMin: 130, totalMax: 220, hours: 2.25, label: "Gaming desk assembly" },
      deskWithHutch: { totalMin: 180, totalMax: 300, hours: 2.75, label: "Desk with hutch assembly" },
      otherNotSure: { totalMin: 130, totalMax: 240, hours: 2.25, label: "Desk type to be confirmed", manualReview: true }
    },
    electricStandingDesk: {
      totalMin: 40,
      totalMax: 75,
      label: "Electric standing desk motor, controls, and testing"
    },
    oldFurniture: {
      no: { totalMin: 0, totalMax: 0 },
      moveOnly: { totalMin: 0, totalMax: 0 },
      removeDispose: { totalMin: 90, totalMax: 180, label: "Existing desk removal and disposal" },
      notSure: { totalMin: 0, totalMax: 0, manualReview: true, label: "Existing desk handling flagged for manual review" }
    },
    includedServices: [
      "Professional assembly",
      "Included drawer and shelf installation",
      "Included hutch assembly",
      "Included cable-management components",
      "Final positioning and adjustments",
      "Basic work-area cleanup"
    ],
    materials: ["Assembly hardware included in base price"]
  },

  furnitureDiningTable: {
    base: {
      small: { totalMin: 90, totalMax: 150, hours: 1.75, label: "Small dining table assembly" },
      medium: { totalMin: 130, totalMax: 210, hours: 2.25, label: "Medium dining table assembly" },
      large: { totalMin: 180, totalMax: 280, hours: 2.75, label: "Large dining table assembly" },
      extraLarge: { totalMin: 240, totalMax: 360, hours: 3.25, label: "Extra-large dining table assembly" },
      notSure: { totalMin: 150, totalMax: 260, hours: 2.5, label: "Dining table size to be confirmed", manualReview: true }
    },
    chairs: {
      none: { totalMin: 0, totalMax: 0 },
      "2": { totalMin: 25, totalMax: 40, label: "Chair assembly (2 chairs)" },
      "4": { totalMin: 50, totalMax: 80, label: "Chair assembly (4 chairs)" },
      "6": { totalMin: 75, totalMax: 120, label: "Chair assembly (6 chairs)" },
      "8": { totalMin: 100, totalMax: 160, label: "Chair assembly (8 chairs)" },
      "10": { totalMin: 125, totalMax: 200, label: "Chair assembly (10 chairs)" },
      "12": { totalMin: 150, totalMax: 240, label: "Chair assembly (12 chairs)" },
      notSure: { totalMin: 0, totalMax: 0, manualReview: true, label: "Chair quantity flagged for manual review" }
    },
    oldFurniture: {
      no: { totalMin: 0, totalMax: 0 },
      moveOnly: { totalMin: 0, totalMax: 0 },
      removeDispose: { totalMin: 90, totalMax: 180, label: "Existing dining table removal and disposal" },
      notSure: { totalMin: 0, totalMax: 0, manualReview: true, label: "Existing dining table handling flagged for manual review" }
    },
    includedServices: [
      "Professional table assembly",
      "Chair assembly (based on selected quantity)",
      "Final positioning",
      "Hardware installation",
      "Leveling and adjustments",
      "Basic work-area cleanup"
    ],
    materials: ["Assembly hardware included in base price"]
  },

  furnitureBookcase: {
    base: {
      small: { totalMin: 70, totalMax: 110, hours: 1.5, label: "Small bookshelf / bookcase assembly" },
      medium: { totalMin: 90, totalMax: 140, hours: 1.75, label: "Medium bookshelf / bookcase assembly" },
      large: { totalMin: 120, totalMax: 190, hours: 2.25, label: "Large bookshelf / bookcase assembly" },
      extraLarge: { totalMin: 160, totalMax: 260, hours: 2.75, label: "Extra-large bookshelf / bookcase assembly" },
      notSure: { totalMin: 100, totalMax: 180, hours: 2.0, label: "Bookshelf / bookcase size to be confirmed", manualReview: true }
    },
    quantity: {
      "1": { totalMin: 0, totalMax: 0 },
      "2": { totalMin: 60, totalMax: 100, label: "Additional bookshelf/bookcase units" },
      "3": { totalMin: 120, totalMax: 200, label: "Additional bookshelf/bookcase units" },
      "4": { totalMin: 180, totalMax: 300, label: "Additional bookshelf/bookcase units" },
      "5OrMore": { noAutoPrice: true, manualReview: true, label: "Five or more units require personalized review" },
      notSure: { totalMin: 0, totalMax: 0, manualReview: true, label: "Unit quantity flagged for manual review" }
    },
    oldFurniture: {
      no: { totalMin: 0, totalMax: 0 },
      moveOnly: { totalMin: 0, totalMax: 0 },
      removeDispose: { totalMin: 90, totalMax: 180, label: "Existing furniture removal and disposal" },
      notSure: { totalMin: 0, totalMax: 0, manualReview: true, label: "Existing furniture handling flagged for manual review" }
    },
    includedServices: [
      "Professional furniture assembly",
      "Shelf, door, and drawer installation",
      "Basic anti-tip wall anchoring when requested",
      "Connecting compatible adjacent units when requested",
      "Final positioning and adjustments",
      "Basic work-area cleanup"
    ],
    materials: ["Assembly hardware included in base price"]
  },

  furnitureCoffeeTable: {
    base: {
      small: { totalMin: 60, totalMax: 100, hours: 1.25, label: "Small coffee table assembly" },
      medium: { totalMin: 80, totalMax: 130, hours: 1.5, label: "Medium coffee table assembly" },
      large: { totalMin: 110, totalMax: 170, hours: 1.75, label: "Large coffee table assembly" },
      extraLarge: { totalMin: 140, totalMax: 220, hours: 2.0, label: "Extra-large coffee table assembly" },
      notSure: { totalMin: 80, totalMax: 150, hours: 1.5, label: "Coffee table size to be confirmed", manualReview: true }
    },
    oldFurniture: {
      no: { totalMin: 0, totalMax: 0 },
      moveOnly: { totalMin: 0, totalMax: 0 },
      removeDispose: { totalMin: 90, totalMax: 180, label: "Existing coffee table removal and disposal" },
      notSure: { totalMin: 0, totalMax: 0, manualReview: true, label: "Existing coffee table handling flagged for manual review" }
    },
    includedServices: [
      "Professional assembly",
      "Hardware installation",
      "Lift-top assembly",
      "Storage compartment assembly",
      "Final positioning",
      "Leveling and adjustments",
      "Basic work-area cleanup"
    ],
    materials: ["Assembly hardware included in base price"]
  },

  furnitureNightstand: {
    base: {
      small: { totalMin: 55, totalMax: 90, hours: 1.0, label: "Small nightstand assembly" },
      standard: { totalMin: 70, totalMax: 115, hours: 1.25, label: "Standard nightstand assembly" },
      large: { totalMin: 90, totalMax: 145, hours: 1.5, label: "Large nightstand assembly" },
      notSure: { totalMin: 70, totalMax: 120, hours: 1.25, label: "Nightstand size to be confirmed", manualReview: true }
    },
    quantity: {
      "1": { totalMin: 0, totalMax: 0 },
      "2": { totalMin: 40, totalMax: 70, label: "Additional nightstand units" },
      "3": { totalMin: 80, totalMax: 140, label: "Additional nightstand units" },
      "4": { totalMin: 120, totalMax: 210, label: "Additional nightstand units" },
      "5OrMore": { noAutoPrice: true, manualReview: true, label: "Five or more nightstands require personalized review" },
      notSure: { totalMin: 0, totalMax: 0, manualReview: true, label: "Nightstand quantity flagged for manual review" }
    },
    oldFurniture: {
      no: { totalMin: 0, totalMax: 0 },
      moveOnly: { totalMin: 0, totalMax: 0 },
      removeDispose: { totalMin: 90, totalMax: 180, label: "Existing furniture removal and disposal" },
      notSure: { totalMin: 0, totalMax: 0, manualReview: true, label: "Existing nightstand handling flagged for manual review" }
    },
    includedServices: [
      "Professional furniture assembly",
      "Drawer, door, and shelf installation",
      "Included lighting and charging-component connection",
      "Basic anti-tip wall anchoring when requested",
      "Final positioning and adjustments",
      "Basic work-area cleanup"
    ],
    materials: ["Assembly hardware included in base price"]
  },

  furnitureOfficeChair: {
    base: {
      basic: { totalMin: 50, totalMax: 80, hours: 0.85, label: "Basic office chair assembly" },
      standardErgonomic: { totalMin: 65, totalMax: 105, hours: 1.1, label: "Standard ergonomic office chair assembly" },
      executiveGaming: { totalMin: 80, totalMax: 130, hours: 1.35, label: "Executive / gaming chair assembly" },
      notSure: { totalMin: 65, totalMax: 110, hours: 1.1, label: "Office chair type to be confirmed", manualReview: true }
    },
    quantity: {
      "1": { totalMin: 0, totalMax: 0 },
      "2": { totalMin: 35, totalMax: 60, label: "Additional office chair units" },
      "3": { totalMin: 70, totalMax: 120, label: "Additional office chair units" },
      "4": { totalMin: 105, totalMax: 180, label: "Additional office chair units" },
      "5OrMore": { noAutoPrice: true, manualReview: true, label: "Five or more office chairs require personalized review" },
      notSure: { totalMin: 0, totalMax: 0, manualReview: true, label: "Office chair quantity flagged for manual review" }
    },
    oldFurniture: {
      no: { totalMin: 0, totalMax: 0 },
      moveOnly: { totalMin: 0, totalMax: 0 },
      removeDispose: { totalMin: 75, totalMax: 150, label: "Existing chair removal and disposal" },
      notSure: { totalMin: 0, totalMax: 0, manualReview: true, label: "Existing office chair handling flagged for manual review" }
    },
    includedServices: [
      "Professional office-chair assembly",
      "Armrest, headrest, and lumbar-support installation",
      "Reclining and footrest-component installation",
      "Connection of included electronic components",
      "Final chair adjustment and functional testing",
      "Final positioning",
      "Basic work-area cleanup"
    ],
    materials: ["Assembly hardware included in base price"]
  },

  furnitureEntertainmentCenter: {
    base: {
      compact: { totalMin: 90, totalMax: 140, hours: 1.75, label: "Compact entertainment center assembly" },
      standard: { totalMin: 130, totalMax: 210, hours: 2.25, label: "Standard entertainment center assembly" },
      large: { totalMin: 190, totalMax: 310, hours: 3.0, label: "Large entertainment center assembly" },
      wallUnit: { totalMin: 260, totalMax: 450, hours: 3.75, label: "Wall-unit entertainment center assembly" },
      notSure: { totalMin: 150, totalMax: 280, hours: 2.5, label: "Entertainment center type to be confirmed", manualReview: true }
    },
    sections: {
      "1": { totalMin: 0, totalMax: 0 },
      "2To3": { totalMin: 40, totalMax: 80, label: "Additional entertainment-center sections" },
      "4To5": { totalMin: 90, totalMax: 170, label: "Additional entertainment-center sections" },
      "6OrMore": { noAutoPrice: true, manualReview: true, label: "Six or more sections require personalized review" },
      notSure: { totalMin: 0, totalMax: 0, manualReview: true, label: "Section count flagged for manual review" }
    },
    oldFurniture: {
      no: { totalMin: 0, totalMax: 0 },
      moveOnly: { totalMin: 0, totalMax: 0 },
      removeDispose: { totalMin: 140, totalMax: 260, label: "Existing entertainment-center removal and disposal" },
      notSure: { totalMin: 0, totalMax: 0, manualReview: true, label: "Existing entertainment center handling flagged for manual review" }
    },
    includedServices: [
      "Professional furniture assembly",
      "Drawer, door, shelf, tower, and bridge installation",
      "Installation of supplied glass components",
      "Connection of included lighting and electronic components",
      "Basic anti-tip wall anchoring when requested",
      "Final positioning, leveling, and adjustments",
      "Basic work-area cleanup"
    ],
    materials: ["Assembly hardware included in base price"]
  },

  serviceZoneMultipliers: { core: 1.0, extended: 1.08, outer: 1.15, distant: 1.22 }
};

const PROPERTY_TYPE_CONFIG = {
  house: { multiplier: 1.0, message: "" },
  multifamily: {
    multiplier: 1.05,
    message: "Multi-unit properties may involve coordination between units, tighter access, and additional protection requirements. Understanding where your project is located helps us account for access, requirements, and overall project conditions."
  },
  condo: {
    multiplier: 1.08,
    message: "Condo and co-op projects may require building coordination, insurance documentation, elevator access planning, and restricted work rules. Understanding where your project is located helps us account for access, requirements, and overall project conditions."
  },
  hoa: {
    multiplier: 1.12,
    message: "HOA or managed buildings often require approvals, scheduling coordination, certificates of insurance, and restricted work hours. Understanding where your project is located helps us account for access, requirements, and overall project conditions."
  },
  commercial: {
    multiplier: 1.15,
    message: "Commercial projects may require additional compliance, coordination, safety procedures, and licensed trade documentation. Understanding where your project is located helps us account for access, requirements, and overall project conditions."
  },
  notSure: {
    multiplier: 1.08,
    message: "Property-specific requirements will be confirmed during project review. Understanding where your project is located helps us account for access, requirements, and overall project conditions."
  }
};

/**
 * AI Design pricing config (editable later without rewriting the estimator).
 * REVIEW PLACEHOLDERS: temporary numbers so the live flow can be reviewed.
 * Replace with Carlos-approved values; keep nulls in locationFactors until real ZIP data exists.
 */
const AI_DESIGN_LOCATION_FACTORS = {
  // Example only — do not treat as approved market data:
  // "06460": { town: "Milford", factor: null, lastReviewed: null },
  default: {
    factor: null
  }
};

const AI_DESIGN_FINISH_LEVELS = {
  essential: {
    label: "Essential Finish",
    // TEMP REVIEW PLACEHOLDER — replace with approved adjustment
    adjustment: 1.0
  },
  enhanced: {
    label: "Enhanced Finish",
    // TEMP REVIEW PLACEHOLDER — replace with approved adjustment
    adjustment: 1.25
  },
  premium: {
    label: "Premium Finish",
    // TEMP REVIEW PLACEHOLDER — replace with approved adjustment
    adjustment: 1.55
  }
};

// TEMP REVIEW PLACEHOLDER base ranges by space type (min/max before ZIP × finish).
// Replace with Carlos-approved project base ranges.
const AI_DESIGN_BASE_BY_SPACE = {
  kitchen: { min: 12000, max: 22000 },
  bathroom: { min: 8000, max: 15000 },
  living_area: { min: 7000, max: 14000 },
  bedroom: { min: 5000, max: 10000 },
  whole_home_area: { min: 18000, max: 36000 },
  other: { min: 9000, max: 18000 }
};

const AI_DESIGN_GOAL_FACTORS = {
  refresh: 0.75,
  partial_remodel: 1.0,
  full_remodel: 1.35,
  design_consult: 0.55
};

const AI_DESIGN_SIZE_FACTORS = {
  small: 0.85,
  medium: 1.0,
  large: 1.3,
  not_sure: 1.05
};

const AI_DESIGN_CONDITION_FACTORS = {
  good: 0.95,
  fair: 1.0,
  poor: 1.18,
  not_sure: 1.08
};

const AI_DESIGN_LAYOUT_FACTORS = {
  none: 1.0,
  minor: 1.12,
  major: 1.35,
  not_sure: 1.1
};

/** Used only when a ZIP/default factor is still null — review display only. */
const AI_DESIGN_TEMP_DEFAULT_LOCATION_FACTOR = 1.0;

const drywallContextConfig = {
  wall: {
    scopeLabel: "Size of the affected wall or area",
    scopeOptions: [
      { value: "small-area", label: "Small wall area (less than 4 ft)" },
      { value: "standard-surface", label: "Standard wall (up to 8 ft)" },
      { value: "large-surface", label: "Large wall (more than 8 ft)" },
      { value: "connected-surfaces", label: "Multiple connected walls" }
    ],
    paintLabel: "What area should be painted?",
    paintOptions: [
      { value: "patch-only", label: "Only the patch area" },
      { value: "full-surface", label: "Entire wall" },
      { value: "connected-surfaces", label: "Connected walls" },
      { value: "not-sure", label: "Not sure" }
    ],
    summaryMap: {
      standardSurface: "Adjustment for standard wall",
      largeSurface: "Adjustment for large wall",
      connectedSurfaces: "Adjustment for multiple connected walls",
      fullSurfacePaint: "Includes painting the full wall",
      connectedSurfacePaint: "Includes painting connected walls"
    }
  },
  ceiling: {
    scopeLabel: "Size of the affected ceiling area",
    scopeOptions: [
      { value: "small-area", label: "Small ceiling area (less than 4 ft)" },
      { value: "standard-surface", label: "Standard ceiling section (up to 8 ft)" },
      { value: "large-surface", label: "Large ceiling area (more than 8 ft)" },
      { value: "connected-surfaces", label: "Multiple connected ceiling areas" }
    ],
    paintLabel: "What ceiling area should be painted?",
    paintOptions: [
      { value: "patch-only", label: "Only the patch area" },
      { value: "full-surface", label: "Entire ceiling area" },
      { value: "connected-surfaces", label: "Connected ceiling areas" },
      { value: "not-sure", label: "Not sure" }
    ],
    summaryMap: {
      standardSurface: "Adjustment for standard ceiling section",
      largeSurface: "Adjustment for large ceiling area",
      connectedSurfaces: "Adjustment for multiple connected ceiling areas",
      fullSurfacePaint: "Includes painting the full ceiling area",
      connectedSurfacePaint: "Includes painting connected ceiling areas"
    }
  }
};

const lightingPaintScopeConfig = {
  wall: {
    label: "What area should be painted?",
    options: [
      { value: "patchOnly", label: "Patch area only" },
      { value: "fullSurface", label: "The whole wall" },
      { value: "notSure", label: "Not sure" }
    ]
  },
  ceiling: {
    label: "What area should be painted?",
    options: [
      { value: "patchOnly", label: "Patch area only" },
      { value: "fullSurface", label: "The whole ceiling" },
      { value: "notSure", label: "Not sure" }
    ]
  },
  exterior: {
    label: "What area should be painted?",
    options: [
      { value: "patchOnly", label: "Repair area only" },
      { value: "fullSurface", label: "Full affected area" },
      { value: "notSure", label: "Not sure" }
    ]
  }
};

let currentStep = 1;
let latestEstimate = null;
let coldLeadSubmitted = false;
let hotLeadSubmitted = false;
let selectedAiFinishLevel = null;

const form = document.getElementById("estimatorForm");
const results = document.getElementById("results");
const stepper = document.getElementById("stepper");
const stepPanels = document.querySelectorAll(".step-panel");
const stepPills = document.querySelectorAll("[data-step-pill]");

const materialsOutput = document.getElementById("materials");
const laborOutput = document.getElementById("labor");
const totalOutput = document.getElementById("total");
const workingPriceOutput = document.getElementById("workingPriceOutput");
const breakdownList = document.getElementById("breakdownList");
const resultsProjectName = document.getElementById("resultsProjectName");
const resultsHeading = document.getElementById("resultsHeading");
const resultsIntro = document.getElementById("resultsIntro");
const resultsDisclaimer = document.getElementById("resultsDisclaimer");
const tradeResultsBlock = document.getElementById("tradeResultsBlock");
const aiDesignResultsBlock = document.getElementById("aiDesignResultsBlock");
const aiDesignZipDisplay = document.getElementById("aiDesignZipDisplay");
const aiDesignFactorDisplay = document.getElementById("aiDesignFactorDisplay");
const aiDesignFactorSource = document.getElementById("aiDesignFactorSource");
const aiRangeEssential = document.getElementById("aiRangeEssential");
const aiRangeEnhanced = document.getElementById("aiRangeEnhanced");
const aiRangePremium = document.getElementById("aiRangePremium");
const aiDesignWorkingPriceOutput = document.getElementById("aiDesignWorkingPriceOutput");
const aiDesignSelectionNote = document.getElementById("aiDesignSelectionNote");
const aiDesignFinishGrid = document.getElementById("aiDesignFinishGrid");
const aiDesignReviewBanner = document.getElementById("aiDesignReviewBanner");

const hotLeadBtn = document.getElementById("hotLeadBtn");
const doneBtn = document.getElementById("doneBtn");
const payNowBtn = document.getElementById("payNowBtn");
const submitPaymentBtn = document.getElementById("submitPaymentBtn");
const cancelPaymentBtn = document.getElementById("cancelPaymentBtn");
const paymentSection = document.getElementById("paymentSection");
const hotCompletionScreen = document.getElementById("hotCompletionScreen");
const doneCompletionScreen = document.getElementById("doneCompletionScreen");
const startNewFromHot = document.getElementById("startNewFromHot");
const startNewFromDone = document.getElementById("startNewFromDone");

const projectType = document.getElementById("projectType");
const projectDisplayName = document.getElementById("projectDisplayName");
const selectedProjectLabel = document.getElementById("selectedProjectLabel");
const selectedProjectSubLabel = document.getElementById("selectedProjectSubLabel");
const selectedProjectMessageText = document.getElementById("selectedProjectMessageText");
const selectedProjectMessage = document.getElementById("selectedProjectMessage");
const projectSelectorShell = document.getElementById("projectSelectorShell");
const projectSelectorTrigger = document.getElementById("projectSelectorTrigger");
const selectProjectSection = document.getElementById("selectProjectSection");
const startEstimateCta = document.getElementById("startEstimateCta");

const drywallProjectOption = document.getElementById("drywallProjectOption");
const lightingProjectOption = document.getElementById("lightingProjectOption");
const paintProjectOption = document.getElementById("paintProjectOption");
const aiDesignProjectOption = document.getElementById("aiDesignProjectOption");
const dresserAssemblyProjectOption = document.getElementById("dresserAssemblyProjectOption");
const bedFrameAssemblyProjectOption = document.getElementById("bedFrameAssemblyProjectOption");
const tvStandAssemblyProjectOption = document.getElementById("tvStandAssemblyProjectOption");
const deskAssemblyProjectOption = document.getElementById("deskAssemblyProjectOption");
const diningTableAssemblyProjectOption = document.getElementById("diningTableAssemblyProjectOption");
const bookcaseAssemblyProjectOption = document.getElementById("bookcaseAssemblyProjectOption");
const coffeeTableAssemblyProjectOption = document.getElementById("coffeeTableAssemblyProjectOption");
const nightstandAssemblyProjectOption = document.getElementById("nightstandAssemblyProjectOption");
const officeChairAssemblyProjectOption = document.getElementById("officeChairAssemblyProjectOption");
const entertainmentCenterAssemblyProjectOption = document.getElementById("entertainmentCenterAssemblyProjectOption");
const tvMountProjectOption = document.getElementById("tvMountProjectOption");
const plumbingFaucetProjectOption = document.getElementById("plumbingFaucetProjectOption");
const plumbingToiletProjectOption = document.getElementById("plumbingToiletProjectOption");
const plumbingVanityProjectOption = document.getElementById("plumbingVanityProjectOption");
const plumbingDisposalProjectOption = document.getElementById("plumbingDisposalProjectOption");
const plumbingShutoffProjectOption = document.getElementById("plumbingShutoffProjectOption");
const plumbingLeakProjectOption = document.getElementById("plumbingLeakProjectOption");
const plumbingNewFixtureProjectOption = document.getElementById("plumbingNewFixtureProjectOption");

const validationStep1 = document.getElementById("validationStep1");
const validationStep2 = document.getElementById("validationStep2");
const validationStep3 = document.getElementById("validationStep3");
const validationStep4 = document.getElementById("validationStep4");

const basicsSubtitle = document.getElementById("basicsSubtitle");
const detailsSubtitle = document.getElementById("detailsSubtitle");

const propertyTypeGlobal = document.getElementById("propertyType");
const propertyTypeMessage = document.getElementById("propertyTypeMessage");

const drywallBasicsSection = document.getElementById("drywallBasicsSection");
const lightingBasicsSection = document.getElementById("lightingBasicsSection");
const tvMountBasicsSection = document.getElementById("tvMountBasicsSection");
const paintBasicsSection = document.getElementById("paintBasicsSection");
const aiDesignBasicsSection = document.getElementById("aiDesignBasicsSection");
const dresserBasicsSection = document.getElementById("dresserBasicsSection");
const bedFrameBasicsSection = document.getElementById("bedFrameBasicsSection");
const tvStandBasicsSection = document.getElementById("tvStandBasicsSection");
const deskBasicsSection = document.getElementById("deskBasicsSection");
const diningTableBasicsSection = document.getElementById("diningTableBasicsSection");
const bookcaseBasicsSection = document.getElementById("bookcaseBasicsSection");
const coffeeTableBasicsSection = document.getElementById("coffeeTableBasicsSection");
const nightstandBasicsSection = document.getElementById("nightstandBasicsSection");
const officeChairBasicsSection = document.getElementById("officeChairBasicsSection");
const entertainmentCenterBasicsSection = document.getElementById("entertainmentCenterBasicsSection");
const plumbingBasicsSection = document.getElementById("plumbingBasicsSection");

const drywallDetailsSection = document.getElementById("drywallDetailsSection");
const lightingDetailsSection = document.getElementById("lightingDetailsSection");
const tvMountDetailsSection = document.getElementById("tvMountDetailsSection");
const paintDetailsSection = document.getElementById("paintDetailsSection");
const aiDesignDetailsSection = document.getElementById("aiDesignDetailsSection");
const dresserDetailsSection = document.getElementById("dresserDetailsSection");
const bedFrameDetailsSection = document.getElementById("bedFrameDetailsSection");
const tvStandDetailsSection = document.getElementById("tvStandDetailsSection");
const deskDetailsSection = document.getElementById("deskDetailsSection");
const diningTableDetailsSection = document.getElementById("diningTableDetailsSection");
const bookcaseDetailsSection = document.getElementById("bookcaseDetailsSection");
const coffeeTableDetailsSection = document.getElementById("coffeeTableDetailsSection");
const nightstandDetailsSection = document.getElementById("nightstandDetailsSection");
const officeChairDetailsSection = document.getElementById("officeChairDetailsSection");
const entertainmentCenterDetailsSection = document.getElementById("entertainmentCenterDetailsSection");
const plumbingDetailsSection = document.getElementById("plumbingDetailsSection");

const dresserSize = document.getElementById("dresserSize");
const dresserBrand = document.getElementById("dresserBrand");
const dresserAlreadyInRoom = document.getElementById("dresserAlreadyInRoom");
const dresserCarryStairs = document.getElementById("dresserCarryStairs");
const dresserCarryStairsField = document.getElementById("dresserCarryStairsField");
const dresserWallAnchoring = document.getElementById("dresserWallAnchoring");
const dresserWallType = document.getElementById("dresserWallType");
const dresserWallTypeField = document.getElementById("dresserWallTypeField");
const dresserMirror = document.getElementById("dresserMirror");
const dresserPackagingRemoval = document.getElementById("dresserPackagingRemoval");
const dresserOldFurniture = document.getElementById("dresserOldFurniture");
const dresserHasProductLink = document.getElementById("dresserHasProductLink");
const dresserProductLink = document.getElementById("dresserProductLink");
const dresserProductLinkField = document.getElementById("dresserProductLinkField");
const notesDresser = document.getElementById("notesDresser");
const projectFilesDresser = document.getElementById("projectFilesDresser");

const bedType = document.getElementById("bedType");
const bedBrand = document.getElementById("bedBrand");
const bedAlreadyInRoom = document.getElementById("bedAlreadyInRoom");
const bedOldFurniture = document.getElementById("bedOldFurniture");
const bedHasStorage = document.getElementById("bedHasStorage");
const bedHasHeadboard = document.getElementById("bedHasHeadboard");
const bedHasFootboard = document.getElementById("bedHasFootboard");
const bedMattressPlacement = document.getElementById("bedMattressPlacement");
const bedPackagingCleanup = document.getElementById("bedPackagingCleanup");
const bedHasProductLink = document.getElementById("bedHasProductLink");
const bedProductLink = document.getElementById("bedProductLink");
const bedProductLinkField = document.getElementById("bedProductLinkField");
const bedMurphyHelpNote = document.getElementById("bedMurphyHelpNote");
const notesBedFrame = document.getElementById("notesBedFrame");
const projectFilesBedFrame = document.getElementById("projectFilesBedFrame");

const tvStandSize = document.getElementById("tvStandSize");
const tvStandBrand = document.getElementById("tvStandBrand");
const tvStandAlreadyInRoom = document.getElementById("tvStandAlreadyInRoom");
const tvStandOldFurniture = document.getElementById("tvStandOldFurniture");
const tvStandHasFireplace = document.getElementById("tvStandHasFireplace");
const tvStandHasLighting = document.getElementById("tvStandHasLighting");
const tvStandHasGlass = document.getElementById("tvStandHasGlass");
const tvStandFinalPositioning = document.getElementById("tvStandFinalPositioning");
const tvStandPackagingCleanup = document.getElementById("tvStandPackagingCleanup");
const tvStandHasProductLink = document.getElementById("tvStandHasProductLink");
const tvStandProductLink = document.getElementById("tvStandProductLink");
const tvStandProductLinkField = document.getElementById("tvStandProductLinkField");
const notesTvStand = document.getElementById("notesTvStand");
const projectFilesTvStand = document.getElementById("projectFilesTvStand");

const deskType = document.getElementById("deskType");
const deskBrand = document.getElementById("deskBrand");
const deskAlreadyInRoom = document.getElementById("deskAlreadyInRoom");
const deskOldFurniture = document.getElementById("deskOldFurniture");
const deskHasDrawers = document.getElementById("deskHasDrawers");
const deskHasHutch = document.getElementById("deskHasHutch");
const deskHasPowerComponents = document.getElementById("deskHasPowerComponents");
const deskFinalPositioning = document.getElementById("deskFinalPositioning");
const deskPackagingCleanup = document.getElementById("deskPackagingCleanup");
const deskHasProductLink = document.getElementById("deskHasProductLink");
const deskProductLink = document.getElementById("deskProductLink");
const deskProductLinkField = document.getElementById("deskProductLinkField");
const deskElectricNote = document.getElementById("deskElectricNote");
const notesDesk = document.getElementById("notesDesk");
const projectFilesDesk = document.getElementById("projectFilesDesk");

const diningTableSize = document.getElementById("diningTableSize");
const diningTableChairQuantity = document.getElementById("diningTableChairQuantity");
const diningTableBrand = document.getElementById("diningTableBrand");
const diningTableAlreadyInRoom = document.getElementById("diningTableAlreadyInRoom");
const diningTableExistingTable = document.getElementById("diningTableExistingTable");
const diningTableExtensionLeaf = document.getElementById("diningTableExtensionLeaf");
const diningTableGlassTop = document.getElementById("diningTableGlassTop");
const diningTableFinalPositioning = document.getElementById("diningTableFinalPositioning");
const diningTablePackagingCleanup = document.getElementById("diningTablePackagingCleanup");
const diningTableHasProductLink = document.getElementById("diningTableHasProductLink");
const diningTableProductLink = document.getElementById("diningTableProductLink");
const diningTableProductLinkField = document.getElementById("diningTableProductLinkField");
const notesDiningTable = document.getElementById("notesDiningTable");
const projectFilesDiningTable = document.getElementById("projectFilesDiningTable");

const bookcaseProjectType = document.getElementById("bookcaseProjectType");
const bookcaseCustomHelpNote = document.getElementById("bookcaseCustomHelpNote");
const bookcaseSize = document.getElementById("bookcaseSize");
const bookcaseQuantity = document.getElementById("bookcaseQuantity");
const bookcaseQuantityHelpNote = document.getElementById("bookcaseQuantityHelpNote");
const bookcaseBrand = document.getElementById("bookcaseBrand");
const bookcaseAlreadyInRoom = document.getElementById("bookcaseAlreadyInRoom");
const bookcaseExistingFurniture = document.getElementById("bookcaseExistingFurniture");
const bookcaseHasDoorsDrawers = document.getElementById("bookcaseHasDoorsDrawers");
const bookcaseHasGlass = document.getElementById("bookcaseHasGlass");
const bookcaseHasLighting = document.getElementById("bookcaseHasLighting");
const bookcaseWallAnchoring = document.getElementById("bookcaseWallAnchoring");
const bookcaseConnectUnits = document.getElementById("bookcaseConnectUnits");
const bookcaseConnectUnitsField = document.getElementById("bookcaseConnectUnitsField");
const bookcaseFinalPositioning = document.getElementById("bookcaseFinalPositioning");
const bookcasePackagingCleanup = document.getElementById("bookcasePackagingCleanup");
const bookcaseHasProductLink = document.getElementById("bookcaseHasProductLink");
const bookcaseProductLink = document.getElementById("bookcaseProductLink");
const bookcaseProductLinkField = document.getElementById("bookcaseProductLinkField");
const notesBookcase = document.getElementById("notesBookcase");
const projectFilesBookcase = document.getElementById("projectFilesBookcase");

const coffeeTableSize = document.getElementById("coffeeTableSize");
const coffeeTableBrand = document.getElementById("coffeeTableBrand");
const coffeeTableAlreadyInRoom = document.getElementById("coffeeTableAlreadyInRoom");
const coffeeTableExistingTable = document.getElementById("coffeeTableExistingTable");
const coffeeTableStorage = document.getElementById("coffeeTableStorage");
const coffeeTableLiftTop = document.getElementById("coffeeTableLiftTop");
const coffeeTableGlass = document.getElementById("coffeeTableGlass");
const coffeeTableFinalPositioning = document.getElementById("coffeeTableFinalPositioning");
const coffeeTablePackagingCleanup = document.getElementById("coffeeTablePackagingCleanup");
const coffeeTableHasProductLink = document.getElementById("coffeeTableHasProductLink");
const coffeeTableProductLink = document.getElementById("coffeeTableProductLink");
const coffeeTableProductLinkField = document.getElementById("coffeeTableProductLinkField");
const notesCoffeeTable = document.getElementById("notesCoffeeTable");
const projectFilesCoffeeTable = document.getElementById("projectFilesCoffeeTable");

const nightstandSize = document.getElementById("nightstandSize");
const nightstandQuantity = document.getElementById("nightstandQuantity");
const nightstandQuantityHelpNote = document.getElementById("nightstandQuantityHelpNote");
const nightstandBrand = document.getElementById("nightstandBrand");
const nightstandAlreadyInRoom = document.getElementById("nightstandAlreadyInRoom");
const nightstandExistingFurniture = document.getElementById("nightstandExistingFurniture");
const nightstandHasDrawers = document.getElementById("nightstandHasDrawers");
const nightstandHasDoors = document.getElementById("nightstandHasDoors");
const nightstandHasPowerComponents = document.getElementById("nightstandHasPowerComponents");
const nightstandHasGlass = document.getElementById("nightstandHasGlass");
const nightstandWallAnchoring = document.getElementById("nightstandWallAnchoring");
const nightstandFinalPositioning = document.getElementById("nightstandFinalPositioning");
const nightstandPackagingCleanup = document.getElementById("nightstandPackagingCleanup");
const nightstandHasProductLink = document.getElementById("nightstandHasProductLink");
const nightstandProductLink = document.getElementById("nightstandProductLink");
const nightstandProductLinkField = document.getElementById("nightstandProductLinkField");
const notesNightstand = document.getElementById("notesNightstand");
const projectFilesNightstand = document.getElementById("projectFilesNightstand");

const officeChairType = document.getElementById("officeChairType");
const officeChairQuantity = document.getElementById("officeChairQuantity");
const officeChairQuantityHelpNote = document.getElementById("officeChairQuantityHelpNote");
const officeChairBrand = document.getElementById("officeChairBrand");
const officeChairAlreadyInRoom = document.getElementById("officeChairAlreadyInRoom");
const officeChairExistingFurniture = document.getElementById("officeChairExistingFurniture");
const officeChairHasAdjustableArmrests = document.getElementById("officeChairHasAdjustableArmrests");
const officeChairHasHeadrestLumbar = document.getElementById("officeChairHasHeadrestLumbar");
const officeChairHasRecliningFootrest = document.getElementById("officeChairHasRecliningFootrest");
const officeChairHasElectronicFeatures = document.getElementById("officeChairHasElectronicFeatures");
const officeChairAdjustmentTesting = document.getElementById("officeChairAdjustmentTesting");
const officeChairFinalPositioning = document.getElementById("officeChairFinalPositioning");
const officeChairPackagingCleanup = document.getElementById("officeChairPackagingCleanup");
const officeChairHasProductLink = document.getElementById("officeChairHasProductLink");
const officeChairProductLink = document.getElementById("officeChairProductLink");
const officeChairProductLinkField = document.getElementById("officeChairProductLinkField");
const notesOfficeChair = document.getElementById("notesOfficeChair");
const projectFilesOfficeChair = document.getElementById("projectFilesOfficeChair");

const entertainmentCenterType = document.getElementById("entertainmentCenterType");
const entertainmentCenterSectionCount = document.getElementById("entertainmentCenterSectionCount");
const entertainmentCenterSectionHelpNote = document.getElementById("entertainmentCenterSectionHelpNote");
const entertainmentCenterBrand = document.getElementById("entertainmentCenterBrand");
const entertainmentCenterAlreadyInRoom = document.getElementById("entertainmentCenterAlreadyInRoom");
const entertainmentCenterExistingFurniture = document.getElementById("entertainmentCenterExistingFurniture");
const entertainmentCenterHasStorageComponents = document.getElementById("entertainmentCenterHasStorageComponents");
const entertainmentCenterHasTowersBridge = document.getElementById("entertainmentCenterHasTowersBridge");
const entertainmentCenterHasGlass = document.getElementById("entertainmentCenterHasGlass");
const entertainmentCenterHasElectronicComponents = document.getElementById("entertainmentCenterHasElectronicComponents");
const entertainmentCenterWallAnchoring = document.getElementById("entertainmentCenterWallAnchoring");
const entertainmentCenterTvPlacement = document.getElementById("entertainmentCenterTvPlacement");
const entertainmentCenterFinalPositioning = document.getElementById("entertainmentCenterFinalPositioning");
const entertainmentCenterPackagingCleanup = document.getElementById("entertainmentCenterPackagingCleanup");
const entertainmentCenterHasProductLink = document.getElementById("entertainmentCenterHasProductLink");
const entertainmentCenterProductLink = document.getElementById("entertainmentCenterProductLink");
const entertainmentCenterProductLinkField = document.getElementById("entertainmentCenterProductLinkField");
const notesEntertainmentCenter = document.getElementById("notesEntertainmentCenter");
const projectFilesEntertainmentCenter = document.getElementById("projectFilesEntertainmentCenter");

const aiDesignSpaceType = document.getElementById("aiDesignSpaceType");
const aiDesignProjectGoal = document.getElementById("aiDesignProjectGoal");
const aiDesignApproxSize = document.getElementById("aiDesignApproxSize");
const aiDesignCurrentCondition = document.getElementById("aiDesignCurrentCondition");
const aiDesignLayoutChange = document.getElementById("aiDesignLayoutChange");
const aiDesignPriority = document.getElementById("aiDesignPriority");
const notesAiDesign = document.getElementById("notesAiDesign");
const projectFilesAiDesign = document.getElementById("projectFilesAiDesign");

const damageLocation = document.getElementById("damageLocation");
const damageSize = document.getElementById("damageSize");
const scopeContext = document.getElementById("scopeContext");
const texture = document.getElementById("texture");
const paintRequired = document.getElementById("paintRequired");
const paintAvailable = document.getElementById("paintAvailable");
const insulation = document.getElementById("insulation");
const ceilingHeight = { value: "standard" };
const obstacles = document.getElementById("obstacles");
const notes = document.getElementById("notes");
const projectFiles = document.getElementById("projectFiles");

const scopeContextLabel = document.getElementById("scopeContextLabel");
const lightingLocation = document.getElementById("lightingLocation");
const fixtureCount = document.getElementById("fixtureCount");
const fixtureType = document.getElementById("fixtureType");
const accessDifficulty = document.getElementById("accessDifficulty");
const wireRun = document.getElementById("wireRun");
const atticAccess = document.getElementById("atticAccess");
const fixtureSupplied = document.getElementById("fixtureSupplied");
const newSwitch = document.getElementById("newSwitch");
const repairIncluded = document.getElementById("repairIncluded");
const paintAfterRepair = document.getElementById("paintAfterRepair");
const paintLightingScope = document.getElementById("paintLightingScope");
const paintLightingScopeLabel = document.getElementById("paintLightingScopeLabel");
const atticAccessLabel = document.getElementById("atticAccessLabel");
const lightingHeight = document.getElementById("lightingHeight");
const lightingObstacles = document.getElementById("lightingObstacles");
const notesLighting = document.getElementById("notesLighting");
const projectFilesLighting = document.getElementById("projectFilesLighting");

const lightingWireRunField = document.getElementById("lightingWireRunField");
const lightingAtticAccessField = document.getElementById("lightingAtticAccessField");
const lightingSwitchField = document.getElementById("lightingSwitchField");
const lightingRepairField = document.getElementById("lightingRepairField");
const lightingPaintYesNoField = document.getElementById("lightingPaintYesNoField");
const lightingPaintScopeField = document.getElementById("lightingPaintScopeField");

const mountType = document.getElementById("mountType");
const wallType = document.getElementById("wallType");
const tvSize = document.getElementById("tvSize");
const mountProvided = document.getElementById("mountProvided");
const existingOutlet = document.getElementById("existingOutlet");
const wireConceal = document.getElementById("wireConceal");
const powerWork = document.getElementById("powerWork");
const lowVoltage = document.getElementById("lowVoltage");
const soundbarInstall = document.getElementById("soundbarInstall");
const wallPatchPaint = document.getElementById("wallPatchPaint");
const mountHeight = document.getElementById("mountHeight");
const notesTvMount = document.getElementById("notesTvMount");

const powerWorkWrap = document.getElementById("powerWorkWrap");
const lowVoltageWrap = document.getElementById("lowVoltageWrap");

const paintScopeCheckboxes = document.querySelectorAll('input[name="paintScope"]');
const paintRoomSize = document.getElementById("paintRoomSize");
const paintRoomCount = document.getElementById("paintRoomCount");
const paintColorChange = document.getElementById("paintColorChange");
const paintCeilingHeight = document.getElementById("paintCeilingHeight");
const paintCeilingHeightField = document.getElementById("paintCeilingHeightField");
const paintSurfaceCondition = document.getElementById("paintSurfaceCondition");
const paintSurfaceConditionField = document.getElementById("paintSurfaceConditionField");
const paintFinishLevel = document.getElementById("paintFinishLevel");
const paintPropertyType = document.getElementById("paintPropertyType");
const paintAccessDifficulty = document.getElementById("paintAccessDifficulty");
const paintHandling = document.getElementById("paintHandling");
const paintObstacles = document.getElementById("paintObstacles");
const paintYearBuilt = document.getElementById("paintYearBuilt");
const paintLeadPrepMode = document.getElementById("paintLeadPrepMode");
const paintLeadPrepField = document.getElementById("paintLeadPrepField");
const paintNotes = document.getElementById("paintNotes");
const projectFilesPaint = document.getElementById("projectFilesPaint");

// Plumbing basics
const plumbingBasicsFaucet = document.getElementById("plumbingBasicsFaucet");
const plumbingBasicsToilet = document.getElementById("plumbingBasicsToilet");
const plumbingBasicsVanity = document.getElementById("plumbingBasicsVanity");
const plumbingBasicsDisposal = document.getElementById("plumbingBasicsDisposal");
const plumbingBasicsShutoff = document.getElementById("plumbingBasicsShutoff");
const plumbingBasicsLeak = document.getElementById("plumbingBasicsLeak");
const plumbingBasicsNewInstall = document.getElementById("plumbingBasicsNewInstall");

const plumbingFaucetReason = document.getElementById("plumbingFaucetReason");
const plumbingFaucetLocation = document.getElementById("plumbingFaucetLocation");
const plumbingFaucetSeverity = document.getElementById("plumbingFaucetSeverity");

const plumbingToiletReason = document.getElementById("plumbingToiletReason");
const plumbingToiletLocation = document.getElementById("plumbingToiletLocation");
const plumbingToiletSeverity = document.getElementById("plumbingToiletSeverity");

const plumbingVanityReason = document.getElementById("plumbingVanityReason");
const plumbingVanityLocation = document.getElementById("plumbingVanityLocation");
const plumbingVanitySeverity = document.getElementById("plumbingVanitySeverity");

const plumbingDisposalReason = document.getElementById("plumbingDisposalReason");
const plumbingDisposalLocation = document.getElementById("plumbingDisposalLocation");
const plumbingDisposalSeverity = document.getElementById("plumbingDisposalSeverity");

const plumbingShutoffReason = document.getElementById("plumbingShutoffReason");
const plumbingShutoffLocation = document.getElementById("plumbingShutoffLocation");
const plumbingShutoffSeverity = document.getElementById("plumbingShutoffSeverity");

const plumbingLeakType = document.getElementById("plumbingLeakType");
const plumbingLeakLocation = document.getElementById("plumbingLeakLocation");
const plumbingLeakCondition = document.getElementById("plumbingLeakCondition");

const plumbingNewInstallGoal = document.getElementById("plumbingNewInstallGoal");
const plumbingNewInstallLocation = document.getElementById("plumbingNewInstallLocation");
const plumbingNewInstallCondition = document.getElementById("plumbingNewInstallCondition");

// Plumbing details
const plumbingDetailsFaucet = document.getElementById("plumbingDetailsFaucet");
const plumbingDetailsToilet = document.getElementById("plumbingDetailsToilet");
const plumbingDetailsVanity = document.getElementById("plumbingDetailsVanity");
const plumbingDetailsDisposal = document.getElementById("plumbingDetailsDisposal");
const plumbingDetailsShutoff = document.getElementById("plumbingDetailsShutoff");
const plumbingDetailsLeak = document.getElementById("plumbingDetailsLeak");
const plumbingDetailsNewInstall = document.getElementById("plumbingDetailsNewInstall");

const plumbingFaucetHasFixture = document.getElementById("plumbingFaucetHasFixture");
const plumbingFaucetShutoffCondition = document.getElementById("plumbingFaucetShutoffCondition");
const plumbingFaucetAccessDifficulty = document.getElementById("plumbingFaucetAccessDifficulty");
const plumbingFaucetVisibleDamage = document.getElementById("plumbingFaucetVisibleDamage");
const projectFilesPlumbingFaucet = document.getElementById("projectFilesPlumbingFaucet");
const notesPlumbingFaucet = document.getElementById("notesPlumbingFaucet");

const plumbingToiletLoose = document.getElementById("plumbingToiletLoose");
const plumbingToiletFloorIssue = document.getElementById("plumbingToiletFloorIssue");
const plumbingToiletHasFixture = document.getElementById("plumbingToiletHasFixture");
const plumbingToiletRepairScope = document.getElementById("plumbingToiletRepairScope");
const plumbingToiletAccessDifficulty = document.getElementById("plumbingToiletAccessDifficulty");
const projectFilesPlumbingToilet = document.getElementById("projectFilesPlumbingToilet");
const notesPlumbingToilet = document.getElementById("notesPlumbingToilet");

const plumbingVanityIncluded = document.getElementById("plumbingVanityIncluded");
const plumbingVanitySameSize = document.getElementById("plumbingVanitySameSize");
const plumbingVanityHasFixture = document.getElementById("plumbingVanityHasFixture");
const plumbingVanityFinishTouchup = document.getElementById("plumbingVanityFinishTouchup");
const plumbingVanityLeakDamage = document.getElementById("plumbingVanityLeakDamage");
const plumbingVanityScope = document.getElementById("plumbingVanityScope");
const projectFilesPlumbingVanity = document.getElementById("projectFilesPlumbingVanity");
const notesPlumbingVanity = document.getElementById("notesPlumbingVanity");

const plumbingDisposalHasFixture = document.getElementById("plumbingDisposalHasFixture");
const plumbingDisposalAreaDamage = document.getElementById("plumbingDisposalAreaDamage");
const plumbingDisposalPowerReady = document.getElementById("plumbingDisposalPowerReady");
const plumbingDisposalScope = document.getElementById("plumbingDisposalScope");
const plumbingDisposalAccessDifficulty = document.getElementById("plumbingDisposalAccessDifficulty");
const projectFilesPlumbingDisposal = document.getElementById("projectFilesPlumbingDisposal");
const notesPlumbingDisposal = document.getElementById("notesPlumbingDisposal");

const plumbingValveCount = document.getElementById("plumbingValveCount");
const plumbingValveAccess = document.getElementById("plumbingValveAccess");
const plumbingValveCondition = document.getElementById("plumbingValveCondition");
const plumbingValvePartOfOtherProject = document.getElementById("plumbingValvePartOfOtherProject");
const plumbingValveScope = document.getElementById("plumbingValveScope");
const projectFilesPlumbingShutoff = document.getElementById("projectFilesPlumbingShutoff");
const notesPlumbingShutoff = document.getElementById("notesPlumbingShutoff");

const plumbingLeakDuration = document.getElementById("plumbingLeakDuration");
const plumbingLeakAffectedSurfaces = document.getElementById("plumbingLeakAffectedSurfaces");
const plumbingLeakDamageSigns = document.getElementById("plumbingLeakDamageSigns");
const plumbingLeakOpenAccessWork = document.getElementById("plumbingLeakOpenAccessWork");
const plumbingLeakRepairAfterStop = document.getElementById("plumbingLeakRepairAfterStop");
const plumbingLeakAccessDifficulty = document.getElementById("plumbingLeakAccessDifficulty");
const projectFilesPlumbingLeak = document.getElementById("projectFilesPlumbingLeak");
const notesPlumbingLeak = document.getElementById("notesPlumbingLeak");

const plumbingNewInstallFixtureType = document.getElementById("plumbingNewInstallFixtureType");
const plumbingNewInstallSupplyAvailable = document.getElementById("plumbingNewInstallSupplyAvailable");
const plumbingNewInstallDrainAvailable = document.getElementById("plumbingNewInstallDrainAvailable");
const plumbingNewInstallOpeningNeeded = document.getElementById("plumbingNewInstallOpeningNeeded");
const plumbingNewInstallHasFixture = document.getElementById("plumbingNewInstallHasFixture");
const plumbingNewInstallAccessDifficulty = document.getElementById("plumbingNewInstallAccessDifficulty");
const plumbingNewInstallRepairScope = document.getElementById("plumbingNewInstallRepairScope");
const projectFilesPlumbingNewInstall = document.getElementById("projectFilesPlumbingNewInstall");
const notesPlumbingNewInstall = document.getElementById("notesPlumbingNewInstall");

const nextToStep2 = document.getElementById("nextToStep2");
const backToStep1 = document.getElementById("backToStep1");
const nextToStep3 = document.getElementById("nextToStep3");
const backToStep2 = document.getElementById("backToStep2");
const nextToStep4 = document.getElementById("nextToStep4");
const backToStep3 = document.getElementById("backToStep3");

function currency(value) {
  return "$" + Math.round(value).toLocaleString("en-US");
}

function setOptions(selectEl, options, preferredValue = null) {
  const safeValue = options.some((o) => o.value === preferredValue) ? preferredValue : options[0].value;
  selectEl.innerHTML = options.map((o) => `<option value="${o.value}">${o.label}</option>`).join("");
  selectEl.value = safeValue;
}

function clearValidation(box) {
  if (!box) return;
  box.textContent = "";
  box.classList.remove("active");
}

function showValidation(box, message) {
  if (!box) return;
  box.textContent = message;
  box.classList.add("active");
}

function scrollToEstimatorStep() {
  const target =
    document.querySelector(".step-panel.active") ||
    document.querySelector(".completion-screen.active") ||
    document.getElementById("estimator-workspace");
  if (!target) return;
  const rect = target.getBoundingClientRect();
  const alreadyVisible = rect.top >= 0 && rect.top <= window.innerHeight * 0.35;
  if (alreadyVisible) return;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  target.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
}

function scrollToLandingHero() {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
  if (history.replaceState) {
    const cleanUrl = window.location.pathname + window.location.search;
    history.replaceState(null, "", cleanUrl);
  }
}

function hideAllEndStates() {
  if (results) {
    results.classList.add("hidden");
    results.classList.remove("active");
  }
  if (hotCompletionScreen) hotCompletionScreen.classList.remove("active");
  if (doneCompletionScreen) doneCompletionScreen.classList.remove("active");
}

function updateStepper(step) {
  stepPills.forEach((pill, index) => {
    const pillStep = index + 1;
    pill.classList.remove("active", "done");
    if (pillStep < step) pill.classList.add("done");
    else if (pillStep === step) pill.classList.add("active");
  });
}

function showStep(step, options = {}) {
  currentStep = step;
  const scrollMode = options.scrollMode || "estimator";

  stepPanels.forEach((panel) => {
    panel.classList.remove("active");
    if (Number(panel.dataset.step) === step) panel.classList.add("active");
  });

  if (step === 5) {
    form.classList.add("hidden");
    hideAllEndStates();
    results.classList.remove("hidden");
    results.classList.add("active");
    // New results step: reset CTAs (e.g. Pay Deposit stays disabled if user used "Get Quote" then "Start New" without reload).
    if (latestEstimate?.isAiDesign) {
      updateAiDesignSelectedPriceDisplay(latestEstimate);
    } else if (latestEstimate?.isManualReviewRequired) {
      if (payNowBtn) payNowBtn.disabled = true;
      if (hotLeadBtn) {
        hotLeadBtn.disabled = false;
        hotLeadBtn.textContent = "Get My Exact Quote";
      }
      if (doneBtn) doneBtn.disabled = false;
    } else {
      if (payNowBtn) payNowBtn.disabled = false;
      if (hotLeadBtn) {
        hotLeadBtn.disabled = false;
        hotLeadBtn.textContent = "Get My Exact Quote";
      }
      if (doneBtn) doneBtn.disabled = false;
    }
    if (doneBtn) doneBtn.disabled = false;
  } else {
    form.classList.remove("hidden");
    hideAllEndStates();
  }

  stepper.classList.remove("hidden");
  updateStepper(step);
  requestAnimationFrame(() => {
    if (scrollMode === "hero") scrollToLandingHero();
    else if (scrollMode === "estimator") scrollToEstimatorStep();
  });
}

function showHotCompletion() {
  form.classList.add("hidden");
  results.classList.add("hidden");
  hotCompletionScreen.classList.add("active");
  doneCompletionScreen.classList.remove("active");
  stepper.classList.add("hidden");
  requestAnimationFrame(() => scrollToEstimatorStep());
}

function showDoneCompletion() {
  form.classList.add("hidden");
  results.classList.add("hidden");
  hotCompletionScreen.classList.remove("active");
  doneCompletionScreen.classList.add("active");
  stepper.classList.add("hidden");
  requestAnimationFrame(() => scrollToEstimatorStep());
}

function toggleProjectSelector() {
  const isOpen = projectSelectorShell.classList.toggle("open");
  projectSelectorTrigger.setAttribute("aria-expanded", isOpen ? "true" : "false");
}

function setupAccordions() {
  const groups = document.querySelectorAll(".accordion-group");
  groups.forEach((group) => {
    const button = group.querySelector(".accordion-button");
    if (!button) return;

    button.addEventListener("click", () => {
      const isOpen = group.classList.contains("open");
      groups.forEach((g) => g.classList.remove("open"));
      if (!isOpen) group.classList.add("open");
    });
  });
}

function updatePropertyTypeMessage() {
  const config = PROPERTY_TYPE_CONFIG[propertyTypeGlobal.value] || PROPERTY_TYPE_CONFIG.house;
  if (!config.message) {
    propertyTypeMessage.textContent = "";
    propertyTypeMessage.classList.add("hidden");
    return;
  }
  propertyTypeMessage.textContent = config.message;
  propertyTypeMessage.classList.remove("hidden");
}

function allProjectOptions() {
  return [
    drywallProjectOption,
    lightingProjectOption,
    paintProjectOption,
    aiDesignProjectOption,
    dresserAssemblyProjectOption,
    bedFrameAssemblyProjectOption,
    tvStandAssemblyProjectOption,
    deskAssemblyProjectOption,
    diningTableAssemblyProjectOption,
    bookcaseAssemblyProjectOption,
    coffeeTableAssemblyProjectOption,
    nightstandAssemblyProjectOption,
    officeChairAssemblyProjectOption,
    entertainmentCenterAssemblyProjectOption,
    tvMountProjectOption,
    plumbingFaucetProjectOption,
    plumbingToiletProjectOption,
    plumbingVanityProjectOption,
    plumbingDisposalProjectOption,
    plumbingShutoffProjectOption,
    plumbingLeakProjectOption,
    plumbingNewFixtureProjectOption
  ].filter(Boolean);
}

function isPlumbingProject(type) {
  return type && type.startsWith("plumbing_");
}

function isAiDesignProject(type) {
  return type === "ai_design";
}

function isFurnitureProject(type) {
  return type && type.startsWith("furniture_");
}

function isDresserAssemblyProject(type) {
  return type === "furniture_dresser_assembly";
}

function isBedFrameAssemblyProject(type) {
  return type === "furniture_bed_frame_assembly";
}

function isTvStandAssemblyProject(type) {
  return type === "furniture_tv_stand_assembly";
}

function isDeskAssemblyProject(type) {
  return type === "furniture_desk_assembly";
}

function isDiningTableAssemblyProject(type) {
  return type === "furniture_dining_table_assembly";
}

function isBookcaseAssemblyProject(type) {
  return type === "furniture_bookcase_assembly";
}

function isCoffeeTableAssemblyProject(type) {
  return type === "furniture_coffee_table_assembly";
}

function isNightstandAssemblyProject(type) {
  return type === "furniture_nightstand_assembly";
}

function isOfficeChairAssemblyProject(type) {
  return type === "furniture_office_chair_assembly";
}

function isEntertainmentCenterAssemblyProject(type) {
  return type === "furniture_entertainment_center_assembly";
}

function isSoftValidProductUrl(value) {
  const raw = String(value || "").trim();
  if (!raw) return true;
  try {
    const withProtocol = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
    const parsed = new URL(withProtocol);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch (error) {
    return false;
  }
}

function normalizeProductUrl(value) {
  const raw = String(value || "").trim();
  if (!raw) return "";
  return /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
}

function hideAllPlumbingSubsections() {
  [
    plumbingBasicsFaucet,
    plumbingBasicsToilet,
    plumbingBasicsVanity,
    plumbingBasicsDisposal,
    plumbingBasicsShutoff,
    plumbingBasicsLeak,
    plumbingBasicsNewInstall,
    plumbingDetailsFaucet,
    plumbingDetailsToilet,
    plumbingDetailsVanity,
    plumbingDetailsDisposal,
    plumbingDetailsShutoff,
    plumbingDetailsLeak,
    plumbingDetailsNewInstall
  ].forEach((el) => {
    if (el) el.classList.add("hidden");
  });
}

function showPlumbingSectionsByProject(type) {
  hideAllPlumbingSubsections();

  if (type === "plumbing_replace_faucet") {
    plumbingBasicsFaucet.classList.remove("hidden");
    plumbingDetailsFaucet.classList.remove("hidden");
  } else if (type === "plumbing_replace_toilet") {
    plumbingBasicsToilet.classList.remove("hidden");
    plumbingDetailsToilet.classList.remove("hidden");
  } else if (type === "plumbing_replace_vanity") {
    plumbingBasicsVanity.classList.remove("hidden");
    plumbingDetailsVanity.classList.remove("hidden");
  } else if (type === "plumbing_replace_garbage_disposal") {
    plumbingBasicsDisposal.classList.remove("hidden");
    plumbingDetailsDisposal.classList.remove("hidden");
  } else if (type === "plumbing_replace_shutoff_valves") {
    plumbingBasicsShutoff.classList.remove("hidden");
    plumbingDetailsShutoff.classList.remove("hidden");
  } else if (type === "plumbing_fix_active_leak") {
    plumbingBasicsLeak.classList.remove("hidden");
    plumbingDetailsLeak.classList.remove("hidden");
  } else if (type === "plumbing_install_new_fixture") {
    plumbingBasicsNewInstall.classList.remove("hidden");
    plumbingDetailsNewInstall.classList.remove("hidden");
  }
}

function setSelectedProject(projectKey, displayName) {
  projectType.value = projectKey;
  projectDisplayName.value = displayName;
  selectedProjectLabel.textContent = displayName;
  selectedProjectSubLabel.textContent = "Project selected. Continue when ready.";
  selectedProjectMessageText.textContent = displayName;

  allProjectOptions().forEach((option) => {
    option.classList.toggle("active", option.dataset.value === projectKey);
  });

  projectSelectorShell.classList.remove("open");
  projectSelectorTrigger.setAttribute("aria-expanded", "false");
  clearValidation(validationStep1);

  if (selectedProjectMessage) {
    selectedProjectMessage.classList.remove("hidden");
    selectedProjectMessage.classList.add("show");
  }

  updateProjectSpecificUI();
}

function getDrywallContext() {
  return damageLocation.value === "ceiling" ? drywallContextConfig.ceiling : drywallContextConfig.wall;
}

function updateDrywallContextUI() {
  const ctx = getDrywallContext();
  const previousScope = scopeContext.value;
  scopeContextLabel.textContent = ctx.scopeLabel;
  setOptions(scopeContext, ctx.scopeOptions, previousScope);
}


function updateLightingPaintScopeOptions() {
  const config = lightingPaintScopeConfig[lightingLocation.value] || lightingPaintScopeConfig.ceiling;
  const previousValue = paintLightingScope.value;
  paintLightingScopeLabel.textContent = config.label;
  setOptions(paintLightingScope, config.options, previousValue);
}

function updateLightingConditionalFields() {
  const isReplace = lightingType.value === "replace";
  const isAdd = lightingType.value === "add";
  const access = accessDifficulty.value;
  const wire = wireRun.value;
  const route = atticAccess.value;
  const repair = repairIncluded.value;
  const wantsPaint = paintAfterRepair.value === "yes";

  lightingSwitchField.classList.toggle("hidden", isReplace);
  lightingWireRunField.classList.toggle("hidden", isReplace);
  lightingAtticAccessField.classList.toggle("hidden", isReplace);

  if (isAdd) {
    atticAccessLabel.textContent = "Is access available from above or below (attic, basement, or crawlspace)?";
  }

  const showReplaceRepair = isReplace && access !== "veryEasy";
  const showAddRepair =
    isAdd &&
    (["medium", "long", "notSure"].includes(wire) ||
      ["no", "notSure"].includes(route) ||
      ["moderate", "difficult", "notSure"].includes(access));

  const showRepair = showReplaceRepair || showAddRepair;
  lightingRepairField.classList.toggle("hidden", !showRepair);

  const showPaintYesNo = showRepair && ["yes", "notSure"].includes(repair);
  lightingPaintYesNoField.classList.toggle("hidden", !showPaintYesNo);

  const showPaintScope = showPaintYesNo && wantsPaint;
  lightingPaintScopeField.classList.toggle("hidden", !showPaintScope);

  updateLightingPaintScopeOptions();
}

function updateTvMountConditionalFields() {
  const wantsPowerWork = wireConceal.value === "inWall" || wireConceal.value === "notSure";
  powerWorkWrap.classList.toggle("hidden", !wantsPowerWork);

  const needsLowVoltage =
    !lowVoltageWrap ||
    (!powerWorkWrap.classList.contains("hidden") && (powerWork.value === "yes" || powerWork.value === "notSure")) ||
    wireConceal.value === "notSure";

  lowVoltageWrap.classList.toggle("hidden", !needsLowVoltage);

  if (powerWorkWrap.classList.contains("hidden")) {
    powerWork.value = "no";
  }
  if (lowVoltageWrap.classList.contains("hidden")) {
    lowVoltage.value = "no";
  }
}

function getSelectedPaintScopes() {
  return Array.from(paintScopeCheckboxes).filter((cb) => cb.checked).map((cb) => cb.value);
}

function updatePaintConditionalFields() {
  const scopes = getSelectedPaintScopes();
  const includesWalls = scopes.includes("walls");
  const includesCeiling = scopes.includes("ceiling");

  paintSurfaceConditionField.classList.toggle("hidden", !includesWalls);
  paintCeilingHeightField.classList.toggle("hidden", !includesCeiling);

  if (!includesWalls) paintSurfaceCondition.value = "minimal";
  if (!includesCeiling) paintCeilingHeight.value = "under8";

  const showLead = ["before1980", "before1960", "notSure"].includes(paintYearBuilt.value);
  paintLeadPrepField.classList.toggle("hidden", !showLead);
  if (!showLead) paintLeadPrepMode.value = "standard";
}

function updateProjectSpecificUI() {
  const type = projectType.value;

  drywallBasicsSection.classList.add("hidden");
  lightingBasicsSection.classList.add("hidden");
  tvMountBasicsSection.classList.add("hidden");
  paintBasicsSection.classList.add("hidden");
  if (aiDesignBasicsSection) aiDesignBasicsSection.classList.add("hidden");
  if (dresserBasicsSection) dresserBasicsSection.classList.add("hidden");
  if (bedFrameBasicsSection) bedFrameBasicsSection.classList.add("hidden");
  if (tvStandBasicsSection) tvStandBasicsSection.classList.add("hidden");
  if (deskBasicsSection) deskBasicsSection.classList.add("hidden");
  if (diningTableBasicsSection) diningTableBasicsSection.classList.add("hidden");
  if (bookcaseBasicsSection) bookcaseBasicsSection.classList.add("hidden");
  if (coffeeTableBasicsSection) coffeeTableBasicsSection.classList.add("hidden");
  if (nightstandBasicsSection) nightstandBasicsSection.classList.add("hidden");
  if (officeChairBasicsSection) officeChairBasicsSection.classList.add("hidden");
  if (entertainmentCenterBasicsSection) entertainmentCenterBasicsSection.classList.add("hidden");
  plumbingBasicsSection.classList.add("hidden");

  drywallDetailsSection.classList.add("hidden");
  lightingDetailsSection.classList.add("hidden");
  tvMountDetailsSection.classList.add("hidden");
  paintDetailsSection.classList.add("hidden");
  if (aiDesignDetailsSection) aiDesignDetailsSection.classList.add("hidden");
  if (dresserDetailsSection) dresserDetailsSection.classList.add("hidden");
  if (bedFrameDetailsSection) bedFrameDetailsSection.classList.add("hidden");
  if (tvStandDetailsSection) tvStandDetailsSection.classList.add("hidden");
  if (deskDetailsSection) deskDetailsSection.classList.add("hidden");
  if (diningTableDetailsSection) diningTableDetailsSection.classList.add("hidden");
  if (bookcaseDetailsSection) bookcaseDetailsSection.classList.add("hidden");
  if (coffeeTableDetailsSection) coffeeTableDetailsSection.classList.add("hidden");
  if (nightstandDetailsSection) nightstandDetailsSection.classList.add("hidden");
  if (officeChairDetailsSection) officeChairDetailsSection.classList.add("hidden");
  if (entertainmentCenterDetailsSection) entertainmentCenterDetailsSection.classList.add("hidden");
  plumbingDetailsSection.classList.add("hidden");

  hideAllPlumbingSubsections();

  if (!type) {
    basicsSubtitle.textContent = "Tell us about your project so we can build a more accurate estimate.";
    detailsSubtitle.textContent = "Select a project type above to reveal relevant estimate fields.";
    return;
  }

  if (type === "lighting_add_replace") {
    basicsSubtitle.textContent = "Tell us about the lighting project so we can build a more accurate estimate.";
    detailsSubtitle.textContent = "A few final details help us refine the lighting estimate more accurately.";
    lightingBasicsSection.classList.remove("hidden");
    lightingDetailsSection.classList.remove("hidden");
    updateLightingConditionalFields();
    return;
  }

  if (type === "tv_mount_install") {
    basicsSubtitle.textContent = "Tell us about the TV mount project so we can build a more accurate estimate.";
    detailsSubtitle.textContent = "A few final details help us refine the TV mount estimate more accurately.";
    tvMountBasicsSection.classList.remove("hidden");
    tvMountDetailsSection.classList.remove("hidden");
    updateTvMountConditionalFields();
    return;
  }

  if (type === "paint_one_room") {
    basicsSubtitle.textContent = "Tell us about the room painting project so we can build a more accurate estimate.";
    detailsSubtitle.textContent = "A few final details help us refine the painting estimate more accurately.";
    paintBasicsSection.classList.remove("hidden");
    paintDetailsSection.classList.remove("hidden");
    updatePaintConditionalFields();
    return;
  }

  if (isAiDesignProject(type)) {
    basicsSubtitle.textContent = "Tell us about the space so we can shape your AI Design preliminary ranges.";
    detailsSubtitle.textContent = "A few more details help localize Essential, Enhanced, and Premium finish ranges.";
    if (aiDesignBasicsSection) aiDesignBasicsSection.classList.remove("hidden");
    if (aiDesignDetailsSection) aiDesignDetailsSection.classList.remove("hidden");
    return;
  }

  if (isDresserAssemblyProject(type)) {
    basicsSubtitle.textContent = "Tell us about the dresser so we can build an accurate assembly estimate.";
    detailsSubtitle.textContent = "A few final details help refine anchoring, packaging, and furniture handling.";
    if (dresserBasicsSection) dresserBasicsSection.classList.remove("hidden");
    if (dresserDetailsSection) dresserDetailsSection.classList.remove("hidden");
    updateDresserConditionalFields();
    return;
  }

  if (isBedFrameAssemblyProject(type)) {
    basicsSubtitle.textContent = "Tell us about the bed frame so we can build an accurate assembly estimate.";
    detailsSubtitle.textContent = "A few final details help prepare for storage components, mattress placement, and packaging cleanup.";
    if (bedFrameBasicsSection) bedFrameBasicsSection.classList.remove("hidden");
    if (bedFrameDetailsSection) bedFrameDetailsSection.classList.remove("hidden");
    updateBedFrameConditionalFields();
    return;
  }

  if (isTvStandAssemblyProject(type)) {
    basicsSubtitle.textContent = "Tell us about the TV stand so we can build an accurate assembly estimate.";
    detailsSubtitle.textContent = "A few final details help prepare for fireplace inserts, glass components, and packaging cleanup.";
    if (tvStandBasicsSection) tvStandBasicsSection.classList.remove("hidden");
    if (tvStandDetailsSection) tvStandDetailsSection.classList.remove("hidden");
    updateTvStandConditionalFields();
    return;
  }

  if (isDeskAssemblyProject(type)) {
    basicsSubtitle.textContent = "Tell us about the desk so we can build an accurate assembly estimate.";
    detailsSubtitle.textContent = "A few final details help prepare for drawers, hutches, power components, and packaging cleanup.";
    if (deskBasicsSection) deskBasicsSection.classList.remove("hidden");
    if (deskDetailsSection) deskDetailsSection.classList.remove("hidden");
    updateDeskConditionalFields();
    return;
  }

  if (isDiningTableAssemblyProject(type)) {
    basicsSubtitle.textContent = "Tell us about the dining table so we can build an accurate assembly estimate.";
    detailsSubtitle.textContent = "A few final details help prepare for extension leaves, glass tops, placement, and packaging cleanup.";
    if (diningTableBasicsSection) diningTableBasicsSection.classList.remove("hidden");
    if (diningTableDetailsSection) diningTableDetailsSection.classList.remove("hidden");
    updateDiningTableConditionalFields();
    return;
  }

  if (isBookcaseAssemblyProject(type)) {
    basicsSubtitle.textContent = "Tell us about the bookshelf or bookcase so we can build an accurate assembly estimate.";
    detailsSubtitle.textContent = "A few final details help prepare for doors, glass, lighting, wall anchoring, and packaging cleanup.";
    if (bookcaseBasicsSection) bookcaseBasicsSection.classList.remove("hidden");
    if (bookcaseDetailsSection) bookcaseDetailsSection.classList.remove("hidden");
    updateBookcaseConditionalFields();
    return;
  }

  if (isCoffeeTableAssemblyProject(type)) {
    basicsSubtitle.textContent = "Tell us about the coffee table so we can build an accurate assembly estimate.";
    detailsSubtitle.textContent = "A few final details help prepare for storage, lift-top mechanisms, glass tops, and packaging cleanup.";
    if (coffeeTableBasicsSection) coffeeTableBasicsSection.classList.remove("hidden");
    if (coffeeTableDetailsSection) coffeeTableDetailsSection.classList.remove("hidden");
    updateCoffeeTableConditionalFields();
    return;
  }

  if (isNightstandAssemblyProject(type)) {
    basicsSubtitle.textContent = "Tell us about the nightstand so we can build an accurate assembly estimate.";
    detailsSubtitle.textContent = "A few final details help prepare for drawers, doors, charging components, wall anchoring, and packaging cleanup.";
    if (nightstandBasicsSection) nightstandBasicsSection.classList.remove("hidden");
    if (nightstandDetailsSection) nightstandDetailsSection.classList.remove("hidden");
    updateNightstandConditionalFields();
    return;
  }

  if (isOfficeChairAssemblyProject(type)) {
    basicsSubtitle.textContent = "Tell us about the office chair so we can build an accurate assembly estimate.";
    detailsSubtitle.textContent = "A few final details help prepare for armrests, reclining features, electronics, adjustments, and packaging cleanup.";
    if (officeChairBasicsSection) officeChairBasicsSection.classList.remove("hidden");
    if (officeChairDetailsSection) officeChairDetailsSection.classList.remove("hidden");
    updateOfficeChairConditionalFields();
    return;
  }

  if (isEntertainmentCenterAssemblyProject(type)) {
    basicsSubtitle.textContent = "Tell us about the entertainment center so we can build an accurate assembly estimate.";
    detailsSubtitle.textContent = "A few final details help prepare for towers, glass, electronics, wall anchoring, and packaging cleanup.";
    if (entertainmentCenterBasicsSection) entertainmentCenterBasicsSection.classList.remove("hidden");
    if (entertainmentCenterDetailsSection) entertainmentCenterDetailsSection.classList.remove("hidden");
    updateEntertainmentCenterConditionalFields();
    return;
  }

  if (isPlumbingProject(type)) {
    basicsSubtitle.textContent = "Tell us about the plumbing project so we can build a more accurate estimate.";
    detailsSubtitle.textContent = "A few final details help us refine the plumbing estimate more accurately.";
    plumbingBasicsSection.classList.remove("hidden");
    plumbingDetailsSection.classList.remove("hidden");
    showPlumbingSectionsByProject(type);
    return;
  }

  basicsSubtitle.textContent = "Tell us about the damaged area so we can build a more accurate estimate.";
  detailsSubtitle.textContent = "A few final details help us refine the estimate more accurately.";
  drywallBasicsSection.classList.remove("hidden");
  drywallDetailsSection.classList.remove("hidden");
}

function updateDresserConditionalFields() {
  if (!dresserSize || !dresserAlreadyInRoom || !dresserWallAnchoring) return;

  const alreadyInRoom = dresserAlreadyInRoom.value;
  // Job-prep only: stairs question when dresser is not already in the assembly room.
  const showCarry = ["no", "notSure"].includes(alreadyInRoom);

  if (dresserCarryStairsField) {
    dresserCarryStairsField.classList.toggle("hidden", !showCarry);
    if (!showCarry && dresserCarryStairs) {
      dresserCarryStairs.value = "sameFloor";
    }
  }

  const showWallType = ["yes", "notSure"].includes(dresserWallAnchoring.value);
  if (dresserWallTypeField) {
    dresserWallTypeField.classList.toggle("hidden", !showWallType);
    if (!showWallType && dresserWallType) {
      dresserWallType.value = "drywall";
    }
  }

  const showProductLink = dresserHasProductLink?.value === "yes";
  if (dresserProductLinkField) {
    dresserProductLinkField.classList.toggle("hidden", !showProductLink);
    if (!showProductLink && dresserProductLink) {
      dresserProductLink.value = "";
    }
  }
}

function updateBedFrameConditionalFields() {
  const showProductLink = bedHasProductLink?.value === "yes";
  if (bedProductLinkField) {
    bedProductLinkField.classList.toggle("hidden", !showProductLink);
    if (!showProductLink && bedProductLink) {
      bedProductLink.value = "";
    }
  }

  const isMurphy = bedType?.value === "murphyBed";
  if (bedMurphyHelpNote) {
    bedMurphyHelpNote.classList.toggle("hidden", !isMurphy);
  }
}

function updateTvStandConditionalFields() {
  const showProductLink = tvStandHasProductLink?.value === "yes";
  if (tvStandProductLinkField) {
    tvStandProductLinkField.classList.toggle("hidden", !showProductLink);
    if (!showProductLink && tvStandProductLink) {
      tvStandProductLink.value = "";
    }
  }
}

function updateDeskConditionalFields() {
  const showProductLink = deskHasProductLink?.value === "yes";
  if (deskProductLinkField) {
    deskProductLinkField.classList.toggle("hidden", !showProductLink);
    if (!showProductLink && deskProductLink) {
      deskProductLink.value = "";
    }
  }

  const isElectric = deskType?.value === "standingDeskElectric";
  if (deskElectricNote) {
    deskElectricNote.classList.toggle("hidden", !isElectric);
  }
}

function updateDiningTableConditionalFields() {
  const showProductLink = diningTableHasProductLink?.value === "yes";
  if (diningTableProductLinkField) {
    diningTableProductLinkField.classList.toggle("hidden", !showProductLink);
    if (!showProductLink && diningTableProductLink) {
      diningTableProductLink.value = "";
    }
  }
}

function updateBookcaseConditionalFields() {
  const projectKind = bookcaseProjectType?.value || "freestanding";
  if (bookcaseCustomHelpNote) {
    bookcaseCustomHelpNote.classList.toggle("hidden", projectKind === "freestanding");
  }

  const qty = bookcaseQuantity?.value || "1";
  if (bookcaseQuantityHelpNote) {
    bookcaseQuantityHelpNote.classList.toggle("hidden", qty !== "5OrMore");
  }

  const showConnect = ["2", "3", "4", "5OrMore"].includes(qty);
  if (bookcaseConnectUnitsField) {
    bookcaseConnectUnitsField.classList.toggle("hidden", !showConnect);
    if (!showConnect && bookcaseConnectUnits) {
      bookcaseConnectUnits.value = "no";
    }
  }

  const showProductLink = bookcaseHasProductLink?.value === "yes";
  if (bookcaseProductLinkField) {
    bookcaseProductLinkField.classList.toggle("hidden", !showProductLink);
    if (!showProductLink && bookcaseProductLink) {
      bookcaseProductLink.value = "";
    }
  }
}

function updateCoffeeTableConditionalFields() {
  const showProductLink = coffeeTableHasProductLink?.value === "yes";
  if (coffeeTableProductLinkField) {
    coffeeTableProductLinkField.classList.toggle("hidden", !showProductLink);
    if (!showProductLink && coffeeTableProductLink) {
      coffeeTableProductLink.value = "";
    }
  }
}

function updateNightstandConditionalFields() {
  const qty = nightstandQuantity?.value || "1";
  if (nightstandQuantityHelpNote) {
    nightstandQuantityHelpNote.classList.toggle("hidden", qty !== "5OrMore");
  }

  const showProductLink = nightstandHasProductLink?.value === "yes";
  if (nightstandProductLinkField) {
    nightstandProductLinkField.classList.toggle("hidden", !showProductLink);
    if (!showProductLink && nightstandProductLink) {
      nightstandProductLink.value = "";
    }
  }
}

function updateOfficeChairConditionalFields() {
  const qty = officeChairQuantity?.value || "1";
  if (officeChairQuantityHelpNote) {
    officeChairQuantityHelpNote.classList.toggle("hidden", qty !== "5OrMore");
  }

  const showProductLink = officeChairHasProductLink?.value === "yes";
  if (officeChairProductLinkField) {
    officeChairProductLinkField.classList.toggle("hidden", !showProductLink);
    if (!showProductLink && officeChairProductLink) {
      officeChairProductLink.value = "";
    }
  }
}

function updateEntertainmentCenterConditionalFields() {
  const sections = entertainmentCenterSectionCount?.value || "1";
  if (entertainmentCenterSectionHelpNote) {
    entertainmentCenterSectionHelpNote.classList.toggle("hidden", sections !== "6OrMore");
  }

  const showProductLink = entertainmentCenterHasProductLink?.value === "yes";
  if (entertainmentCenterProductLinkField) {
    entertainmentCenterProductLinkField.classList.toggle("hidden", !showProductLink);
    if (!showProductLink && entertainmentCenterProductLink) {
      entertainmentCenterProductLink.value = "";
    }
  }
}

function calculateDresserAssemblyEstimate(formData) {
  const leadMeta = classifyLead(formData);
  const cfg = PRICING.furnitureDresser;
  const adjustments = [];
  const internalAdjustments = [
    `Service zone: ${leadMeta.serviceZone}`,
    `Distance band: ${leadMeta.distanceBand}`,
    `Lead priority: ${leadMeta.leadPriority}`,
    "Dresser competitive pricing: base includes normal assembly complexity; only removal/disposal may add cost"
  ];

  const base = cfg.base[formData.dresserSize] || cfg.base.notSure;
  let laborMin = base.totalMin;
  let laborMax = base.totalMax;
  adjustments.push(base.label);
  adjustments.push("Base price includes drawers, hardware, leveling, mirror when included, basic wall anchoring when requested, in-home movement/stairs, packaging handling, and work-area cleanup");

  // Job-prep answers (brand, location, stairs, anchoring, wall, mirror, packaging, moveOnly) do not change price.
  if (formData.dresserBrand) {
    internalAdjustments.push(`Brand/store (prep only, $0): ${formData.dresserBrand}`);
  }
  if (formData.dresserAlreadyInRoom) {
    internalAdjustments.push(`Already in room (prep only, $0): ${formData.dresserAlreadyInRoom}`);
  }
  if (formData.dresserCarryStairs) {
    internalAdjustments.push(`Carry stairs (prep only, $0): ${formData.dresserCarryStairs}`);
  }
  if (formData.dresserWallAnchoring) {
    internalAdjustments.push(`Wall anchoring (prep only, $0): ${formData.dresserWallAnchoring}`);
  }
  if (formData.dresserWallType) {
    internalAdjustments.push(`Wall type (prep only, $0): ${formData.dresserWallType}`);
  }
  if (formData.dresserMirror) {
    internalAdjustments.push(`Mirror (prep only, $0): ${formData.dresserMirror}`);
  }
  if (formData.dresserPackagingRemoval) {
    internalAdjustments.push(`Packaging removal (prep only, $0): ${formData.dresserPackagingRemoval}`);
  }
  if (formData.dresserHasProductLink === "yes") {
    const link = normalizeProductUrl(formData.dresserProductLink);
    internalAdjustments.push(`Product link (prep only, $0): ${link || "requested but empty"}`);
    if (link) adjustments.push(`Product link provided: ${link}`);
  }

  const oldFurniture = cfg.oldFurniture[formData.dresserOldFurniture] || cfg.oldFurniture.no;
  laborMin += oldFurniture.totalMin || 0;
  laborMax += oldFurniture.totalMax || 0;
  if (oldFurniture.label) adjustments.push(oldFurniture.label);
  if (oldFurniture.manualReview) {
    internalAdjustments.push("MANUAL REVIEW: old furniture answer is notSure — no automatic removal fee applied");
  }
  if (formData.dresserOldFurniture === "moveOnly") {
    internalAdjustments.push("Old furniture moveOnly included in base ($0 adder)");
  }

  adjustments.push("Included with your dresser assembly:");
  (cfg.includedServices || []).forEach((item) => adjustments.push(`• ${item}`));

  laborMin = Math.max(0, laborMin);
  laborMax = Math.max(laborMin, laborMax);

  const minMaterials = 0;
  const maxMaterials = 0;
  const totalMin = laborMin;
  const totalMax = laborMax;
  const hours = base.hours || 2;

  // Flat competitive dresser pricing — do not apply zone/property multipliers.
  return {
    hours,
    minMaterials,
    maxMaterials,
    laborMin,
    laborMax,
    totalMin,
    totalMax,
    materialsList: cfg.materials,
    adjustments,
    internalAdjustments,
    leadMeta,
    dresserRemovalDisposalRequested: formData.dresserOldFurniture === "removeDispose",
    dresserOldFurnitureManualReview: !!oldFurniture.manualReview
  };
}

function calculateBedFrameAssemblyEstimate(formData) {
  const leadMeta = classifyLead(formData);
  const cfg = PRICING.furnitureBedFrame;
  const adjustments = [];
  const internalAdjustments = [
    `Service zone: ${leadMeta.serviceZone}`,
    `Distance band: ${leadMeta.distanceBand}`,
    `Lead priority: ${leadMeta.leadPriority}`,
    "Bed competitive pricing: base includes normal assembly complexity; only removal/disposal may add cost"
  ];

  const bedKey = formData.bedType || "otherNotSure";
  const base = cfg.base[bedKey] || cfg.base.otherNotSure;
  const isMurphy = bedKey === "murphyBed" || !!base.manualReview;

  if (formData.bedBrand) internalAdjustments.push(`Brand/store (prep only, $0): ${formData.bedBrand}`);
  if (formData.bedAlreadyInRoom) {
    internalAdjustments.push(`Already in room (prep only, $0): ${formData.bedAlreadyInRoom}`);
  }
  if (formData.bedHasStorage) internalAdjustments.push(`Storage (prep only, $0): ${formData.bedHasStorage}`);
  if (formData.bedHasHeadboard) {
    internalAdjustments.push(`Headboard (prep only, $0): ${formData.bedHasHeadboard}`);
  }
  if (formData.bedHasFootboard) {
    internalAdjustments.push(`Footboard (prep only, $0): ${formData.bedHasFootboard}`);
  }
  if (formData.bedMattressPlacement) {
    internalAdjustments.push(`Mattress placement (prep only, $0): ${formData.bedMattressPlacement}`);
  }
  if (formData.bedPackagingCleanup) {
    internalAdjustments.push(`Packaging cleanup (prep only, $0): ${formData.bedPackagingCleanup}`);
  }
  if (formData.bedHasProductLink === "yes") {
    const link = normalizeProductUrl(formData.bedProductLink);
    internalAdjustments.push(`Product link (prep only, $0): ${link || "requested but empty"}`);
    if (link) adjustments.push(`Product link provided: ${link}`);
  }

  if (isMurphy) {
    adjustments.push(base.label);
    adjustments.push(
      "This project requires a personalized estimate because Murphy bed installation complexity varies by product, wall structure, anchoring requirements, and installation conditions. Submit the product information so Tamay Enterprises can review it and confirm pricing."
    );
    adjustments.push("Please use Get My Exact Quote and include a product link, photos, and assembly manual when possible.");

    return {
      hours: 0,
      minMaterials: 0,
      maxMaterials: 0,
      laborMin: 0,
      laborMax: 0,
      totalMin: 0,
      totalMax: 0,
      materialsList: cfg.materials,
      adjustments,
      internalAdjustments,
      leadMeta,
      isManualReviewRequired: true,
      bedManualReviewRequired: true,
      bedRemovalDisposalRequested: formData.bedOldFurniture === "removeDispose"
    };
  }

  let laborMin = base.totalMin;
  let laborMax = base.totalMax;
  adjustments.push(base.label);
  adjustments.push(
    "Base price includes normal bed assembly complexity, included headboard/footboard/storage components, mattress placement when requested, in-home movement, and basic packaging cleanup"
  );

  const oldFurniture = cfg.oldFurniture[formData.bedOldFurniture] || cfg.oldFurniture.no;
  laborMin += oldFurniture.totalMin || 0;
  laborMax += oldFurniture.totalMax || 0;
  if (oldFurniture.label) adjustments.push(oldFurniture.label);
  if (oldFurniture.manualReview) {
    internalAdjustments.push("MANUAL REVIEW: existing bed answer is notSure — no automatic removal fee applied");
  }
  if (formData.bedOldFurniture === "moveOnly") {
    internalAdjustments.push("Existing bed moveOnly included in base ($0 adder)");
  }

  adjustments.push("Included with your bed assembly:");
  (cfg.includedServices || []).forEach((item) => adjustments.push(`• ${item}`));

  laborMin = Math.max(0, laborMin);
  laborMax = Math.max(laborMin, laborMax);

  return {
    hours: base.hours || 2,
    minMaterials: 0,
    maxMaterials: 0,
    laborMin,
    laborMax,
    totalMin: laborMin,
    totalMax: laborMax,
    materialsList: cfg.materials,
    adjustments,
    internalAdjustments,
    leadMeta,
    isManualReviewRequired: false,
    bedManualReviewRequired: false,
    bedRemovalDisposalRequested: formData.bedOldFurniture === "removeDispose",
    bedOldFurnitureManualReview: !!oldFurniture.manualReview
  };
}

function calculateTvStandAssemblyEstimate(formData) {
  const leadMeta = classifyLead(formData);
  const cfg = PRICING.furnitureTvStand;
  const adjustments = [];
  const internalAdjustments = [
    `Service zone: ${leadMeta.serviceZone}`,
    `Distance band: ${leadMeta.distanceBand}`,
    `Lead priority: ${leadMeta.leadPriority}`,
    "TV stand competitive pricing: base includes normal assembly complexity; only fireplace yes and removeDispose may add cost"
  ];

  const base = cfg.base[formData.tvStandSize] || cfg.base.notSure;
  let laborMin = base.totalMin;
  let laborMax = base.totalMax;
  adjustments.push(base.label);
  adjustments.push(
    "Base price includes doors/drawers/shelves, included lighting-component assembly, final placement when requested, in-home movement, and basic packaging cleanup"
  );

  if (formData.tvStandBrand) {
    internalAdjustments.push(`Brand/store (prep only, $0): ${formData.tvStandBrand}`);
  }
  if (formData.tvStandAlreadyInRoom) {
    internalAdjustments.push(`Already in room (prep only, $0): ${formData.tvStandAlreadyInRoom}`);
  }
  if (formData.tvStandHasLighting) {
    internalAdjustments.push(`Built-in lighting (prep only, $0): ${formData.tvStandHasLighting}`);
  }
  if (formData.tvStandHasGlass) {
    internalAdjustments.push(`Glass doors/shelves (prep only, $0): ${formData.tvStandHasGlass}`);
  }
  if (formData.tvStandFinalPositioning) {
    internalAdjustments.push(`Final positioning (prep only, $0): ${formData.tvStandFinalPositioning}`);
  }
  if (formData.tvStandPackagingCleanup) {
    internalAdjustments.push(`Packaging cleanup (prep only, $0): ${formData.tvStandPackagingCleanup}`);
  }
  if (formData.tvStandHasProductLink === "yes") {
    const link = normalizeProductUrl(formData.tvStandProductLink);
    internalAdjustments.push(`Product link (prep only, $0): ${link || "requested but empty"}`);
    if (link) adjustments.push(`Product link provided: ${link}`);
  }

  const fireplace = cfg.fireplace[formData.tvStandHasFireplace] || cfg.fireplace.no;
  const fireplaceAdderApplied = formData.tvStandHasFireplace === "yes";
  laborMin += fireplace.totalMin || 0;
  laborMax += fireplace.totalMax || 0;
  if (fireplace.label) adjustments.push(fireplace.label);
  if (fireplace.manualReview) {
    internalAdjustments.push("MANUAL REVIEW: fireplace answer is notSure — no automatic fireplace adder applied");
  }
  if (fireplaceAdderApplied) {
    adjustments.push(
      "Fireplace adder covers included insert assembly/testing and plugging into an existing accessible outlet — not new outlets, wiring changes, hardwiring, or electrical repairs"
    );
  }

  const oldFurniture = cfg.oldFurniture[formData.tvStandOldFurniture] || cfg.oldFurniture.no;
  laborMin += oldFurniture.totalMin || 0;
  laborMax += oldFurniture.totalMax || 0;
  if (oldFurniture.label) adjustments.push(oldFurniture.label);
  if (oldFurniture.manualReview) {
    internalAdjustments.push("MANUAL REVIEW: existing TV stand answer is notSure — no automatic removal fee applied");
  }
  if (formData.tvStandOldFurniture === "moveOnly") {
    internalAdjustments.push("Existing TV stand moveOnly included in base ($0 adder)");
  }

  adjustments.push("Included with your TV stand assembly:");
  (cfg.includedServices || []).forEach((item) => adjustments.push(`• ${item}`));
  if (fireplaceAdderApplied) {
    adjustments.push("• Included electric fireplace insert assembly and testing");
  }

  const manualReviewRequired =
    formData.tvStandHasFireplace === "notSure" ||
    formData.tvStandOldFurniture === "notSure" ||
    formData.tvStandSize === "notSure";

  laborMin = Math.max(0, laborMin);
  laborMax = Math.max(laborMin, laborMax);

  return {
    hours: base.hours || 2,
    minMaterials: 0,
    maxMaterials: 0,
    laborMin,
    laborMax,
    totalMin: laborMin,
    totalMax: laborMax,
    materialsList: cfg.materials,
    adjustments,
    internalAdjustments,
    leadMeta,
    tvStandFireplaceAdderApplied: fireplaceAdderApplied,
    tvStandRemovalDisposalRequested: formData.tvStandOldFurniture === "removeDispose",
    tvStandManualReviewRequired: manualReviewRequired
  };
}

function calculateDeskAssemblyEstimate(formData) {
  const leadMeta = classifyLead(formData);
  const cfg = PRICING.furnitureDesk;
  const adjustments = [];
  const internalAdjustments = [
    `Service zone: ${leadMeta.serviceZone}`,
    `Distance band: ${leadMeta.distanceBand}`,
    `Lead priority: ${leadMeta.leadPriority}`,
    "Desk competitive pricing: base includes normal assembly complexity; only electric standing desk and removeDispose may add cost"
  ];

  const base = cfg.base[formData.deskType] || cfg.base.otherNotSure;
  let laborMin = base.totalMin;
  let laborMax = base.totalMax;
  adjustments.push(base.label);
  adjustments.push(
    "Base price includes drawers/shelves/hutch when included, cable-management components, included lighting/USB/power-strip connections, final placement when requested, in-home movement, and basic packaging cleanup"
  );

  if (formData.deskBrand) {
    internalAdjustments.push(`Brand/store (prep only, $0): ${formData.deskBrand}`);
  }
  if (formData.deskAlreadyInRoom) {
    internalAdjustments.push(`Already in room (prep only, $0): ${formData.deskAlreadyInRoom}`);
  }
  if (formData.deskHasDrawers) {
    internalAdjustments.push(`Drawers/filing cabinet (prep only, $0): ${formData.deskHasDrawers}`);
  }
  if (formData.deskHasHutch) {
    internalAdjustments.push(`Upper shelves/hutch (prep only, $0): ${formData.deskHasHutch}`);
  }
  if (formData.deskHasPowerComponents) {
    internalAdjustments.push(`Lighting/USB/power strip (prep only, $0): ${formData.deskHasPowerComponents}`);
  }
  if (formData.deskFinalPositioning) {
    internalAdjustments.push(`Final positioning (prep only, $0): ${formData.deskFinalPositioning}`);
  }
  if (formData.deskPackagingCleanup) {
    internalAdjustments.push(`Packaging cleanup (prep only, $0): ${formData.deskPackagingCleanup}`);
  }
  if (formData.deskHasProductLink === "yes") {
    const link = normalizeProductUrl(formData.deskProductLink);
    internalAdjustments.push(`Product link (prep only, $0): ${link || "requested but empty"}`);
    if (link) adjustments.push(`Product link provided: ${link}`);
  }

  const electricAdderApplied = formData.deskType === "standingDeskElectric";
  if (electricAdderApplied) {
    laborMin += cfg.electricStandingDesk.totalMin;
    laborMax += cfg.electricStandingDesk.totalMax;
    adjustments.push(cfg.electricStandingDesk.label);
    adjustments.push(
      "Electric standing desk adder covers included motor/controls/power supply, cable routing, calibration, and testing — not new outlets, wiring changes, hardwiring, or electrical repairs"
    );
  }

  const oldFurniture = cfg.oldFurniture[formData.deskOldFurniture] || cfg.oldFurniture.no;
  laborMin += oldFurniture.totalMin || 0;
  laborMax += oldFurniture.totalMax || 0;
  if (oldFurniture.label) adjustments.push(oldFurniture.label);
  if (oldFurniture.manualReview) {
    internalAdjustments.push("MANUAL REVIEW: existing desk answer is notSure — no automatic removal fee applied");
  }
  if (formData.deskOldFurniture === "moveOnly") {
    internalAdjustments.push("Existing desk moveOnly included in base ($0 adder)");
  }

  adjustments.push("Included with your desk assembly:");
  (cfg.includedServices || []).forEach((item) => adjustments.push(`• ${item}`));
  if (electricAdderApplied) {
    adjustments.push("• Included motor, controller, and height-operation testing");
  }

  const manualReviewRequired =
    formData.deskType === "otherNotSure" || formData.deskOldFurniture === "notSure";

  laborMin = Math.max(0, laborMin);
  laborMax = Math.max(laborMin, laborMax);

  return {
    hours: base.hours || 2,
    minMaterials: 0,
    maxMaterials: 0,
    laborMin,
    laborMax,
    totalMin: laborMin,
    totalMax: laborMax,
    materialsList: cfg.materials,
    adjustments,
    internalAdjustments,
    leadMeta,
    deskElectricAdderApplied: electricAdderApplied,
    deskRemovalDisposalRequested: formData.deskOldFurniture === "removeDispose",
    deskManualReviewRequired: manualReviewRequired
  };
}

function calculateDiningTableAssemblyEstimate(formData) {
  const leadMeta = classifyLead(formData);
  const cfg = PRICING.furnitureDiningTable;
  const adjustments = [];
  const internalAdjustments = [
    `Service zone: ${leadMeta.serviceZone}`,
    `Distance band: ${leadMeta.distanceBand}`,
    `Lead priority: ${leadMeta.leadPriority}`,
    "Dining table competitive pricing: base includes normal assembly complexity; only chair quantity groups and removeDispose may add cost"
  ];

  const base = cfg.base[formData.diningTableSize] || cfg.base.notSure;
  let laborMin = base.totalMin;
  let laborMax = base.totalMax;
  adjustments.push(base.label);
  adjustments.push(
    "Base price includes hardware, leveling, final placement when requested, in-home movement, extension leaf handling when included, and basic packaging cleanup"
  );

  if (formData.diningTableBrand) {
    internalAdjustments.push(`Brand/store (prep only, $0): ${formData.diningTableBrand}`);
  }
  if (formData.diningTableAlreadyInRoom) {
    internalAdjustments.push(`Already in room (prep only, $0): ${formData.diningTableAlreadyInRoom}`);
  }
  if (formData.diningTableExtensionLeaf) {
    internalAdjustments.push(`Extension leaf (prep only, $0): ${formData.diningTableExtensionLeaf}`);
  }
  if (formData.diningTableGlassTop) {
    internalAdjustments.push(`Glass top (prep only, $0): ${formData.diningTableGlassTop}`);
  }
  if (formData.diningTableFinalPositioning) {
    internalAdjustments.push(`Final positioning (prep only, $0): ${formData.diningTableFinalPositioning}`);
  }
  if (formData.diningTablePackagingCleanup) {
    internalAdjustments.push(`Packaging cleanup (prep only, $0): ${formData.diningTablePackagingCleanup}`);
  }
  if (formData.diningTableHasProductLink === "yes") {
    const link = normalizeProductUrl(formData.diningTableProductLink);
    internalAdjustments.push(`Product link (prep only, $0): ${link || "requested but empty"}`);
    if (link) adjustments.push(`Product link provided: ${link}`);
  }

  const chairs = cfg.chairs[formData.diningTableChairQuantity] || cfg.chairs.none;
  laborMin += chairs.totalMin || 0;
  laborMax += chairs.totalMax || 0;
  if (chairs.label) adjustments.push(chairs.label);
  if (chairs.manualReview) {
    internalAdjustments.push("MANUAL REVIEW: chair quantity is notSure — no automatic chair adder applied");
  }

  const oldFurniture = cfg.oldFurniture[formData.diningTableExistingTable] || cfg.oldFurniture.no;
  laborMin += oldFurniture.totalMin || 0;
  laborMax += oldFurniture.totalMax || 0;
  if (oldFurniture.label) adjustments.push(oldFurniture.label);
  if (oldFurniture.manualReview) {
    internalAdjustments.push("MANUAL REVIEW: existing dining table answer is notSure — no automatic removal fee applied");
  }
  if (formData.diningTableExistingTable === "moveOnly") {
    internalAdjustments.push("Existing dining table moveOnly included in base ($0 adder)");
  }

  adjustments.push("Included with your Dining Table Assembly:");
  (cfg.includedServices || []).forEach((item) => adjustments.push(`• ${item}`));

  const manualReviewRequired =
    formData.diningTableSize === "notSure" ||
    formData.diningTableChairQuantity === "notSure" ||
    formData.diningTableExistingTable === "notSure";

  laborMin = Math.max(0, laborMin);
  laborMax = Math.max(laborMin, laborMax);

  return {
    hours: base.hours || 2,
    minMaterials: 0,
    maxMaterials: 0,
    laborMin,
    laborMax,
    totalMin: laborMin,
    totalMax: laborMax,
    materialsList: cfg.materials,
    adjustments,
    internalAdjustments,
    leadMeta,
    diningTableManualReviewRequired: manualReviewRequired
  };
}

function calculateBookcaseAssemblyEstimate(formData) {
  const leadMeta = classifyLead(formData);
  const cfg = PRICING.furnitureBookcase;
  const adjustments = [];
  const internalAdjustments = [
    `Service zone: ${leadMeta.serviceZone}`,
    `Distance band: ${leadMeta.distanceBand}`,
    `Lead priority: ${leadMeta.leadPriority}`,
    "Bookcase competitive pricing: first-unit base + grouped additional-unit adder (2–4) + removeDispose only"
  ];

  const projectKind = formData.bookcaseProjectType || "freestanding";
  const quantity = formData.bookcaseQuantity || "1";
  const quantityCfg = cfg.quantity[quantity] || cfg.quantity["1"];
  const quantityAdderApplied = ["2", "3", "4"].includes(quantity);
  const blocksAutoPrice =
    projectKind === "customBuiltIn" || projectKind === "notSure" || quantity === "5OrMore";

  if (formData.bookcaseBrand) {
    internalAdjustments.push(`Brand/store (prep only, $0): ${formData.bookcaseBrand}`);
  }
  if (formData.bookcaseAlreadyInRoom) {
    internalAdjustments.push(`Already in room (prep only, $0): ${formData.bookcaseAlreadyInRoom}`);
  }
  if (formData.bookcaseHasDoorsDrawers) {
    internalAdjustments.push(`Doors/drawers (prep only, $0): ${formData.bookcaseHasDoorsDrawers}`);
  }
  if (formData.bookcaseHasGlass) {
    internalAdjustments.push(`Glass doors/shelves (prep only, $0): ${formData.bookcaseHasGlass}`);
  }
  if (formData.bookcaseHasLighting) {
    internalAdjustments.push(`Built-in lighting (prep only, $0): ${formData.bookcaseHasLighting}`);
  }
  if (formData.bookcaseWallAnchoring) {
    internalAdjustments.push(`Wall anchoring (included $0): ${formData.bookcaseWallAnchoring}`);
  }
  if (formData.bookcaseConnectUnits) {
    internalAdjustments.push(`Connect units (included $0): ${formData.bookcaseConnectUnits}`);
  }
  if (formData.bookcaseFinalPositioning) {
    internalAdjustments.push(`Final positioning (prep only, $0): ${formData.bookcaseFinalPositioning}`);
  }
  if (formData.bookcasePackagingCleanup) {
    internalAdjustments.push(`Packaging cleanup (prep only, $0): ${formData.bookcasePackagingCleanup}`);
  }
  if (formData.bookcaseHasProductLink === "yes") {
    const link = normalizeProductUrl(formData.bookcaseProductLink);
    internalAdjustments.push(`Product link (prep only, $0): ${link || "requested but empty"}`);
    if (link) adjustments.push(`Product link provided: ${link}`);
  }

  if (blocksAutoPrice) {
    if (projectKind === "customBuiltIn" || projectKind === "notSure") {
      adjustments.push(
        "Custom or built-in bookcases require measurements, wall-condition review, material planning, and a personalized construction estimate."
      );
      adjustments.push(
        "This is not a freestanding Furniture Assembly estimate. Please use Get My Accurate Estimate so Tamay Enterprises can review construction scope."
      );
    } else {
      adjustments.push(quantityCfg.label || "Five or more units require personalized review");
      adjustments.push(
        "Five or more separate bookshelf/bookcase units need a personalized review. Please use Get My Accurate Estimate and include product links, photos, and manuals when possible."
      );
    }

    const flagReview = true;

    return {
      hours: 0,
      minMaterials: 0,
      maxMaterials: 0,
      laborMin: 0,
      laborMax: 0,
      totalMin: 0,
      totalMax: 0,
      materialsList: cfg.materials,
      adjustments,
      internalAdjustments,
      leadMeta,
      isManualReviewRequired: true,
      manualReviewHeading: "Personalized Estimate Required",
      manualReviewIntro:
        projectKind === "customBuiltIn" || projectKind === "notSure"
          ? "Custom or built-in bookcases need a personalized construction review before pricing can be confirmed."
          : "Five or more bookshelf/bookcase units need a personalized Tamay review before pricing can be confirmed.",
      manualReviewDisclaimer:
        "Please submit product links, photos, and manuals with <strong>Get My Exact Quote</strong> so Tamay Enterprises can confirm scope and pricing.",
      bookcaseQuantityAdderApplied: false,
      bookcaseRemovalDisposalRequested: formData.bookcaseExistingFurniture === "removeDispose",
      bookcaseManualReviewRequired: flagReview
    };
  }

  const base = cfg.base[formData.bookcaseSize] || cfg.base.notSure;
  let laborMin = base.totalMin;
  let laborMax = base.totalMax;
  adjustments.push(base.label);
  adjustments.push(
    "Base price covers the first freestanding unit and includes shelves/doors/drawers when included, basic anti-tip anchoring when requested, connecting compatible units when requested, final placement, in-home movement, and basic packaging cleanup"
  );

  laborMin += quantityCfg.totalMin || 0;
  laborMax += quantityCfg.totalMax || 0;
  if (quantityCfg.label) adjustments.push(quantityCfg.label);
  if (quantityCfg.manualReview) {
    internalAdjustments.push("MANUAL REVIEW: quantity is notSure — no automatic quantity adder applied");
  }

  const oldFurniture = cfg.oldFurniture[formData.bookcaseExistingFurniture] || cfg.oldFurniture.no;
  laborMin += oldFurniture.totalMin || 0;
  laborMax += oldFurniture.totalMax || 0;
  if (oldFurniture.label) adjustments.push(oldFurniture.label);
  if (oldFurniture.manualReview) {
    internalAdjustments.push("MANUAL REVIEW: existing furniture answer is notSure — no automatic removal fee applied");
  }
  if (formData.bookcaseExistingFurniture === "moveOnly") {
    internalAdjustments.push("Existing furniture moveOnly included in base ($0 adder)");
  }

  adjustments.push("Included with your Bookshelf / Bookcase Assembly:");
  (cfg.includedServices || []).forEach((item) => adjustments.push(`• ${item}`));

  const manualReviewRequired =
    formData.bookcaseSize === "notSure" ||
    formData.bookcaseQuantity === "notSure" ||
    formData.bookcaseExistingFurniture === "notSure";

  laborMin = Math.max(0, laborMin);
  laborMax = Math.max(laborMin, laborMax);

  return {
    hours: base.hours || 2,
    minMaterials: 0,
    maxMaterials: 0,
    laborMin,
    laborMax,
    totalMin: laborMin,
    totalMax: laborMax,
    materialsList: cfg.materials,
    adjustments,
    internalAdjustments,
    leadMeta,
    isManualReviewRequired: false,
    bookcaseQuantityAdderApplied: quantityAdderApplied,
    bookcaseRemovalDisposalRequested: formData.bookcaseExistingFurniture === "removeDispose",
    bookcaseManualReviewRequired: manualReviewRequired
  };
}

function calculateCoffeeTableAssemblyEstimate(formData) {
  const leadMeta = classifyLead(formData);
  const cfg = PRICING.furnitureCoffeeTable;
  const adjustments = [];
  const internalAdjustments = [
    `Service zone: ${leadMeta.serviceZone}`,
    `Distance band: ${leadMeta.distanceBand}`,
    `Lead priority: ${leadMeta.leadPriority}`,
    "Coffee table competitive pricing: base includes normal assembly complexity; only removeDispose may add cost"
  ];

  const base = cfg.base[formData.coffeeTableSize] || cfg.base.notSure;
  let laborMin = base.totalMin;
  let laborMax = base.totalMax;
  adjustments.push(base.label);
  adjustments.push(
    "Base price includes storage/drawers when included, lift-top mechanism assembly when included, glass top handling when included, final placement when requested, in-home movement, and basic packaging cleanup"
  );

  if (formData.coffeeTableBrand) {
    internalAdjustments.push(`Brand/store (prep only, $0): ${formData.coffeeTableBrand}`);
  }
  if (formData.coffeeTableAlreadyInRoom) {
    internalAdjustments.push(`Already in room (prep only, $0): ${formData.coffeeTableAlreadyInRoom}`);
  }
  if (formData.coffeeTableStorage) {
    internalAdjustments.push(`Storage/drawers (prep only, $0): ${formData.coffeeTableStorage}`);
  }
  if (formData.coffeeTableLiftTop) {
    internalAdjustments.push(`Lift-top (prep only, $0): ${formData.coffeeTableLiftTop}`);
  }
  if (formData.coffeeTableGlass) {
    internalAdjustments.push(`Glass top (prep only, $0): ${formData.coffeeTableGlass}`);
  }
  if (formData.coffeeTableFinalPositioning) {
    internalAdjustments.push(`Final positioning (prep only, $0): ${formData.coffeeTableFinalPositioning}`);
  }
  if (formData.coffeeTablePackagingCleanup) {
    internalAdjustments.push(`Packaging cleanup (prep only, $0): ${formData.coffeeTablePackagingCleanup}`);
  }
  if (formData.coffeeTableHasProductLink === "yes") {
    const link = normalizeProductUrl(formData.coffeeTableProductLink);
    internalAdjustments.push(`Product link (prep only, $0): ${link || "requested but empty"}`);
    if (link) adjustments.push(`Product link provided: ${link}`);
  }

  const oldFurniture = cfg.oldFurniture[formData.coffeeTableExistingTable] || cfg.oldFurniture.no;
  laborMin += oldFurniture.totalMin || 0;
  laborMax += oldFurniture.totalMax || 0;
  if (oldFurniture.label) adjustments.push(oldFurniture.label);
  if (oldFurniture.manualReview) {
    internalAdjustments.push("MANUAL REVIEW: existing coffee table answer is notSure — no automatic removal fee applied");
  }
  if (formData.coffeeTableExistingTable === "moveOnly") {
    internalAdjustments.push("Existing coffee table moveOnly included in base ($0 adder)");
  }

  adjustments.push("Included with your Coffee Table Assembly:");
  (cfg.includedServices || []).forEach((item) => adjustments.push(`• ${item}`));

  const manualReviewRequired =
    formData.coffeeTableSize === "notSure" || formData.coffeeTableExistingTable === "notSure";

  laborMin = Math.max(0, laborMin);
  laborMax = Math.max(laborMin, laborMax);

  return {
    hours: base.hours || 1.5,
    minMaterials: 0,
    maxMaterials: 0,
    laborMin,
    laborMax,
    totalMin: laborMin,
    totalMax: laborMax,
    materialsList: cfg.materials,
    adjustments,
    internalAdjustments,
    leadMeta,
    coffeeTableManualReviewRequired: manualReviewRequired
  };
}

function calculateNightstandAssemblyEstimate(formData) {
  const leadMeta = classifyLead(formData);
  const cfg = PRICING.furnitureNightstand;
  const adjustments = [];
  const internalAdjustments = [
    `Service zone: ${leadMeta.serviceZone}`,
    `Distance band: ${leadMeta.distanceBand}`,
    `Lead priority: ${leadMeta.leadPriority}`,
    "Nightstand competitive pricing: first-unit base + grouped additional-unit adder (2–4) + removeDispose only"
  ];

  const quantity = formData.nightstandQuantity || "1";
  const quantityCfg = cfg.quantity[quantity] || cfg.quantity["1"];
  const quantityAdderApplied = ["2", "3", "4"].includes(quantity);
  const blocksAutoPrice = quantity === "5OrMore";

  if (formData.nightstandBrand) {
    internalAdjustments.push(`Brand/store (prep only, $0): ${formData.nightstandBrand}`);
  }
  if (formData.nightstandAlreadyInRoom) {
    internalAdjustments.push(`Already in room (prep only, $0): ${formData.nightstandAlreadyInRoom}`);
  }
  if (formData.nightstandHasDrawers) {
    internalAdjustments.push(`Drawers (prep only, $0): ${formData.nightstandHasDrawers}`);
  }
  if (formData.nightstandHasDoors) {
    internalAdjustments.push(`Doors/cabinet (prep only, $0): ${formData.nightstandHasDoors}`);
  }
  if (formData.nightstandHasPowerComponents) {
    internalAdjustments.push(
      `Lighting/USB/charging (prep only, $0): ${formData.nightstandHasPowerComponents}`
    );
  }
  if (formData.nightstandHasGlass) {
    internalAdjustments.push(`Glass top/shelf (prep only, $0): ${formData.nightstandHasGlass}`);
  }
  if (formData.nightstandWallAnchoring) {
    internalAdjustments.push(`Wall anchoring (included $0): ${formData.nightstandWallAnchoring}`);
  }
  if (formData.nightstandFinalPositioning) {
    internalAdjustments.push(`Final positioning (prep only, $0): ${formData.nightstandFinalPositioning}`);
  }
  if (formData.nightstandPackagingCleanup) {
    internalAdjustments.push(`Packaging cleanup (prep only, $0): ${formData.nightstandPackagingCleanup}`);
  }
  if (formData.nightstandHasProductLink === "yes") {
    const link = normalizeProductUrl(formData.nightstandProductLink);
    internalAdjustments.push(`Product link (prep only, $0): ${link || "requested but empty"}`);
    if (link) adjustments.push(`Product link provided: ${link}`);
  }

  if (blocksAutoPrice) {
    adjustments.push(quantityCfg.label || "Five or more nightstands require personalized review");
    adjustments.push(
      "Five or more separate nightstands need a personalized review. Please use Get My Accurate Estimate and include product links, photos, and manuals when possible."
    );

    return {
      hours: 0,
      minMaterials: 0,
      maxMaterials: 0,
      laborMin: 0,
      laborMax: 0,
      totalMin: 0,
      totalMax: 0,
      materialsList: cfg.materials,
      adjustments,
      internalAdjustments,
      leadMeta,
      isManualReviewRequired: true,
      manualReviewHeading: "Personalized Estimate Required",
      manualReviewIntro:
        "Five or more nightstands need a personalized Tamay review before pricing can be confirmed.",
      manualReviewDisclaimer:
        "Please submit product links, photos, and manuals with <strong>Get My Exact Quote</strong> so Tamay Enterprises can confirm scope and pricing.",
      nightstandQuantityAdderApplied: false,
      nightstandRemovalDisposalRequested: formData.nightstandExistingFurniture === "removeDispose",
      nightstandManualReviewRequired: true
    };
  }

  const base = cfg.base[formData.nightstandSize] || cfg.base.notSure;
  let laborMin = base.totalMin;
  let laborMax = base.totalMax;
  adjustments.push(base.label);
  adjustments.push(
    "Base price covers the first nightstand and includes drawers/doors when included, product lighting and charging-component connection when included, glass components when included, basic anti-tip anchoring when requested, final placement, in-home movement, and basic packaging cleanup"
  );

  laborMin += quantityCfg.totalMin || 0;
  laborMax += quantityCfg.totalMax || 0;
  if (quantityCfg.label) adjustments.push(quantityCfg.label);
  if (quantityCfg.manualReview) {
    internalAdjustments.push("MANUAL REVIEW: quantity is notSure — no automatic quantity adder applied");
  }

  const oldFurniture = cfg.oldFurniture[formData.nightstandExistingFurniture] || cfg.oldFurniture.no;
  laborMin += oldFurniture.totalMin || 0;
  laborMax += oldFurniture.totalMax || 0;
  if (oldFurniture.label) adjustments.push(oldFurniture.label);
  if (oldFurniture.manualReview) {
    internalAdjustments.push(
      "MANUAL REVIEW: existing nightstand answer is notSure — no automatic removal fee applied"
    );
  }
  if (formData.nightstandExistingFurniture === "moveOnly") {
    internalAdjustments.push("Existing nightstand moveOnly included in base ($0 adder)");
  }

  adjustments.push("Included with your Nightstand Assembly:");
  (cfg.includedServices || []).forEach((item) => adjustments.push(`• ${item}`));

  const manualReviewRequired =
    formData.nightstandSize === "notSure" ||
    formData.nightstandQuantity === "notSure" ||
    formData.nightstandExistingFurniture === "notSure";

  laborMin = Math.max(0, laborMin);
  laborMax = Math.max(laborMin, laborMax);

  return {
    hours: base.hours || 1.25,
    minMaterials: 0,
    maxMaterials: 0,
    laborMin,
    laborMax,
    totalMin: laborMin,
    totalMax: laborMax,
    materialsList: cfg.materials,
    adjustments,
    internalAdjustments,
    leadMeta,
    isManualReviewRequired: false,
    nightstandQuantityAdderApplied: quantityAdderApplied,
    nightstandRemovalDisposalRequested: formData.nightstandExistingFurniture === "removeDispose",
    nightstandManualReviewRequired: manualReviewRequired
  };
}

function calculateOfficeChairAssemblyEstimate(formData) {
  const leadMeta = classifyLead(formData);
  const cfg = PRICING.furnitureOfficeChair;
  const adjustments = [];
  const internalAdjustments = [
    `Service zone: ${leadMeta.serviceZone}`,
    `Distance band: ${leadMeta.distanceBand}`,
    `Lead priority: ${leadMeta.leadPriority}`,
    "Office chair competitive pricing: first-chair base + grouped additional-chair adder (2–4) + removeDispose only"
  ];

  const quantity = formData.officeChairQuantity || "1";
  const quantityCfg = cfg.quantity[quantity] || cfg.quantity["1"];
  const quantityAdderApplied = ["2", "3", "4"].includes(quantity);
  const blocksAutoPrice = quantity === "5OrMore";

  if (formData.officeChairBrand) {
    internalAdjustments.push(`Brand/store (prep only, $0): ${formData.officeChairBrand}`);
  }
  if (formData.officeChairAlreadyInRoom) {
    internalAdjustments.push(`Already in room (prep only, $0): ${formData.officeChairAlreadyInRoom}`);
  }
  if (formData.officeChairHasAdjustableArmrests) {
    internalAdjustments.push(
      `Adjustable armrests (prep only, $0): ${formData.officeChairHasAdjustableArmrests}`
    );
  }
  if (formData.officeChairHasHeadrestLumbar) {
    internalAdjustments.push(
      `Headrest/lumbar (prep only, $0): ${formData.officeChairHasHeadrestLumbar}`
    );
  }
  if (formData.officeChairHasRecliningFootrest) {
    internalAdjustments.push(
      `Reclining/footrest (prep only, $0): ${formData.officeChairHasRecliningFootrest}`
    );
  }
  if (formData.officeChairHasElectronicFeatures) {
    internalAdjustments.push(
      `Electronic features (prep only, $0): ${formData.officeChairHasElectronicFeatures}`
    );
  }
  if (formData.officeChairAdjustmentTesting) {
    internalAdjustments.push(
      `Adjustment/testing (included $0): ${formData.officeChairAdjustmentTesting}`
    );
  }
  if (formData.officeChairFinalPositioning) {
    internalAdjustments.push(`Final positioning (prep only, $0): ${formData.officeChairFinalPositioning}`);
  }
  if (formData.officeChairPackagingCleanup) {
    internalAdjustments.push(`Packaging cleanup (prep only, $0): ${formData.officeChairPackagingCleanup}`);
  }
  if (formData.officeChairHasProductLink === "yes") {
    const link = normalizeProductUrl(formData.officeChairProductLink);
    internalAdjustments.push(`Product link (prep only, $0): ${link || "requested but empty"}`);
    if (link) adjustments.push(`Product link provided: ${link}`);
  }

  if (blocksAutoPrice) {
    adjustments.push(quantityCfg.label || "Five or more office chairs require personalized review");
    adjustments.push(
      "Five or more separate office chairs need a personalized review. Please use Get My Accurate Estimate and include product links, photos, and manuals when possible."
    );

    return {
      hours: 0,
      minMaterials: 0,
      maxMaterials: 0,
      laborMin: 0,
      laborMax: 0,
      totalMin: 0,
      totalMax: 0,
      materialsList: cfg.materials,
      adjustments,
      internalAdjustments,
      leadMeta,
      isManualReviewRequired: true,
      manualReviewHeading: "Personalized Estimate Required",
      manualReviewIntro:
        "Five or more office chairs need a personalized Tamay review before pricing can be confirmed.",
      manualReviewDisclaimer:
        "Please submit product links, photos, and manuals with <strong>Get My Exact Quote</strong> so Tamay Enterprises can confirm scope and pricing.",
      officeChairQuantityAdderApplied: false,
      officeChairRemovalDisposalRequested: formData.officeChairExistingFurniture === "removeDispose",
      officeChairManualReviewRequired: true
    };
  }

  const base = cfg.base[formData.officeChairType] || cfg.base.notSure;
  let laborMin = base.totalMin;
  let laborMax = base.totalMax;
  adjustments.push(base.label);
  adjustments.push(
    "Base price covers the first office chair and includes armrests/headrest/lumbar when included, reclining and footrest components when included, supplied electronic-feature connection when included, final adjustment and testing when requested, final placement, in-home movement, and basic packaging cleanup"
  );

  laborMin += quantityCfg.totalMin || 0;
  laborMax += quantityCfg.totalMax || 0;
  if (quantityCfg.label) adjustments.push(quantityCfg.label);
  if (quantityCfg.manualReview) {
    internalAdjustments.push("MANUAL REVIEW: quantity is notSure — no automatic quantity adder applied");
  }

  const oldFurniture = cfg.oldFurniture[formData.officeChairExistingFurniture] || cfg.oldFurniture.no;
  laborMin += oldFurniture.totalMin || 0;
  laborMax += oldFurniture.totalMax || 0;
  if (oldFurniture.label) adjustments.push(oldFurniture.label);
  if (oldFurniture.manualReview) {
    internalAdjustments.push(
      "MANUAL REVIEW: existing office chair answer is notSure — no automatic removal fee applied"
    );
  }
  if (formData.officeChairExistingFurniture === "moveOnly") {
    internalAdjustments.push("Existing office chair moveOnly included in base ($0 adder)");
  }

  adjustments.push("Included with your Office Chair Assembly:");
  (cfg.includedServices || []).forEach((item) => adjustments.push(`• ${item}`));

  const manualReviewRequired =
    formData.officeChairType === "notSure" ||
    formData.officeChairQuantity === "notSure" ||
    formData.officeChairExistingFurniture === "notSure";

  laborMin = Math.max(0, laborMin);
  laborMax = Math.max(laborMin, laborMax);

  return {
    hours: base.hours || 1.1,
    minMaterials: 0,
    maxMaterials: 0,
    laborMin,
    laborMax,
    totalMin: laborMin,
    totalMax: laborMax,
    materialsList: cfg.materials,
    adjustments,
    internalAdjustments,
    leadMeta,
    isManualReviewRequired: false,
    officeChairQuantityAdderApplied: quantityAdderApplied,
    officeChairRemovalDisposalRequested: formData.officeChairExistingFurniture === "removeDispose",
    officeChairManualReviewRequired: manualReviewRequired
  };
}

function calculateEntertainmentCenterAssemblyEstimate(formData) {
  const leadMeta = classifyLead(formData);
  const cfg = PRICING.furnitureEntertainmentCenter;
  const adjustments = [];
  const internalAdjustments = [
    `Service zone: ${leadMeta.serviceZone}`,
    `Distance band: ${leadMeta.distanceBand}`,
    `Lead priority: ${leadMeta.leadPriority}`,
    "Entertainment center competitive pricing: base + grouped section adder (2To3/4To5) + removeDispose only"
  ];

  const sectionCount = formData.entertainmentCenterSectionCount || "1";
  const sectionCfg = cfg.sections[sectionCount] || cfg.sections["1"];
  const sectionAdderApplied = ["2To3", "4To5"].includes(sectionCount);
  const blocksAutoPrice = sectionCount === "6OrMore";

  if (formData.entertainmentCenterBrand) {
    internalAdjustments.push(`Brand/store (prep only, $0): ${formData.entertainmentCenterBrand}`);
  }
  if (formData.entertainmentCenterAlreadyInRoom) {
    internalAdjustments.push(`Already in room (prep only, $0): ${formData.entertainmentCenterAlreadyInRoom}`);
  }
  if (formData.entertainmentCenterHasStorageComponents) {
    internalAdjustments.push(
      `Drawers/doors/shelves (prep only, $0): ${formData.entertainmentCenterHasStorageComponents}`
    );
  }
  if (formData.entertainmentCenterHasTowersBridge) {
    internalAdjustments.push(
      `Towers/bridge (prep only, $0 — section count handles complexity): ${formData.entertainmentCenterHasTowersBridge}`
    );
  }
  if (formData.entertainmentCenterHasGlass) {
    internalAdjustments.push(`Glass components (prep only, $0): ${formData.entertainmentCenterHasGlass}`);
  }
  if (formData.entertainmentCenterHasElectronicComponents) {
    internalAdjustments.push(
      `Electronic components (prep only, $0): ${formData.entertainmentCenterHasElectronicComponents}`
    );
  }
  if (formData.entertainmentCenterWallAnchoring) {
    internalAdjustments.push(`Wall anchoring (included $0): ${formData.entertainmentCenterWallAnchoring}`);
  }
  if (formData.entertainmentCenterTvPlacement) {
    internalAdjustments.push(
      `TV placement on furniture (prep only, $0 — no wall mount): ${formData.entertainmentCenterTvPlacement}`
    );
  }
  if (formData.entertainmentCenterFinalPositioning) {
    internalAdjustments.push(
      `Final positioning (prep only, $0): ${formData.entertainmentCenterFinalPositioning}`
    );
  }
  if (formData.entertainmentCenterPackagingCleanup) {
    internalAdjustments.push(
      `Packaging cleanup (prep only, $0): ${formData.entertainmentCenterPackagingCleanup}`
    );
  }
  if (formData.entertainmentCenterHasProductLink === "yes") {
    const link = normalizeProductUrl(formData.entertainmentCenterProductLink);
    internalAdjustments.push(`Product link (prep only, $0): ${link || "requested but empty"}`);
    if (link) adjustments.push(`Product link provided: ${link}`);
  }

  if (blocksAutoPrice) {
    adjustments.push(sectionCfg.label || "Six or more sections require personalized review");
    adjustments.push(
      "Six or more separate entertainment-center sections need a personalized review. Please use Get My Accurate Estimate and include product links, photos, and manuals when possible."
    );

    return {
      hours: 0,
      minMaterials: 0,
      maxMaterials: 0,
      laborMin: 0,
      laborMax: 0,
      totalMin: 0,
      totalMax: 0,
      materialsList: cfg.materials,
      adjustments,
      internalAdjustments,
      leadMeta,
      isManualReviewRequired: true,
      manualReviewHeading: "Personalized Estimate Required",
      manualReviewIntro:
        "Six or more entertainment-center sections need a personalized Tamay review before pricing can be confirmed.",
      manualReviewDisclaimer:
        "Please submit product links, photos, and manuals with <strong>Get My Exact Quote</strong> so Tamay Enterprises can confirm scope and pricing.",
      entertainmentCenterSectionAdderApplied: false,
      entertainmentCenterRemovalDisposalRequested:
        formData.entertainmentCenterExistingFurniture === "removeDispose",
      entertainmentCenterManualReviewRequired: true
    };
  }

  const base = cfg.base[formData.entertainmentCenterType] || cfg.base.notSure;
  let laborMin = base.totalMin;
  let laborMax = base.totalMax;
  adjustments.push(base.label);
  adjustments.push(
    "Base price covers freestanding entertainment-center assembly and includes drawers/doors/shelves when included, glass components when included, supplied electronic-component connection when included, basic anti-tip anchoring when requested, final placement and leveling, in-home movement, and basic packaging cleanup"
  );

  laborMin += sectionCfg.totalMin || 0;
  laborMax += sectionCfg.totalMax || 0;
  if (sectionCfg.label) adjustments.push(sectionCfg.label);
  if (sectionCfg.manualReview) {
    internalAdjustments.push("MANUAL REVIEW: section count is notSure — no automatic section adder applied");
  }

  const oldFurniture =
    cfg.oldFurniture[formData.entertainmentCenterExistingFurniture] || cfg.oldFurniture.no;
  laborMin += oldFurniture.totalMin || 0;
  laborMax += oldFurniture.totalMax || 0;
  if (oldFurniture.label) adjustments.push(oldFurniture.label);
  if (oldFurniture.manualReview) {
    internalAdjustments.push(
      "MANUAL REVIEW: existing entertainment center answer is notSure — no automatic removal fee applied"
    );
  }
  if (formData.entertainmentCenterExistingFurniture === "moveOnly") {
    internalAdjustments.push("Existing entertainment center moveOnly included in base ($0 adder)");
  }

  adjustments.push("Included with your Entertainment Center Assembly:");
  (cfg.includedServices || []).forEach((item) => adjustments.push(`• ${item}`));

  const manualReviewRequired =
    formData.entertainmentCenterType === "notSure" ||
    formData.entertainmentCenterSectionCount === "notSure" ||
    formData.entertainmentCenterExistingFurniture === "notSure";

  laborMin = Math.max(0, laborMin);
  laborMax = Math.max(laborMin, laborMax);

  return {
    hours: base.hours || 2.5,
    minMaterials: 0,
    maxMaterials: 0,
    laborMin,
    laborMax,
    totalMin: laborMin,
    totalMax: laborMax,
    materialsList: cfg.materials,
    adjustments,
    internalAdjustments,
    leadMeta,
    isManualReviewRequired: false,
    entertainmentCenterSectionAdderApplied: sectionAdderApplied,
    entertainmentCenterRemovalDisposalRequested:
      formData.entertainmentCenterExistingFurniture === "removeDispose",
    entertainmentCenterManualReviewRequired: manualReviewRequired
  };
}

function resolveAiDesignLocationFactor(zipcodeRaw) {
  const zip = String(zipcodeRaw || "").trim().slice(0, 5);
  const entry = AI_DESIGN_LOCATION_FACTORS[zip];

  if (entry && typeof entry.factor === "number") {
    return {
      zip,
      town: entry.town || "",
      factor: entry.factor,
      source: "zip_table",
      configuredFactor: entry.factor
    };
  }

  const configuredDefault = AI_DESIGN_LOCATION_FACTORS.default?.factor;
  if (typeof configuredDefault === "number") {
    return {
      zip,
      town: entry?.town || "",
      factor: configuredDefault,
      source: "configured_default",
      configuredFactor: configuredDefault
    };
  }

  // Review-only fallback so the UI can show ranges before Carlos fills factors.
  return {
    zip,
    town: entry?.town || "",
    factor: AI_DESIGN_TEMP_DEFAULT_LOCATION_FACTOR,
    source: "temp_review_default",
    configuredFactor: null
  };
}

function buildAiDesignProjectBaseRange(formData) {
  const spaceBase = AI_DESIGN_BASE_BY_SPACE[formData.aiDesignSpaceType] || AI_DESIGN_BASE_BY_SPACE.other;
  const goal = AI_DESIGN_GOAL_FACTORS[formData.aiDesignProjectGoal] ?? 1;
  const size = AI_DESIGN_SIZE_FACTORS[formData.aiDesignApproxSize] ?? 1;
  const condition = AI_DESIGN_CONDITION_FACTORS[formData.aiDesignCurrentCondition] ?? 1;
  const layout = AI_DESIGN_LAYOUT_FACTORS[formData.aiDesignLayoutChange] ?? 1;
  const scopeFactor = goal * size * condition * layout;

  return {
    min: Math.round(spaceBase.min * scopeFactor),
    max: Math.round(spaceBase.max * scopeFactor),
    scopeFactor,
    spaceBase
  };
}

function calculateAiDesignEstimate(formData) {
  const leadMeta = classifyLead(formData);
  const location = resolveAiDesignLocationFactor(formData.zipcode);
  const projectBase = buildAiDesignProjectBaseRange(formData);
  const ranges = {};

  Object.keys(AI_DESIGN_FINISH_LEVELS).forEach((key) => {
    const finish = AI_DESIGN_FINISH_LEVELS[key];
    const adjustment = typeof finish.adjustment === "number" ? finish.adjustment : 1;
    ranges[key] = {
      label: finish.label,
      adjustment,
      min: Math.round(projectBase.min * location.factor * adjustment),
      max: Math.round(projectBase.max * location.factor * adjustment)
    };
  });

  const selectedKey = selectedAiFinishLevel && ranges[selectedAiFinishLevel] ? selectedAiFinishLevel : null;
  const selectedRange = selectedKey ? ranges[selectedKey] : null;
  const totalMin = selectedRange ? selectedRange.min : ranges.essential.min;
  const totalMax = selectedRange ? selectedRange.max : ranges.premium.max;

  return {
    isAiDesign: true,
    minMaterials: 0,
    maxMaterials: 0,
    laborMin: 0,
    laborMax: 0,
    hours: 0,
    totalMin,
    totalMax,
    materialsList: ["Localized AI Design preliminary range (materials/fixtures vary by finish level)"],
    adjustments: [
      `Space: ${formData.aiDesignSpaceType}`,
      `Goal: ${formData.aiDesignProjectGoal}`,
      `Size: ${formData.aiDesignApproxSize}`,
      `Condition: ${formData.aiDesignCurrentCondition}`,
      `Layout change: ${formData.aiDesignLayoutChange}`,
      `Priority: ${formData.aiDesignPriority}`,
      `Project base range: ${currency(projectBase.min)} - ${currency(projectBase.max)}`,
      `ZIP location factor: x${location.factor.toFixed(2)} (${location.source})`,
      `Essential: ${currency(ranges.essential.min)} - ${currency(ranges.essential.max)}`,
      `Enhanced: ${currency(ranges.enhanced.min)} - ${currency(ranges.enhanced.max)}`,
      `Premium: ${currency(ranges.premium.min)} - ${currency(ranges.premium.max)}`
    ],
    internalAdjustments: [
      `AI Design review placeholders in use until approved pricing data is loaded`,
      `Service zone (lead routing only): ${leadMeta.serviceZone}`,
      `Distance band: ${leadMeta.distanceBand}`,
      `Lead priority: ${leadMeta.leadPriority}`
    ],
    leadMeta,
    zipcode: location.zip,
    locationFactor: location.factor,
    locationFactorSource: location.source,
    locationTown: location.town,
    configuredLocationFactor: location.configuredFactor,
    projectBaseRange: { min: projectBase.min, max: projectBase.max },
    ranges,
    selectedFinishLevel: selectedKey,
    selectedFinishLabel: selectedRange ? selectedRange.label : null
  };
}

function classifyZipBand(zipcodeRaw) {
  const zip = String(zipcodeRaw || "").trim().slice(0, 5);

  if (!/^\d{5}$/.test(zip)) {
    return {
      distanceBand: "unknown",
      serviceZone: "distant",
      marketRegion: "unknown",
      multiplier: PRICING.serviceZoneMultipliers.distant
    };
  }

  if (zip.startsWith("06")) {
    const firstThree = zip.slice(0, 3);
    const corePrefixes = ["064", "065", "066", "067"];
    const extendedPrefixes = ["068", "069", "063"];

    if (corePrefixes.includes(firstThree)) {
      return {
        distanceBand: "0-50",
        serviceZone: "core",
        marketRegion: "connecticut_local",
        multiplier: PRICING.serviceZoneMultipliers.core
      };
    }

    if (extendedPrefixes.includes(firstThree)) {
      return {
        distanceBand: "50-60",
        serviceZone: "extended",
        marketRegion: "connecticut_extended",
        multiplier: PRICING.serviceZoneMultipliers.extended
      };
    }

    return {
      distanceBand: "60-70",
      serviceZone: "outer",
      marketRegion: "connecticut_outer",
      multiplier: PRICING.serviceZoneMultipliers.outer
    };
  }

  if (zip.startsWith("10") || zip.startsWith("11")) {
    return {
      distanceBand: "50-60",
      serviceZone: "extended",
      marketRegion: "new_york_near",
      multiplier: PRICING.serviceZoneMultipliers.extended
    };
  }

  if (zip.startsWith("01") || zip.startsWith("02")) {
    return {
      distanceBand: "60-70",
      serviceZone: "outer",
      marketRegion: "massachusetts_near",
      multiplier: PRICING.serviceZoneMultipliers.outer
    };
  }

  return {
    distanceBand: "70+",
    serviceZone: "distant",
    marketRegion: "outside_primary_region",
    multiplier: PRICING.serviceZoneMultipliers.distant
  };
}

function classifyJobSize(formData) {
  if (formData.projectType === "ai_design") {
    if (formData.aiDesignApproxSize === "large" || formData.aiDesignProjectGoal === "full_remodel") return "large";
    if (formData.aiDesignApproxSize === "medium" || formData.aiDesignProjectGoal === "partial_remodel") return "medium";
    return "small";
  }

  if (formData.projectType === "furniture_dresser_assembly") {
    if (formData.dresserSize === "xlarge" || formData.dresserSize === "large") return "medium";
    return "small";
  }

  if (formData.projectType === "furniture_bed_frame_assembly") {
    if (["bunkBed", "loftBed", "murphyBed", "king", "californiaKing"].includes(formData.bedType)) {
      return "large";
    }
    if (["queen", "full", "daybed"].includes(formData.bedType)) return "medium";
    return "small";
  }

  if (formData.projectType === "furniture_tv_stand_assembly") {
    if (formData.tvStandSize === "xlarge" || formData.tvStandSize === "large") return "medium";
    return "small";
  }

  if (formData.projectType === "furniture_desk_assembly") {
    if (
      ["lShapedDesk", "executiveDesk", "deskWithHutch", "standingDeskElectric", "largeDesk"].includes(
        formData.deskType
      )
    ) {
      return "medium";
    }
    return "small";
  }

  if (formData.projectType === "furniture_dining_table_assembly") {
    if (formData.diningTableSize === "extraLarge" || formData.diningTableSize === "large") return "medium";
    return "small";
  }

  if (formData.projectType === "furniture_bookcase_assembly") {
    if (formData.bookcaseQuantity === "5OrMore" || formData.bookcaseQuantity === "4") return "large";
    if (
      formData.bookcaseSize === "extraLarge" ||
      formData.bookcaseSize === "large" ||
      ["2", "3"].includes(formData.bookcaseQuantity)
    ) {
      return "medium";
    }
    return "small";
  }

  if (formData.projectType === "furniture_coffee_table_assembly") {
    if (formData.coffeeTableSize === "extraLarge" || formData.coffeeTableSize === "large") return "medium";
    return "small";
  }

  if (formData.projectType === "furniture_nightstand_assembly") {
    if (formData.nightstandQuantity === "5OrMore" || formData.nightstandQuantity === "4") return "large";
    if (
      formData.nightstandSize === "large" ||
      ["2", "3"].includes(formData.nightstandQuantity)
    ) {
      return "medium";
    }
    return "small";
  }

  if (formData.projectType === "furniture_office_chair_assembly") {
    if (formData.officeChairQuantity === "5OrMore" || formData.officeChairQuantity === "4") return "large";
    if (
      formData.officeChairType === "executiveGaming" ||
      ["2", "3"].includes(formData.officeChairQuantity)
    ) {
      return "medium";
    }
    return "small";
  }

  if (formData.projectType === "furniture_entertainment_center_assembly") {
    if (
      formData.entertainmentCenterSectionCount === "6OrMore" ||
      formData.entertainmentCenterSectionCount === "4To5" ||
      formData.entertainmentCenterType === "wallUnit"
    ) {
      return "large";
    }
    if (
      formData.entertainmentCenterType === "large" ||
      formData.entertainmentCenterSectionCount === "2To3"
    ) {
      return "medium";
    }
    return "small";
  }

  if (formData.projectType === "lighting_add_replace") {
    const count = parseInt(formData.fixtureCount || "1", 10);
    if (count >= 4) return "large";
    if (count >= 2) return "medium";
    return "small";
  }

  if (formData.projectType === "paint_one_room") {
    const count = formData.paintRoomCount;
    if (count === "5plus" || count === "4") return "large";
    if (
      count === "3" ||
      count === "2" ||
      formData.paintRoomSize === "large" ||
      formData.paintRoomSize === "open"
    ) {
      return "medium";
    }
    return "small";
  }

  if (formData.projectType === "tv_mount_install") {
    if (formData.tvSize === "xlarge") return "large";
    if (formData.tvSize === "large") return "medium";
    return "small";
  }

  if (isPlumbingProject(formData.projectType)) {
    if (
      [
        "plumbing_replace_vanity",
        "plumbing_fix_active_leak",
        "plumbing_install_new_fixture"
      ].includes(formData.projectType)
    ) {
      return "medium";
    }
    return "small";
  }

  if (["large", "xlarge"].includes(formData.damageSize)) return "large";
  if (formData.damageSize === "medium") return "medium";
  return "small";
}

function classifyLead(formData) {
  const zipMeta = classifyZipBand(formData.zipcode);
  const jobSize = classifyJobSize(formData);

  let priority = "low";
  if (zipMeta.serviceZone === "core") priority = "high";
  else if (zipMeta.serviceZone === "extended") priority = jobSize === "small" ? "medium" : "high";
  else if (zipMeta.serviceZone === "outer") priority = jobSize === "large" ? "medium" : "low";
  else priority = jobSize === "large" ? "medium" : "low";

  return { ...zipMeta, jobSize, leadPriority: priority };
}

function applyMarketAndPropertyAdjustments(baseEstimate, formData, leadMeta) {
  const propertyConfig = PROPERTY_TYPE_CONFIG[formData.propertyType] || PROPERTY_TYPE_CONFIG.house;
  const zoneMultiplier = leadMeta.multiplier;
  const propertyMultiplier = propertyConfig.multiplier;
  const finalMultiplier = zoneMultiplier * propertyMultiplier;

  baseEstimate.minMaterials *= finalMultiplier;
  baseEstimate.maxMaterials *= finalMultiplier;
  baseEstimate.laborMin *= finalMultiplier;
  baseEstimate.laborMax *= finalMultiplier;
  baseEstimate.totalMin *= finalMultiplier;
  baseEstimate.totalMax *= finalMultiplier;

  baseEstimate.internalAdjustments.push(`Market adjustment applied: x${zoneMultiplier.toFixed(2)}`);
  baseEstimate.internalAdjustments.push(`Property type adjustment: x${propertyMultiplier.toFixed(2)}`);

  return baseEstimate;
}

function calculateDrywallEstimate(formData) {
  const ctx = drywallContextConfig[formData.damageLocation === "ceiling" ? "ceiling" : "wall"];
  const leadMeta = classifyLead(formData);
  const crewHourlyRate = PRICING.labor.general.ratePerPerson * PRICING.labor.general.crewSize;
  const preset = PRICING.drywall[formData.damageSize];

  let minMaterials = preset.materialMin;
  let maxMaterials = preset.materialMax;
  let hours = preset.hours;
  const adjustments = [];
  const internalAdjustments = [];

  adjustments.push(`Selected base: ${preset.label}`);
  internalAdjustments.push(`Service zone: ${leadMeta.serviceZone}`);
  internalAdjustments.push(`Distance band: ${leadMeta.distanceBand}`);
  internalAdjustments.push(`Lead priority: ${leadMeta.leadPriority}`);

  if (formData.damageLocation === "ceiling") {
    const a = PRICING.drywallAdjustments.damageLocation.ceiling;
    hours *= a.hoursMultiplier;
    minMaterials += a.materialMinAdd;
    maxMaterials += a.materialMaxAdd;
    adjustments.push(a.label);
  }

  if (formData.texture === "light") {
    const a = PRICING.drywallAdjustments.texture.light;
    hours *= a.hoursMultiplier;
    minMaterials += a.materialMinAdd;
    maxMaterials += a.materialMaxAdd;
    adjustments.push(a.label);
  }

  if (formData.texture === "heavy") {
    const a = PRICING.drywallAdjustments.texture.heavy;
    hours *= a.hoursMultiplier;
    minMaterials += a.materialMinAdd;
    maxMaterials += a.materialMaxAdd;
    adjustments.push(a.label);
  }

  if (formData.ceilingHeight === "medium") {
    const a = PRICING.drywallAdjustments.workHeight.medium;
    hours *= a.hoursMultiplier;
    adjustments.push(a.label);
  }

  if (formData.ceilingHeight === "high") {
    const a = PRICING.drywallAdjustments.workHeight.high;
    hours *= a.hoursMultiplier;
    minMaterials += a.materialMinAdd;
    maxMaterials += a.materialMaxAdd;
    adjustments.push(a.label);
  }

  if (formData.obstacles === "yes") {
    const a = PRICING.drywallAdjustments.obstacles.yes;
    hours *= a.hoursMultiplier;
    adjustments.push(a.label);
  }

  if (formData.insulation === "yes") {
    const a = PRICING.drywallAdjustments.insulation.yes;
    hours += a.hoursAdd;
    minMaterials += a.materialMinAdd;
    maxMaterials += a.materialMaxAdd;
    adjustments.push(a.label);
  }

  if (formData.paintRequired === "yes") {
    if (formData.paintBlend === "patch-only") {
      const a = PRICING.drywallAdjustments.paint.patchOnly;
      hours += a.hoursAdd;
      minMaterials += a.materialMinAdd;
      maxMaterials += a.materialMaxAdd;
      adjustments.push(a.label);
    }

    if (formData.paintBlend === "full-surface") {
      const a = PRICING.drywallAdjustments.paint.fullSurface;
      hours += a.hoursAdd;
      minMaterials += a.materialMinAdd;
      maxMaterials += a.materialMaxAdd;
      adjustments.push(ctx.summaryMap.fullSurfacePaint);
    }

    if (formData.paintBlend === "connected-surfaces") {
      const a = PRICING.drywallAdjustments.paint.connectedSurfaces;
      hours += a.hoursAdd;
      minMaterials += a.materialMinAdd;
      maxMaterials += a.materialMaxAdd;
      adjustments.push(ctx.summaryMap.connectedSurfacePaint);
    }

    if (formData.paintBlend === "not-sure") {
      const a = PRICING.drywallAdjustments.paint.notSure;
      hours += a.hoursAdd;
      minMaterials += a.materialMinAdd;
      maxMaterials += a.materialMaxAdd;
      adjustments.push(a.label);
    }

    if (formData.paintAvailable === "no") {
      const a = PRICING.drywallAdjustments.paint.noExistingPaint;
      minMaterials += a.materialMinAdd;
      maxMaterials += a.materialMaxAdd;
      adjustments.push(a.label);
    }

    if (formData.paintAvailable === "yes") {
      adjustments.push(PRICING.drywallAdjustments.paint.yesExistingPaint.label);
    }
  }

  if (formData.scopeContext === "standard-surface") {
    const a = PRICING.drywallAdjustments.scopeContext.standardSurface;
    hours += a.hoursAdd;
    minMaterials += a.materialMinAdd;
    maxMaterials += a.materialMaxAdd;
    adjustments.push(ctx.summaryMap.standardSurface);
  }

  if (formData.scopeContext === "large-surface") {
    const a = PRICING.drywallAdjustments.scopeContext.largeSurface;
    hours += a.hoursAdd;
    minMaterials += a.materialMinAdd;
    maxMaterials += a.materialMaxAdd;
    adjustments.push(ctx.summaryMap.largeSurface);
  }

  if (formData.scopeContext === "connected-surfaces") {
    const a = PRICING.drywallAdjustments.scopeContext.connectedSurfaces;
    hours += a.hoursAdd;
    minMaterials += a.materialMinAdd;
    maxMaterials += a.materialMaxAdd;
    adjustments.push(ctx.summaryMap.connectedSurfaces);
  }

  hours = Math.round(hours * 10) / 10;

  const laborMin = hours * crewHourlyRate;
  const laborMax = laborMin * 1.15;
  const totalMin = minMaterials + laborMin;
  const totalMax = maxMaterials + laborMax;

  return applyMarketAndPropertyAdjustments(
    {
      hours,
      minMaterials,
      maxMaterials,
      laborMin,
      laborMax,
      totalMin,
      totalMax,
      materialsList: preset.materials,
      adjustments,
      internalAdjustments,
      leadMeta
    },
    formData,
    leadMeta
  );
}

function getFixtureCountMultiplier(count) {
  const n = parseInt(count || "1", 10);
  if (n <= 1) return 1;
  if (n === 2) return 1.9;
  if (n === 3) return 2.75;
  if (n === 4) return 3.6;
  return 4.45;
}

function calculateLightingEstimate(formData) {
  const leadMeta = classifyLead(formData);
  const crewHourlyRate = PRICING.labor.electrical.ratePerPerson * PRICING.labor.electrical.crewSize;
  const preset = formData.lightingType === "replace" ? PRICING.lighting.replace : PRICING.lighting.add;

  let minMaterials = preset.materialMin;
  let maxMaterials = preset.materialMax;
  let hours = preset.hours;
  const adjustments = [];
  const internalAdjustments = [];

  adjustments.push(`Selected base: ${preset.label}`);
  internalAdjustments.push(`Service zone: ${leadMeta.serviceZone}`);
  internalAdjustments.push(`Distance band: ${leadMeta.distanceBand}`);
  internalAdjustments.push(`Lead priority: ${leadMeta.leadPriority}`);

  const locationAdj = PRICING.lighting.adjustments.location[formData.lightingLocation];
  if (locationAdj) {
    hours *= locationAdj.hoursMultiplier;
    minMaterials += locationAdj.materialMinAdd || 0;
    maxMaterials += locationAdj.materialMaxAdd || 0;
    if (locationAdj.label) adjustments.push(locationAdj.label);
  }

  const fixtureTypeAdj = PRICING.lighting.adjustments.fixtureType[formData.fixtureType];
  if (fixtureTypeAdj) {
    hours *= fixtureTypeAdj.hoursMultiplier;
    minMaterials += fixtureTypeAdj.materialMinAdd || 0;
    maxMaterials += fixtureTypeAdj.materialMaxAdd || 0;
    if (fixtureTypeAdj.label) adjustments.push(fixtureTypeAdj.label);
  }

  const accessAdj = PRICING.lighting.adjustments.access[formData.accessDifficulty];
  if (accessAdj) {
    hours *= accessAdj.hoursMultiplier;
    minMaterials += accessAdj.materialMinAdd || 0;
    maxMaterials += accessAdj.materialMaxAdd || 0;
    if (accessAdj.label) adjustments.push(accessAdj.label);
  }

  if (formData.lightingType === "add") {
    const wireAdj = PRICING.lighting.adjustments.wireRun[formData.wireRun];
    if (wireAdj) {
      hours += wireAdj.hoursAdd || 0;
      minMaterials += wireAdj.materialMinAdd || 0;
      maxMaterials += wireAdj.materialMaxAdd || 0;
      if (wireAdj.label) adjustments.push(wireAdj.label);
    }

    const switchAdj = PRICING.lighting.adjustments.switch[formData.newSwitch];
    if (switchAdj) {
      hours += switchAdj.hoursAdd || 0;
      minMaterials += switchAdj.materialMinAdd || 0;
      maxMaterials += switchAdj.materialMaxAdd || 0;
      if (switchAdj.label) adjustments.push(switchAdj.label);
    }

    const shouldUseAccessRoute =
      ["medium", "long", "notSure"].includes(formData.wireRun) ||
      ["moderate", "difficult", "notSure"].includes(formData.accessDifficulty);

    if (shouldUseAccessRoute) {
      const atticAdj = PRICING.lighting.adjustments.atticAccess[formData.atticAccess];
      if (atticAdj) {
        hours *= atticAdj.hoursMultiplier;
        minMaterials += atticAdj.materialMinAdd || 0;
        maxMaterials += atticAdj.materialMaxAdd || 0;
        if (atticAdj.label) adjustments.push(atticAdj.label);
      }
    }
  }

  const shouldApplyRepair =
    (formData.lightingType === "replace" && formData.accessDifficulty !== "veryEasy") ||
    (formData.lightingType === "add" &&
      (["medium", "long", "notSure"].includes(formData.wireRun) ||
        ["no", "notSure"].includes(formData.atticAccess) ||
        ["moderate", "difficult", "notSure"].includes(formData.accessDifficulty)));

  if (shouldApplyRepair && formData.repairIncluded !== "no") {
    const repairAdj = PRICING.lighting.adjustments.repair[formData.repairIncluded];
    if (repairAdj) {
      hours += repairAdj.hoursAdd || 0;
      minMaterials += repairAdj.materialMinAdd || 0;
      maxMaterials += repairAdj.materialMaxAdd || 0;
      if (repairAdj.label) adjustments.push(repairAdj.label);
    }

    if (formData.paintAfterRepair === "yes") {
      const paintScopeAdj = PRICING.lighting.adjustments.paintScope[formData.paintLightingScope];
      if (paintScopeAdj) {
        hours += paintScopeAdj.hoursAdd || 0;
        minMaterials += paintScopeAdj.materialMinAdd || 0;
        maxMaterials += paintScopeAdj.materialMaxAdd || 0;
        if (paintScopeAdj.label) adjustments.push(paintScopeAdj.label);
      }
    }
  }

  const heightAdj = PRICING.lighting.adjustments.height[formData.lightingHeight];
  if (heightAdj) {
    hours *= heightAdj.hoursMultiplier;
    if (heightAdj.label) adjustments.push(heightAdj.label);
  }

  const obstacleAdj = PRICING.lighting.adjustments.obstacles[formData.lightingObstacles];
  if (obstacleAdj) {
    hours *= obstacleAdj.hoursMultiplier;
    if (obstacleAdj.label) adjustments.push(obstacleAdj.label);
  }

  const fixtureSupplyAdj = PRICING.lighting.adjustments.fixtureSupply[formData.fixtureSupplied];
  if (fixtureSupplyAdj) {
    minMaterials += fixtureSupplyAdj.materialMinAdd || 0;
    maxMaterials += fixtureSupplyAdj.materialMaxAdd || 0;
    if (fixtureSupplyAdj.label) adjustments.push(fixtureSupplyAdj.label);
  }

  const countMultiplier = getFixtureCountMultiplier(formData.fixtureCount);
  hours *= countMultiplier;
  minMaterials *= countMultiplier;
  maxMaterials *= countMultiplier;

  if (parseInt(formData.fixtureCount || "1", 10) > 1) {
    adjustments.push(`Quantity adjustment for ${formData.fixtureCount} fixtures`);
  }

  hours = Math.round(hours * 10) / 10;

  const laborMin = hours * crewHourlyRate;
  const laborMax = laborMin * 1.15;
  const totalMin = minMaterials + laborMin;
  const totalMax = maxMaterials + laborMax;

  return applyMarketAndPropertyAdjustments(
    {
      hours,
      minMaterials,
      maxMaterials,
      laborMin,
      laborMax,
      totalMin,
      totalMax,
      materialsList: preset.materials,
      adjustments,
      internalAdjustments,
      leadMeta
    },
    formData,
    leadMeta
  );
}

function calculateTvMountEstimate(formData) {
  const leadMeta = classifyLead(formData);
  const estimate = {
    laborMin: 0,
    laborMax: 0,
    matMin: 0,
    matMax: 0,
    breakdown: []
  };

  function addLine(item, label) {
    if (!item) return;
    estimate.laborMin += item.laborMin || 0;
    estimate.laborMax += item.laborMax || 0;
    estimate.matMin += item.matMin || 0;
    estimate.matMax += item.matMax || 0;
    if (label) estimate.breakdown.push(label);
  }

  addLine(PRICING.tvMount.base[formData.mountType], `Base installation selected: ${PRICING.tvMount.base[formData.mountType]?.label || "Standard wall mount"}`);
  addLine(PRICING.tvMount.wallType[formData.wallType], PRICING.tvMount.wallType[formData.wallType]?.label);
  addLine(PRICING.tvMount.tvSize[formData.tvSize], PRICING.tvMount.tvSize[formData.tvSize]?.label);
  addLine(PRICING.tvMount.mountProvided[formData.mountProvided], PRICING.tvMount.mountProvided[formData.mountProvided]?.label);
  addLine(PRICING.tvMount.existingOutlet[formData.existingOutlet], PRICING.tvMount.existingOutlet[formData.existingOutlet]?.label);
  addLine(PRICING.tvMount.wireConceal[formData.wireConceal], PRICING.tvMount.wireConceal[formData.wireConceal]?.label);
  addLine(PRICING.tvMount.powerWork[formData.powerWork], PRICING.tvMount.powerWork[formData.powerWork]?.label);
  addLine(PRICING.tvMount.lowVoltage[formData.lowVoltage], PRICING.tvMount.lowVoltage[formData.lowVoltage]?.label);
  addLine(PRICING.tvMount.soundbarInstall[formData.soundbarInstall], PRICING.tvMount.soundbarInstall[formData.soundbarInstall]?.label);
  addLine(PRICING.tvMount.wallPatchPaint[formData.wallPatchPaint], PRICING.tvMount.wallPatchPaint[formData.wallPatchPaint]?.label);
  addLine(PRICING.tvMount.mountHeight[formData.mountHeight], PRICING.tvMount.mountHeight[formData.mountHeight]?.label);

  let hours = 2;
  if (formData.mountType === "fireplace") hours = 3;
  if (formData.mountType === "corner") hours = 2.5;
  if (formData.mountType === "notSure") hours = 2.5;
  if (formData.tvSize === "large") hours += 0.5;
  if (formData.tvSize === "xlarge") hours += 1;
  if (formData.wireConceal === "cover") hours += 0.5;
  if (formData.wireConceal === "inWall") hours += 1.5;
  if (formData.powerWork === "yes") hours += 1.5;
  if (formData.lowVoltage === "yes") hours += 0.75;
  if (formData.wallPatchPaint === "patchOnly") hours += 0.75;
  if (formData.wallPatchPaint === "patchPaint") hours += 1.5;
  if (formData.wallPatchPaint === "notSure") hours += 1;
  hours = Math.round(hours * 10) / 10;

  const laborMin = estimate.laborMin;
  const laborMax = estimate.laborMax;
  const totalMin = estimate.matMin + laborMin;
  const totalMax = estimate.matMax + laborMax;

  return applyMarketAndPropertyAdjustments(
    {
      hours,
      minMaterials: estimate.matMin,
      maxMaterials: estimate.matMax,
      laborMin,
      laborMax,
      totalMin,
      totalMax,
      materialsList: ["Mount bracket", "Fasteners", "Cable management", "Outlet and low-voltage materials"],
      adjustments: estimate.breakdown,
      internalAdjustments: [
        `Service zone: ${leadMeta.serviceZone}`,
        `Distance band: ${leadMeta.distanceBand}`,
        `Lead priority: ${leadMeta.leadPriority}`
      ],
      leadMeta
    },
    formData,
    leadMeta
  );
}

function calculatePaintEstimate(formData) {
  const leadMeta = classifyLead(formData);
  const crewHourlyRate = PRICING.labor.general.ratePerPerson * PRICING.labor.general.crewSize;

  let minMaterials = 0;
  let maxMaterials = 0;
  let hours = 0;
  const adjustments = [];
  const internalAdjustments = [];

  internalAdjustments.push(`Service zone: ${leadMeta.serviceZone}`);
  internalAdjustments.push(`Distance band: ${leadMeta.distanceBand}`);
  internalAdjustments.push(`Lead priority: ${leadMeta.leadPriority}`);

  const scopes = formData.paintScopes.length ? formData.paintScopes : ["walls"];

  scopes.forEach((scope) => {
    const a = PRICING.paint.scopeAdds[scope];
    if (a) {
      hours += a.hours;
      minMaterials += a.matMin;
      maxMaterials += a.matMax;
      if (a.label) adjustments.push(a.label);
    }
  });

  const sizeAdj = PRICING.paint.roomSize[formData.paintRoomSize] || PRICING.paint.roomSize.not_sure;
  hours += sizeAdj.hours;
  minMaterials += sizeAdj.matMin;
  maxMaterials += sizeAdj.matMax;
  adjustments.push(sizeAdj.label);

  const colorAdj = PRICING.paint.colorChange[formData.paintColorChange];
  hours += colorAdj.hours;
  minMaterials += colorAdj.matMin;
  maxMaterials += colorAdj.matMax;
  if (colorAdj.label) adjustments.push(colorAdj.label);

  if (scopes.includes("walls")) {
    const surf = PRICING.paint.surfaceCondition[formData.paintSurfaceCondition];
    hours += surf.hours;
    minMaterials += surf.matMin;
    maxMaterials += surf.matMax;
    if (surf.label) adjustments.push(surf.label);
  }

  if (scopes.includes("ceiling")) {
    const ceil = PRICING.paint.ceilingHeight[formData.paintCeilingHeight];
    hours += ceil.hours;
    minMaterials += ceil.matMin;
    maxMaterials += ceil.matMax;
    if (ceil.label) adjustments.push(ceil.label);
  }

  const finish = PRICING.paint.finishLevel[formData.paintFinishLevel];
  hours += finish.hours;
  minMaterials += finish.matMin;
  maxMaterials += finish.matMax;
  if (finish.label) adjustments.push(finish.label);

  const prop = PRICING.paint.propertyType[formData.paintPropertyType];
  hours += prop.hours;
  minMaterials += prop.matMin;
  maxMaterials += prop.matMax;
  if (prop.label) adjustments.push(prop.label);

  const access = PRICING.paint.accessDifficulty[formData.paintAccessDifficulty];
  hours += access.hours;
  minMaterials += access.matMin;
  maxMaterials += access.matMax;
  if (access.label) adjustments.push(access.label);

  const handling = PRICING.paint.paintHandling[formData.paintHandling];
  hours += handling.hours;
  minMaterials += handling.matMin;
  maxMaterials += handling.matMax;
  if (handling.label) adjustments.push(handling.label);

  const obs = PRICING.paint.obstacles[formData.paintObstacles];
  hours += obs.hours;
  minMaterials += obs.matMin;
  maxMaterials += obs.matMax;
  if (obs.label) adjustments.push(obs.label);

  const year = PRICING.paint.yearBuilt[formData.paintYearBuilt];
  hours += year.hours;
  minMaterials += year.matMin;
  maxMaterials += year.matMax;
  if (year.label) adjustments.push(year.label);

  if (["before1980", "before1960", "notSure"].includes(formData.paintYearBuilt)) {
    const lead = PRICING.paint.leadPrepMode[formData.paintLeadPrepMode || "standard"];
    hours += lead.hours;
    minMaterials += lead.matMin;
    maxMaterials += lead.matMax;
    if (lead.label) adjustments.push(lead.label);
  }

  const countMultiplier = PRICING.paint.roomCountMultiplier[formData.paintRoomCount] || 1;
  hours *= countMultiplier;
  minMaterials *= countMultiplier;
  maxMaterials *= countMultiplier;

  if (formData.paintRoomCount !== "1") {
    adjustments.push(
      `Quantity adjustment for ${formData.paintRoomCount === "5plus" ? "5+" : formData.paintRoomCount} rooms`
    );
  }

  hours = Math.round(hours * 10) / 10;

  const laborMin = hours * crewHourlyRate;
  const laborMax = laborMin * 1.15;
  const totalMin = minMaterials + laborMin;
  const totalMax = maxMaterials + laborMax;

  return applyMarketAndPropertyAdjustments(
    {
      hours,
      minMaterials,
      maxMaterials,
      laborMin,
      laborMax,
      totalMin,
      totalMax,
      materialsList: PRICING.paint.materials,
      adjustments,
      internalAdjustments,
      leadMeta
    },
    formData,
    leadMeta
  );
}
function getCurrentPlumbingBasicsValues() {
  switch (projectType.value) {
    case "plumbing_replace_faucet":
      return {
        plumbingReason: document.getElementById("plumbingFaucetReason")?.value || "",
        plumbingLocation: document.getElementById("plumbingFaucetLocation")?.value || "",
        plumbingSeverity: document.getElementById("plumbingFaucetSeverity")?.value || ""
      };

    case "plumbing_replace_toilet":
      return {
        plumbingReason: document.getElementById("plumbingToiletReason")?.value || "",
        plumbingLocation: document.getElementById("plumbingToiletLocation")?.value || "",
        plumbingSeverity: document.getElementById("plumbingToiletSeverity")?.value || ""
      };

    case "plumbing_replace_vanity":
      return {
        plumbingReason: document.getElementById("plumbingVanityReason")?.value || "",
        plumbingLocation: document.getElementById("plumbingVanityLocation")?.value || "",
        plumbingSeverity: document.getElementById("plumbingVanitySeverity")?.value || ""
      };

    case "plumbing_replace_garbage_disposal":
      return {
        plumbingReason: document.getElementById("plumbingDisposalReason")?.value || "",
        plumbingLocation: document.getElementById("plumbingDisposalLocation")?.value || "",
        plumbingSeverity: document.getElementById("plumbingDisposalSeverity")?.value || ""
      };

    case "plumbing_replace_shutoff_valves":
      return {
        plumbingReason: document.getElementById("plumbingShutoffReason")?.value || "",
        plumbingLocation: document.getElementById("plumbingShutoffLocation")?.value || "",
        plumbingSeverity: document.getElementById("plumbingShutoffSeverity")?.value || ""
      };

    case "plumbing_fix_active_leak":
      return {
        plumbingReason: document.getElementById("plumbingLeakType")?.value || "",
        plumbingLocation: document.getElementById("plumbingLeakLocation")?.value || "",
        plumbingSeverity: document.getElementById("plumbingLeakCondition")?.value || ""
      };

    case "plumbing_install_new_fixture":
      return {
        plumbingReason: document.getElementById("plumbingNewInstallGoal")?.value || "",
        plumbingLocation: document.getElementById("plumbingNewInstallLocation")?.value || "",
        plumbingSeverity: document.getElementById("plumbingNewInstallCondition")?.value || ""
      };

    default:
      return {
        plumbingReason: "",
        plumbingLocation: "",
        plumbingSeverity: ""
      };
  }
}

function getCurrentPlumbingDetailsValues() {
  switch (projectType.value) {
    case "plumbing_replace_faucet":
      return {
        plumbingHasFixture: document.getElementById("plumbingFaucetHasFixture")?.value || "",
        plumbingShutoffCondition: document.getElementById("plumbingFaucetShutoffCondition")?.value || "",
        plumbingAccessDifficulty: document.getElementById("plumbingFaucetAccessDifficulty")?.value || "",
        plumbingVisibleDamage: document.getElementById("plumbingFaucetVisibleDamage")?.value || "",
        plumbingNotes: document.getElementById("notesPlumbingFaucet")?.value.trim() || "",

        plumbingLoose: "",
        plumbingFloorIssue: "",
        plumbingRepairScope: "",
        plumbingIncluded: "",
        plumbingSameSize: "",
        plumbingFinishTouchup: "",
        plumbingLeakDamage: "",
        plumbingScope: "",
        plumbingAreaDamage: "",
        plumbingPowerReady: "",
        plumbingValveCount: "",
        plumbingValveAccess: "",
        plumbingValveCondition: "",
        plumbingValvePartOfOtherProject: "",
        plumbingLeakDuration: "",
        plumbingAffectedSurfaces: "",
        plumbingDamageSigns: "",
        plumbingOpenAccessWork: "",
        plumbingRepairAfterStop: "",
        plumbingFixtureType: "",
        plumbingSupplyAvailable: "",
        plumbingDrainAvailable: "",
        plumbingOpeningNeeded: ""
      };

    case "plumbing_replace_toilet":
      return {
        plumbingHasFixture: document.getElementById("plumbingToiletHasFixture")?.value || "",
        plumbingShutoffCondition: "notSure",
        plumbingAccessDifficulty: document.getElementById("plumbingToiletAccessDifficulty")?.value || "",
        plumbingVisibleDamage: document.getElementById("plumbingToiletFloorIssue")?.value || "",
        plumbingNotes: document.getElementById("notesPlumbingToilet")?.value.trim() || "",

        plumbingLoose: document.getElementById("plumbingToiletLoose")?.value || "",
        plumbingFloorIssue: document.getElementById("plumbingToiletFloorIssue")?.value || "",
        plumbingRepairScope: document.getElementById("plumbingToiletRepairScope")?.value || "",
        plumbingIncluded: "",
        plumbingSameSize: "",
        plumbingFinishTouchup: "",
        plumbingLeakDamage: "",
        plumbingScope: "",
        plumbingAreaDamage: "",
        plumbingPowerReady: "",
        plumbingValveCount: "",
        plumbingValveAccess: "",
        plumbingValveCondition: "",
        plumbingValvePartOfOtherProject: "",
        plumbingLeakDuration: "",
        plumbingAffectedSurfaces: "",
        plumbingDamageSigns: "",
        plumbingOpenAccessWork: "",
        plumbingRepairAfterStop: "",
        plumbingFixtureType: "",
        plumbingSupplyAvailable: "",
        plumbingDrainAvailable: "",
        plumbingOpeningNeeded: ""
      };

    case "plumbing_replace_vanity":
      return {
        plumbingHasFixture: document.getElementById("plumbingVanityHasFixture")?.value || "",
        plumbingShutoffCondition: "notSure",
        plumbingAccessDifficulty: "notSure",
        plumbingVisibleDamage: document.getElementById("plumbingVanityLeakDamage")?.value || "",
        plumbingNotes: document.getElementById("notesPlumbingVanity")?.value.trim() || "",

        plumbingLoose: "",
        plumbingFloorIssue: "",
        plumbingRepairScope: "",
        plumbingIncluded: document.getElementById("plumbingVanityIncluded")?.value || "",
        plumbingSameSize: document.getElementById("plumbingVanitySameSize")?.value || "",
        plumbingFinishTouchup: document.getElementById("plumbingVanityFinishTouchup")?.value || "",
        plumbingLeakDamage: document.getElementById("plumbingVanityLeakDamage")?.value || "",
        plumbingScope: document.getElementById("plumbingVanityScope")?.value || "",
        plumbingAreaDamage: "",
        plumbingPowerReady: "",
        plumbingValveCount: "",
        plumbingValveAccess: "",
        plumbingValveCondition: "",
        plumbingValvePartOfOtherProject: "",
        plumbingLeakDuration: "",
        plumbingAffectedSurfaces: "",
        plumbingDamageSigns: "",
        plumbingOpenAccessWork: "",
        plumbingRepairAfterStop: "",
        plumbingFixtureType: "",
        plumbingSupplyAvailable: "",
        plumbingDrainAvailable: "",
        plumbingOpeningNeeded: ""
      };

    case "plumbing_replace_garbage_disposal":
      return {
        plumbingHasFixture: document.getElementById("plumbingDisposalHasFixture")?.value || "",
        plumbingShutoffCondition: "notSure",
        plumbingAccessDifficulty: document.getElementById("plumbingDisposalAccessDifficulty")?.value || "",
        plumbingVisibleDamage: document.getElementById("plumbingDisposalAreaDamage")?.value || "",
        plumbingNotes: document.getElementById("notesPlumbingDisposal")?.value.trim() || "",

        plumbingLoose: "",
        plumbingFloorIssue: "",
        plumbingRepairScope: "",
        plumbingIncluded: "",
        plumbingSameSize: "",
        plumbingFinishTouchup: "",
        plumbingLeakDamage: "",
        plumbingScope: document.getElementById("plumbingDisposalScope")?.value || "",
        plumbingAreaDamage: document.getElementById("plumbingDisposalAreaDamage")?.value || "",
        plumbingPowerReady: document.getElementById("plumbingDisposalPowerReady")?.value || "",
        plumbingValveCount: "",
        plumbingValveAccess: "",
        plumbingValveCondition: "",
        plumbingValvePartOfOtherProject: "",
        plumbingLeakDuration: "",
        plumbingAffectedSurfaces: "",
        plumbingDamageSigns: "",
        plumbingOpenAccessWork: "",
        plumbingRepairAfterStop: "",
        plumbingFixtureType: "",
        plumbingSupplyAvailable: "",
        plumbingDrainAvailable: "",
        plumbingOpeningNeeded: ""
      };

    case "plumbing_replace_shutoff_valves":
      return {
        plumbingHasFixture: "yes",
        plumbingShutoffCondition: document.getElementById("plumbingValveCondition")?.value || "",
        plumbingAccessDifficulty: document.getElementById("plumbingValveAccess")?.value || "",
        plumbingVisibleDamage: "no",
        plumbingNotes: document.getElementById("notesPlumbingShutoff")?.value.trim() || "",

        plumbingLoose: "",
        plumbingFloorIssue: "",
        plumbingRepairScope: "",
        plumbingIncluded: "",
        plumbingSameSize: "",
        plumbingFinishTouchup: "",
        plumbingLeakDamage: "",
        plumbingScope: document.getElementById("plumbingValveScope")?.value || "",
        plumbingAreaDamage: "",
        plumbingPowerReady: "",
        plumbingValveCount: document.getElementById("plumbingValveCount")?.value || "",
        plumbingValveAccess: document.getElementById("plumbingValveAccess")?.value || "",
        plumbingValveCondition: document.getElementById("plumbingValveCondition")?.value || "",
        plumbingValvePartOfOtherProject: document.getElementById("plumbingValvePartOfOtherProject")?.value || "",
        plumbingLeakDuration: "",
        plumbingAffectedSurfaces: "",
        plumbingDamageSigns: "",
        plumbingOpenAccessWork: "",
        plumbingRepairAfterStop: "",
        plumbingFixtureType: "",
        plumbingSupplyAvailable: "",
        plumbingDrainAvailable: "",
        plumbingOpeningNeeded: ""
      };

    case "plumbing_fix_active_leak":
      return {
        plumbingHasFixture: "notSure",
        plumbingShutoffCondition: "notSure",
        plumbingAccessDifficulty: document.getElementById("plumbingLeakAccessDifficulty")?.value || "",
        plumbingVisibleDamage: document.getElementById("plumbingLeakDamageSigns")?.value || "",
        plumbingNotes: document.getElementById("notesPlumbingLeak")?.value.trim() || "",

        plumbingLoose: "",
        plumbingFloorIssue: "",
        plumbingRepairScope: "",
        plumbingIncluded: "",
        plumbingSameSize: "",
        plumbingFinishTouchup: "",
        plumbingLeakDamage: "",
        plumbingScope: "",
        plumbingAreaDamage: "",
        plumbingPowerReady: "",
        plumbingValveCount: "",
        plumbingValveAccess: "",
        plumbingValveCondition: "",
        plumbingValvePartOfOtherProject: "",
        plumbingLeakDuration: document.getElementById("plumbingLeakDuration")?.value || "",
        plumbingAffectedSurfaces: document.getElementById("plumbingLeakAffectedSurfaces")?.value || "",
        plumbingDamageSigns: document.getElementById("plumbingLeakDamageSigns")?.value || "",
        plumbingOpenAccessWork: document.getElementById("plumbingLeakOpenAccessWork")?.value || "",
        plumbingRepairAfterStop: document.getElementById("plumbingLeakRepairAfterStop")?.value || "",
        plumbingFixtureType: "",
        plumbingSupplyAvailable: "",
        plumbingDrainAvailable: "",
        plumbingOpeningNeeded: ""
      };

    case "plumbing_install_new_fixture":
      return {
        plumbingHasFixture: document.getElementById("plumbingNewInstallHasFixture")?.value || "",
        plumbingShutoffCondition: "notSure",
        plumbingAccessDifficulty: document.getElementById("plumbingNewInstallAccessDifficulty")?.value || "",
        plumbingVisibleDamage: "no",
        plumbingNotes: document.getElementById("notesPlumbingNewInstall")?.value.trim() || "",

        plumbingLoose: "",
        plumbingFloorIssue: "",
        plumbingRepairScope: document.getElementById("plumbingNewInstallRepairScope")?.value || "",
        plumbingIncluded: "",
        plumbingSameSize: "",
        plumbingFinishTouchup: "",
        plumbingLeakDamage: "",
        plumbingScope: "",
        plumbingAreaDamage: "",
        plumbingPowerReady: "",
        plumbingValveCount: "",
        plumbingValveAccess: "",
        plumbingValveCondition: "",
        plumbingValvePartOfOtherProject: "",
        plumbingLeakDuration: "",
        plumbingAffectedSurfaces: "",
        plumbingDamageSigns: "",
        plumbingOpenAccessWork: "",
        plumbingRepairAfterStop: "",
        plumbingFixtureType: document.getElementById("plumbingNewInstallFixtureType")?.value || "",
        plumbingSupplyAvailable: document.getElementById("plumbingNewInstallSupplyAvailable")?.value || "",
        plumbingDrainAvailable: document.getElementById("plumbingNewInstallDrainAvailable")?.value || "",
        plumbingOpeningNeeded: document.getElementById("plumbingNewInstallOpeningNeeded")?.value || ""
      };

    default:
      return {
        plumbingHasFixture: "",
        plumbingShutoffCondition: "",
        plumbingAccessDifficulty: "",
        plumbingVisibleDamage: "",
        plumbingNotes: "",

        plumbingLoose: "",
        plumbingFloorIssue: "",
        plumbingRepairScope: "",
        plumbingIncluded: "",
        plumbingSameSize: "",
        plumbingFinishTouchup: "",
        plumbingLeakDamage: "",
        plumbingScope: "",
        plumbingAreaDamage: "",
        plumbingPowerReady: "",
        plumbingValveCount: "",
        plumbingValveAccess: "",
        plumbingValveCondition: "",
        plumbingValvePartOfOtherProject: "",
        plumbingLeakDuration: "",
        plumbingAffectedSurfaces: "",
        plumbingDamageSigns: "",
        plumbingOpenAccessWork: "",
        plumbingRepairAfterStop: "",
        plumbingFixtureType: "",
        plumbingSupplyAvailable: "",
        plumbingDrainAvailable: "",
        plumbingOpeningNeeded: ""
      };
  }
}

function getCurrentPlumbingFilesInput() {
  switch (projectType.value) {
    case "plumbing_replace_faucet":
      return document.getElementById("projectFilesPlumbingFaucet");
    case "plumbing_replace_toilet":
      return document.getElementById("projectFilesPlumbingToilet");
    case "plumbing_replace_vanity":
      return document.getElementById("projectFilesPlumbingVanity");
    case "plumbing_replace_garbage_disposal":
      return document.getElementById("projectFilesPlumbingDisposal");
    case "plumbing_replace_shutoff_valves":
      return document.getElementById("projectFilesPlumbingShutoff");
    case "plumbing_fix_active_leak":
      return document.getElementById("projectFilesPlumbingLeak");
    case "plumbing_install_new_fixture":
      return document.getElementById("projectFilesPlumbingNewInstall");
    default:
      return null;
  }
}

function getUploadedFiles() {
  if (projectType.value === "lighting_add_replace") return projectFilesLighting.files;
  if (projectType.value === "paint_one_room") return projectFilesPaint.files;
  if (projectType.value === "ai_design") return projectFilesAiDesign ? projectFilesAiDesign.files : null;
  if (projectType.value === "furniture_dresser_assembly") {
    return projectFilesDresser ? projectFilesDresser.files : null;
  }
  if (projectType.value === "furniture_bed_frame_assembly") {
    return projectFilesBedFrame ? projectFilesBedFrame.files : null;
  }
  if (projectType.value === "furniture_tv_stand_assembly") {
    return projectFilesTvStand ? projectFilesTvStand.files : null;
  }
  if (projectType.value === "furniture_desk_assembly") {
    return projectFilesDesk ? projectFilesDesk.files : null;
  }
  if (projectType.value === "furniture_dining_table_assembly") {
    return projectFilesDiningTable ? projectFilesDiningTable.files : null;
  }
  if (projectType.value === "furniture_bookcase_assembly") {
    return projectFilesBookcase ? projectFilesBookcase.files : null;
  }
  if (projectType.value === "furniture_coffee_table_assembly") {
    return projectFilesCoffeeTable ? projectFilesCoffeeTable.files : null;
  }
  if (projectType.value === "furniture_nightstand_assembly") {
    return projectFilesNightstand ? projectFilesNightstand.files : null;
  }
  if (projectType.value === "furniture_office_chair_assembly") {
    return projectFilesOfficeChair ? projectFilesOfficeChair.files : null;
  }
  if (projectType.value === "furniture_entertainment_center_assembly") {
    return projectFilesEntertainmentCenter ? projectFilesEntertainmentCenter.files : null;
  }
  if (projectType.value === "tv_mount_install") {
    const tvFiles = document.getElementById("projectFilesTvMount");
    return tvFiles ? tvFiles.files : null;
  }
  if (isPlumbingProject(projectType.value)) {
    const plumbingFilesInput = getCurrentPlumbingFilesInput();
    return plumbingFilesInput ? plumbingFilesInput.files : null;
  }
  return projectFiles.files;
}

function getFormData() {
  const plumbingBasics = getCurrentPlumbingBasicsValues();
  const plumbingDetails = getCurrentPlumbingDetailsValues();

  return {
    projectType: projectType.value,
    projectDisplayName: projectDisplayName.value,
    propertyType: propertyTypeGlobal.value,

    fullName: document.getElementById("fullName").value.trim(),
    phone: document.getElementById("phone").value.trim(),
    email: document.getElementById("email").value.trim(),
    zipcode: document.getElementById("zipcode").value.trim(),
    city: document.getElementById("city").value.trim(),
    ownerStatus: document.getElementById("ownerStatus").value,
    timeline: document.getElementById("timeline").value,

    damageLocation: damageLocation.value,
    damageSize: damageSize.value,
    scopeContext: scopeContext.value,
    texture: texture.value,
    paintRequired: paintRequired.value,
    paintBlend: "not-sure",
    paintAvailable: paintAvailable.value,
    insulation: insulation.value,
    ceilingHeight: ceilingHeight.value,
    obstacles: obstacles.value,
    notes: notes.value.trim(),

    lightingType: lightingType.value,
    lightingLocation: lightingLocation.value,
    fixtureCount: fixtureCount.value,
    fixtureType: fixtureType.value,
    accessDifficulty: accessDifficulty.value,
    fixtureSupplied: fixtureSupplied.value,
    newSwitch: newSwitch.value,
    wireRun: wireRun.value,
    atticAccess: atticAccess.value,
    repairIncluded: repairIncluded.value,
    paintAfterRepair: paintAfterRepair.value,
    paintLightingScope: paintLightingScope.value,
    lightingHeight: lightingHeight.value,
    lightingObstacles: lightingObstacles.value,
    notesLighting: notesLighting.value.trim(),

    paintScopes: getSelectedPaintScopes(),
    paintRoomSize: paintRoomSize.value,
    paintRoomCount: paintRoomCount.value,
    paintColorChange: paintColorChange.value,
    paintCeilingHeight: paintCeilingHeight.value,
    paintSurfaceCondition: paintSurfaceCondition.value,
    paintFinishLevel: paintFinishLevel.value,
    paintPropertyType: paintPropertyType.value,
    paintAccessDifficulty: paintAccessDifficulty.value,
    paintHandling: paintHandling.value,
    paintObstacles: paintObstacles.value,
    paintYearBuilt: paintYearBuilt.value,
    paintLeadPrepMode: paintLeadPrepMode.value,
    paintNotes: paintNotes.value.trim(),

    mountType: mountType.value,
    wallType: wallType.value,
    tvSize: tvSize.value,
    mountProvided: mountProvided.value,
    existingOutlet: existingOutlet.value,
    wireConceal: wireConceal.value,
    powerWork: powerWork.value,
    lowVoltage: lowVoltage.value,
    soundbarInstall: soundbarInstall.value,
    wallPatchPaint: wallPatchPaint.value,
    mountHeight: mountHeight.value,
    notesTvMount: notesTvMount.value.trim(),

    aiDesignSpaceType: aiDesignSpaceType?.value || "",
    aiDesignProjectGoal: aiDesignProjectGoal?.value || "",
    aiDesignApproxSize: aiDesignApproxSize?.value || "",
    aiDesignCurrentCondition: aiDesignCurrentCondition?.value || "",
    aiDesignLayoutChange: aiDesignLayoutChange?.value || "",
    aiDesignPriority: aiDesignPriority?.value || "",
    notesAiDesign: notesAiDesign?.value.trim() || "",

    dresserSize: dresserSize?.value || "",
    dresserBrand: dresserBrand?.value || "",
    dresserAlreadyInRoom: dresserAlreadyInRoom?.value || "",
    dresserCarryStairs: dresserCarryStairs?.value || "",
    dresserWallAnchoring: dresserWallAnchoring?.value || "",
    dresserWallType: dresserWallType?.value || "",
    dresserMirror: dresserMirror?.value || "",
    dresserPackagingRemoval: dresserPackagingRemoval?.value || "",
    dresserOldFurniture: dresserOldFurniture?.value || "",
    dresserHasProductLink: dresserHasProductLink?.value || "no",
    dresserProductLink:
      dresserHasProductLink?.value === "yes" ? normalizeProductUrl(dresserProductLink?.value || "") : "",
    notesDresser: notesDresser?.value.trim() || "",

    bedType: bedType?.value || "",
    bedBrand: bedBrand?.value || "",
    bedAlreadyInRoom: bedAlreadyInRoom?.value || "",
    bedOldFurniture: bedOldFurniture?.value || "",
    bedHasStorage: bedHasStorage?.value || "",
    bedHasHeadboard: bedHasHeadboard?.value || "",
    bedHasFootboard: bedHasFootboard?.value || "",
    bedMattressPlacement: bedMattressPlacement?.value || "",
    bedPackagingCleanup: bedPackagingCleanup?.value || "",
    bedHasProductLink: bedHasProductLink?.value || "no",
    bedProductLink: bedHasProductLink?.value === "yes" ? normalizeProductUrl(bedProductLink?.value || "") : "",
    notesBedFrame: notesBedFrame?.value.trim() || "",

    tvStandSize: tvStandSize?.value || "",
    tvStandBrand: tvStandBrand?.value || "",
    tvStandAlreadyInRoom: tvStandAlreadyInRoom?.value || "",
    tvStandOldFurniture: tvStandOldFurniture?.value || "",
    tvStandHasFireplace: tvStandHasFireplace?.value || "",
    tvStandHasLighting: tvStandHasLighting?.value || "",
    tvStandHasGlass: tvStandHasGlass?.value || "",
    tvStandFinalPositioning: tvStandFinalPositioning?.value || "",
    tvStandPackagingCleanup: tvStandPackagingCleanup?.value || "",
    tvStandHasProductLink: tvStandHasProductLink?.value || "no",
    tvStandProductLink:
      tvStandHasProductLink?.value === "yes" ? normalizeProductUrl(tvStandProductLink?.value || "") : "",
    notesTvStand: notesTvStand?.value.trim() || "",

    deskType: deskType?.value || "",
    deskBrand: deskBrand?.value || "",
    deskAlreadyInRoom: deskAlreadyInRoom?.value || "",
    deskOldFurniture: deskOldFurniture?.value || "",
    deskHasDrawers: deskHasDrawers?.value || "",
    deskHasHutch: deskHasHutch?.value || "",
    deskHasPowerComponents: deskHasPowerComponents?.value || "",
    deskFinalPositioning: deskFinalPositioning?.value || "",
    deskPackagingCleanup: deskPackagingCleanup?.value || "",
    deskHasProductLink: deskHasProductLink?.value || "no",
    deskProductLink:
      deskHasProductLink?.value === "yes" ? normalizeProductUrl(deskProductLink?.value || "") : "",
    notesDesk: notesDesk?.value.trim() || "",

    diningTableSize: diningTableSize?.value || "",
    diningTableChairQuantity: diningTableChairQuantity?.value || "",
    diningTableBrand: diningTableBrand?.value || "",
    diningTableAlreadyInRoom: diningTableAlreadyInRoom?.value || "",
    diningTableExistingTable: diningTableExistingTable?.value || "",
    diningTableExtensionLeaf: diningTableExtensionLeaf?.value || "",
    diningTableGlassTop: diningTableGlassTop?.value || "",
    diningTableFinalPositioning: diningTableFinalPositioning?.value || "",
    diningTablePackagingCleanup: diningTablePackagingCleanup?.value || "",
    diningTableHasProductLink: diningTableHasProductLink?.value || "no",
    diningTableProductLink:
      diningTableHasProductLink?.value === "yes"
        ? normalizeProductUrl(diningTableProductLink?.value || "")
        : "",
    notesDiningTable: notesDiningTable?.value.trim() || "",

    bookcaseProjectType: bookcaseProjectType?.value || "",
    bookcaseSize: bookcaseSize?.value || "",
    bookcaseQuantity: bookcaseQuantity?.value || "",
    bookcaseBrand: bookcaseBrand?.value || "",
    bookcaseAlreadyInRoom: bookcaseAlreadyInRoom?.value || "",
    bookcaseExistingFurniture: bookcaseExistingFurniture?.value || "",
    bookcaseHasDoorsDrawers: bookcaseHasDoorsDrawers?.value || "",
    bookcaseHasGlass: bookcaseHasGlass?.value || "",
    bookcaseHasLighting: bookcaseHasLighting?.value || "",
    bookcaseWallAnchoring: bookcaseWallAnchoring?.value || "",
    bookcaseConnectUnits: ["2", "3", "4", "5OrMore"].includes(bookcaseQuantity?.value)
      ? bookcaseConnectUnits?.value || ""
      : "",
    bookcaseFinalPositioning: bookcaseFinalPositioning?.value || "",
    bookcasePackagingCleanup: bookcasePackagingCleanup?.value || "",
    bookcaseHasProductLink: bookcaseHasProductLink?.value || "no",
    bookcaseProductLink:
      bookcaseHasProductLink?.value === "yes"
        ? normalizeProductUrl(bookcaseProductLink?.value || "")
        : "",
    notesBookcase: notesBookcase?.value.trim() || "",

    coffeeTableSize: coffeeTableSize?.value || "",
    coffeeTableBrand: coffeeTableBrand?.value || "",
    coffeeTableAlreadyInRoom: coffeeTableAlreadyInRoom?.value || "",
    coffeeTableExistingTable: coffeeTableExistingTable?.value || "",
    coffeeTableStorage: coffeeTableStorage?.value || "",
    coffeeTableLiftTop: coffeeTableLiftTop?.value || "",
    coffeeTableGlass: coffeeTableGlass?.value || "",
    coffeeTableFinalPositioning: coffeeTableFinalPositioning?.value || "",
    coffeeTablePackagingCleanup: coffeeTablePackagingCleanup?.value || "",
    coffeeTableHasProductLink: coffeeTableHasProductLink?.value || "no",
    coffeeTableProductLink:
      coffeeTableHasProductLink?.value === "yes"
        ? normalizeProductUrl(coffeeTableProductLink?.value || "")
        : "",
    notesCoffeeTable: notesCoffeeTable?.value.trim() || "",

    nightstandSize: nightstandSize?.value || "",
    nightstandQuantity: nightstandQuantity?.value || "",
    nightstandBrand: nightstandBrand?.value || "",
    nightstandAlreadyInRoom: nightstandAlreadyInRoom?.value || "",
    nightstandExistingFurniture: nightstandExistingFurniture?.value || "",
    nightstandHasDrawers: nightstandHasDrawers?.value || "",
    nightstandHasDoors: nightstandHasDoors?.value || "",
    nightstandHasPowerComponents: nightstandHasPowerComponents?.value || "",
    nightstandHasGlass: nightstandHasGlass?.value || "",
    nightstandWallAnchoring: nightstandWallAnchoring?.value || "",
    nightstandFinalPositioning: nightstandFinalPositioning?.value || "",
    nightstandPackagingCleanup: nightstandPackagingCleanup?.value || "",
    nightstandHasProductLink: nightstandHasProductLink?.value || "no",
    nightstandProductLink:
      nightstandHasProductLink?.value === "yes"
        ? normalizeProductUrl(nightstandProductLink?.value || "")
        : "",
    notesNightstand: notesNightstand?.value.trim() || "",

    officeChairType: officeChairType?.value || "",
    officeChairQuantity: officeChairQuantity?.value || "",
    officeChairBrand: officeChairBrand?.value || "",
    officeChairAlreadyInRoom: officeChairAlreadyInRoom?.value || "",
    officeChairExistingFurniture: officeChairExistingFurniture?.value || "",
    officeChairHasAdjustableArmrests: officeChairHasAdjustableArmrests?.value || "",
    officeChairHasHeadrestLumbar: officeChairHasHeadrestLumbar?.value || "",
    officeChairHasRecliningFootrest: officeChairHasRecliningFootrest?.value || "",
    officeChairHasElectronicFeatures: officeChairHasElectronicFeatures?.value || "",
    officeChairAdjustmentTesting: officeChairAdjustmentTesting?.value || "",
    officeChairFinalPositioning: officeChairFinalPositioning?.value || "",
    officeChairPackagingCleanup: officeChairPackagingCleanup?.value || "",
    officeChairHasProductLink: officeChairHasProductLink?.value || "no",
    officeChairProductLink:
      officeChairHasProductLink?.value === "yes"
        ? normalizeProductUrl(officeChairProductLink?.value || "")
        : "",
    notesOfficeChair: notesOfficeChair?.value.trim() || "",

    entertainmentCenterType: entertainmentCenterType?.value || "",
    entertainmentCenterSectionCount: entertainmentCenterSectionCount?.value || "",
    entertainmentCenterBrand: entertainmentCenterBrand?.value || "",
    entertainmentCenterAlreadyInRoom: entertainmentCenterAlreadyInRoom?.value || "",
    entertainmentCenterExistingFurniture: entertainmentCenterExistingFurniture?.value || "",
    entertainmentCenterHasStorageComponents: entertainmentCenterHasStorageComponents?.value || "",
    entertainmentCenterHasTowersBridge: entertainmentCenterHasTowersBridge?.value || "",
    entertainmentCenterHasGlass: entertainmentCenterHasGlass?.value || "",
    entertainmentCenterHasElectronicComponents: entertainmentCenterHasElectronicComponents?.value || "",
    entertainmentCenterWallAnchoring: entertainmentCenterWallAnchoring?.value || "",
    entertainmentCenterTvPlacement: entertainmentCenterTvPlacement?.value || "",
    entertainmentCenterFinalPositioning: entertainmentCenterFinalPositioning?.value || "",
    entertainmentCenterPackagingCleanup: entertainmentCenterPackagingCleanup?.value || "",
    entertainmentCenterHasProductLink: entertainmentCenterHasProductLink?.value || "no",
    entertainmentCenterProductLink:
      entertainmentCenterHasProductLink?.value === "yes"
        ? normalizeProductUrl(entertainmentCenterProductLink?.value || "")
        : "",
    notesEntertainmentCenter: notesEntertainmentCenter?.value.trim() || "",

    ...plumbingBasics,
    ...plumbingDetails
  };
}

async function submitLead(leadType, estimateData, additionalFormData = null) {
  const formData = additionalFormData || getFormData();
  const leadMeta = estimateData.leadMeta || classifyLead(formData);
  const payload = new FormData();

  payload.append("lead_type", leadType);
  payload.append("project_template", formData.projectDisplayName);
  payload.append("project_type_key", formData.projectType);
  payload.append("property_type_global", formData.propertyType);
  payload.append("page_name", "Project Cost Estimator");
  payload.append("full_name", formData.fullName);
  payload.append("phone", formData.phone);
  payload.append("email", formData.email);
  payload.append("zip_code", formData.zipcode);
  payload.append("city", formData.city);
  payload.append("relationship_to_property", formData.ownerStatus);
  payload.append("timeline", formData.timeline);

  payload.append("distance_band", leadMeta.distanceBand);
  payload.append("service_zone", leadMeta.serviceZone);
  payload.append("market_region", leadMeta.marketRegion);
  payload.append("job_size", leadMeta.jobSize);
  payload.append("lead_priority", leadMeta.leadPriority);
  payload.append("pricing_multiplier", String(leadMeta.multiplier));

  if (formData.projectType === "lighting_add_replace") {
    payload.append("lighting_type", formData.lightingType);
    payload.append("lighting_location", formData.lightingLocation);
    payload.append("fixture_count", formData.fixtureCount);
    payload.append("fixture_type", formData.fixtureType);
    payload.append("access_difficulty", formData.accessDifficulty);
    payload.append("fixture_supplied", formData.fixtureSupplied);
    payload.append("new_switch", formData.newSwitch);
    payload.append("wire_run", formData.wireRun);
    payload.append("attic_access", formData.atticAccess);
    payload.append("repair_included", formData.repairIncluded);
    payload.append("paint_after_repair", formData.paintAfterRepair);
    payload.append("paint_scope", formData.paintLightingScope);
    payload.append("work_height", formData.lightingHeight);
    payload.append("obstacles", formData.lightingObstacles);
    payload.append("notes", formData.notesLighting);
  } else if (formData.projectType === "paint_one_room") {
    payload.append("paint_scopes", formData.paintScopes.join(", "));
    payload.append("room_size", formData.paintRoomSize);
    payload.append("room_count", formData.paintRoomCount);
    payload.append("color_change", formData.paintColorChange);
    payload.append("ceiling_height", formData.paintCeilingHeight);
    payload.append("surface_condition", formData.paintSurfaceCondition);
    payload.append("finish_level", formData.paintFinishLevel);
    payload.append("property_type", formData.paintPropertyType);
    payload.append("access_difficulty", formData.paintAccessDifficulty);
    payload.append("paint_handling", formData.paintHandling);
    payload.append("obstacles", formData.paintObstacles);
    payload.append("year_built", formData.paintYearBuilt);
    payload.append("lead_prep_mode", formData.paintLeadPrepMode);
    payload.append("notes", formData.paintNotes);
  } else if (formData.projectType === "tv_mount_install") {
    payload.append("mount_type", formData.mountType);
    payload.append("wall_type", formData.wallType);
    payload.append("tv_size", formData.tvSize);
    payload.append("mount_provided", formData.mountProvided);
    payload.append("existing_outlet", formData.existingOutlet);
    payload.append("wire_conceal", formData.wireConceal);
    payload.append("power_work", formData.powerWork);
    payload.append("low_voltage", formData.lowVoltage);
    payload.append("soundbar_install", formData.soundbarInstall);
    payload.append("wall_patch_paint", formData.wallPatchPaint);
    payload.append("mount_height", formData.mountHeight);
    payload.append("notes", formData.notesTvMount);
  } else if (formData.projectType === "ai_design") {
    payload.append("ai_space_type", formData.aiDesignSpaceType);
    payload.append("ai_project_goal", formData.aiDesignProjectGoal);
    payload.append("ai_approx_size", formData.aiDesignApproxSize);
    payload.append("ai_current_condition", formData.aiDesignCurrentCondition);
    payload.append("ai_layout_change", formData.aiDesignLayoutChange);
    payload.append("ai_priority", formData.aiDesignPriority);
    payload.append("ai_notes", formData.notesAiDesign);
    payload.append("ai_location_factor", String(estimateData.locationFactor ?? ""));
    payload.append("ai_location_factor_source", estimateData.locationFactorSource || "");
    payload.append("ai_location_town", estimateData.locationTown || "");
    payload.append(
      "ai_project_base_range",
      estimateData.projectBaseRange
        ? `${currency(estimateData.projectBaseRange.min)} - ${currency(estimateData.projectBaseRange.max)}`
        : ""
    );
    if (estimateData.ranges) {
      payload.append(
        "ai_finish_essential_range",
        `${currency(estimateData.ranges.essential.min)} - ${currency(estimateData.ranges.essential.max)}`
      );
      payload.append(
        "ai_finish_enhanced_range",
        `${currency(estimateData.ranges.enhanced.min)} - ${currency(estimateData.ranges.enhanced.max)}`
      );
      payload.append(
        "ai_finish_premium_range",
        `${currency(estimateData.ranges.premium.min)} - ${currency(estimateData.ranges.premium.max)}`
      );
    }
    payload.append("ai_selected_finish", estimateData.selectedFinishLevel || "");
    payload.append("ai_selected_finish_label", estimateData.selectedFinishLabel || "");
    payload.append("notes", formData.notesAiDesign);
  } else if (formData.projectType === "furniture_dresser_assembly") {
    const suggestedPrice = Math.round((estimateData.totalMin + estimateData.totalMax) / 2);
    payload.append("dresser_size", formData.dresserSize);
    payload.append("dresser_brand", formData.dresserBrand);
    payload.append("dresser_already_in_room", formData.dresserAlreadyInRoom);
    payload.append("dresser_carry_stairs", formData.dresserCarryStairs);
    payload.append("dresser_wall_anchoring", formData.dresserWallAnchoring);
    payload.append("dresser_wall_type", formData.dresserWallType);
    payload.append("dresser_mirror", formData.dresserMirror);
    payload.append("dresser_packaging_removal", formData.dresserPackagingRemoval);
    payload.append("dresser_old_furniture", formData.dresserOldFurniture);
    payload.append("dresser_has_product_link", formData.dresserHasProductLink || "no");
    payload.append("dresser_product_link", formData.dresserProductLink || "");
    payload.append("dresser_notes", formData.notesDresser);
    payload.append(
      "dresser_removal_disposal_requested",
      formData.dresserOldFurniture === "removeDispose" ? "true" : "false"
    );
    if (formData.dresserOldFurniture === "notSure") {
      payload.append("dresser_old_furniture_manual_review", "true");
    }
    payload.append("suggested_price", currency(suggestedPrice));
    payload.append("notes", formData.notesDresser);
  } else if (formData.projectType === "furniture_bed_frame_assembly") {
    const suggestedPrice = estimateData.isManualReviewRequired
      ? 0
      : Math.round((estimateData.totalMin + estimateData.totalMax) / 2);
    payload.append("bed_type", formData.bedType);
    payload.append("bed_brand", formData.bedBrand);
    payload.append("bed_already_in_room", formData.bedAlreadyInRoom);
    payload.append("bed_old_furniture", formData.bedOldFurniture);
    payload.append("bed_has_storage", formData.bedHasStorage);
    payload.append("bed_has_headboard", formData.bedHasHeadboard);
    payload.append("bed_has_footboard", formData.bedHasFootboard);
    payload.append("bed_mattress_placement", formData.bedMattressPlacement);
    payload.append("bed_packaging_cleanup", formData.bedPackagingCleanup);
    payload.append("bed_has_product_link", formData.bedHasProductLink || "no");
    payload.append("bed_product_link", formData.bedProductLink || "");
    payload.append("bed_notes", formData.notesBedFrame);
    payload.append(
      "bed_removal_disposal_requested",
      formData.bedOldFurniture === "removeDispose" ? "true" : "false"
    );
    payload.append(
      "bed_manual_review_required",
      estimateData.bedManualReviewRequired || formData.bedType === "murphyBed"
        ? "true"
        : "false"
    );
    if (formData.bedOldFurniture === "notSure") {
      payload.append("bed_old_furniture_manual_review", "true");
    }
    if (!estimateData.isManualReviewRequired) {
      payload.append("suggested_price", currency(suggestedPrice));
    } else {
      payload.append("suggested_price", "manual_review");
    }
    payload.append("notes", formData.notesBedFrame);
  } else if (formData.projectType === "furniture_tv_stand_assembly") {
    const suggestedPrice = Math.round((estimateData.totalMin + estimateData.totalMax) / 2);
    payload.append("tv_stand_size", formData.tvStandSize);
    payload.append("tv_stand_brand", formData.tvStandBrand);
    payload.append("tv_stand_already_in_room", formData.tvStandAlreadyInRoom);
    payload.append("tv_stand_old_furniture", formData.tvStandOldFurniture);
    payload.append("tv_stand_has_fireplace", formData.tvStandHasFireplace);
    payload.append("tv_stand_has_lighting", formData.tvStandHasLighting);
    payload.append("tv_stand_has_glass", formData.tvStandHasGlass);
    payload.append("tv_stand_final_positioning", formData.tvStandFinalPositioning);
    payload.append("tv_stand_packaging_cleanup", formData.tvStandPackagingCleanup);
    payload.append("tv_stand_has_product_link", formData.tvStandHasProductLink || "no");
    payload.append("tv_stand_product_link", formData.tvStandProductLink || "");
    payload.append("tv_stand_notes", formData.notesTvStand);
    payload.append(
      "tv_stand_fireplace_adder_applied",
      estimateData.tvStandFireplaceAdderApplied || formData.tvStandHasFireplace === "yes"
        ? "true"
        : "false"
    );
    payload.append(
      "tv_stand_removal_disposal_requested",
      formData.tvStandOldFurniture === "removeDispose" ? "true" : "false"
    );
    payload.append(
      "tv_stand_manual_review_required",
      estimateData.tvStandManualReviewRequired ? "true" : "false"
    );
    payload.append("suggested_price", currency(suggestedPrice));
    payload.append("notes", formData.notesTvStand);
  } else if (formData.projectType === "furniture_desk_assembly") {
    const suggestedPrice = Math.round((estimateData.totalMin + estimateData.totalMax) / 2);
    payload.append("desk_type", formData.deskType);
    payload.append("desk_brand", formData.deskBrand);
    payload.append("desk_already_in_room", formData.deskAlreadyInRoom);
    payload.append("desk_old_furniture", formData.deskOldFurniture);
    payload.append("desk_has_drawers", formData.deskHasDrawers);
    payload.append("desk_has_hutch", formData.deskHasHutch);
    payload.append("desk_has_power_components", formData.deskHasPowerComponents);
    payload.append("desk_final_positioning", formData.deskFinalPositioning);
    payload.append("desk_packaging_cleanup", formData.deskPackagingCleanup);
    payload.append("desk_has_product_link", formData.deskHasProductLink || "no");
    payload.append("desk_product_link", formData.deskProductLink || "");
    payload.append("desk_notes", formData.notesDesk);
    payload.append(
      "desk_electric_adder_applied",
      estimateData.deskElectricAdderApplied || formData.deskType === "standingDeskElectric"
        ? "true"
        : "false"
    );
    payload.append(
      "desk_removal_disposal_requested",
      formData.deskOldFurniture === "removeDispose" ? "true" : "false"
    );
    payload.append(
      "desk_manual_review_required",
      estimateData.deskManualReviewRequired ? "true" : "false"
    );
    payload.append("suggested_price", currency(suggestedPrice));
    payload.append("notes", formData.notesDesk);
  } else if (formData.projectType === "furniture_dining_table_assembly") {
    const suggestedPrice = Math.round((estimateData.totalMin + estimateData.totalMax) / 2);
    payload.append("dining_table_size", formData.diningTableSize);
    payload.append("dining_table_chair_quantity", formData.diningTableChairQuantity);
    payload.append("dining_table_brand", formData.diningTableBrand);
    payload.append("dining_table_already_in_room", formData.diningTableAlreadyInRoom);
    payload.append("dining_table_existing_table", formData.diningTableExistingTable);
    payload.append("dining_table_glass_top", formData.diningTableGlassTop);
    payload.append("dining_table_extension_leaf", formData.diningTableExtensionLeaf);
    payload.append("dining_table_has_product_link", formData.diningTableHasProductLink || "no");
    payload.append("dining_table_product_link", formData.diningTableProductLink || "");
    payload.append("dining_table_notes", formData.notesDiningTable);
    payload.append(
      "manual_review_required",
      estimateData.diningTableManualReviewRequired ? "true" : "false"
    );
    payload.append("suggested_price", currency(suggestedPrice));
    payload.append("notes", formData.notesDiningTable);
  } else if (formData.projectType === "furniture_bookcase_assembly") {
    const suggestedPrice = estimateData.isManualReviewRequired
      ? null
      : Math.round((estimateData.totalMin + estimateData.totalMax) / 2);
    payload.append("bookcase_project_type", formData.bookcaseProjectType);
    payload.append("bookcase_size", formData.bookcaseSize);
    payload.append("bookcase_quantity", formData.bookcaseQuantity);
    payload.append("bookcase_brand", formData.bookcaseBrand);
    payload.append("bookcase_already_in_room", formData.bookcaseAlreadyInRoom);
    payload.append("bookcase_existing_furniture", formData.bookcaseExistingFurniture);
    payload.append("bookcase_has_doors_drawers", formData.bookcaseHasDoorsDrawers);
    payload.append("bookcase_has_glass", formData.bookcaseHasGlass);
    payload.append("bookcase_has_lighting", formData.bookcaseHasLighting);
    payload.append("bookcase_wall_anchoring", formData.bookcaseWallAnchoring);
    payload.append("bookcase_connect_units", formData.bookcaseConnectUnits || "");
    payload.append("bookcase_final_positioning", formData.bookcaseFinalPositioning);
    payload.append("bookcase_packaging_cleanup", formData.bookcasePackagingCleanup);
    payload.append("bookcase_has_product_link", formData.bookcaseHasProductLink || "no");
    payload.append("bookcase_product_link", formData.bookcaseProductLink || "");
    payload.append("bookcase_notes", formData.notesBookcase);
    payload.append(
      "bookcase_quantity_adder_applied",
      estimateData.bookcaseQuantityAdderApplied ? "true" : "false"
    );
    payload.append(
      "bookcase_removal_disposal_requested",
      formData.bookcaseExistingFurniture === "removeDispose" ? "true" : "false"
    );
    payload.append(
      "bookcase_manual_review_required",
      estimateData.bookcaseManualReviewRequired || estimateData.isManualReviewRequired
        ? "true"
        : "false"
    );
    if (!estimateData.isManualReviewRequired) {
      payload.append("suggested_price", currency(suggestedPrice));
    } else {
      payload.append("suggested_price", "manual_review");
    }
    payload.append("notes", formData.notesBookcase);
  } else if (formData.projectType === "furniture_coffee_table_assembly") {
    const suggestedPrice = Math.round((estimateData.totalMin + estimateData.totalMax) / 2);
    payload.append("coffee_table_size", formData.coffeeTableSize);
    payload.append("coffee_table_brand", formData.coffeeTableBrand);
    payload.append("coffee_table_already_in_room", formData.coffeeTableAlreadyInRoom);
    payload.append("coffee_table_existing_table", formData.coffeeTableExistingTable);
    payload.append("coffee_table_storage", formData.coffeeTableStorage);
    payload.append("coffee_table_lift_top", formData.coffeeTableLiftTop);
    payload.append("coffee_table_glass", formData.coffeeTableGlass);
    payload.append("coffee_table_has_product_link", formData.coffeeTableHasProductLink || "no");
    payload.append("coffee_table_product_link", formData.coffeeTableProductLink || "");
    payload.append("coffee_table_notes", formData.notesCoffeeTable);
    payload.append(
      "manual_review_required",
      estimateData.coffeeTableManualReviewRequired ? "true" : "false"
    );
    payload.append("suggested_price", currency(suggestedPrice));
    payload.append("notes", formData.notesCoffeeTable);
  } else if (formData.projectType === "furniture_nightstand_assembly") {
    const suggestedPrice = estimateData.isManualReviewRequired
      ? null
      : Math.round((estimateData.totalMin + estimateData.totalMax) / 2);
    payload.append("nightstand_size", formData.nightstandSize);
    payload.append("nightstand_quantity", formData.nightstandQuantity);
    payload.append("nightstand_brand", formData.nightstandBrand);
    payload.append("nightstand_already_in_room", formData.nightstandAlreadyInRoom);
    payload.append("nightstand_existing_furniture", formData.nightstandExistingFurniture);
    payload.append("nightstand_has_drawers", formData.nightstandHasDrawers);
    payload.append("nightstand_has_doors", formData.nightstandHasDoors);
    payload.append("nightstand_has_power_components", formData.nightstandHasPowerComponents);
    payload.append("nightstand_has_glass", formData.nightstandHasGlass);
    payload.append("nightstand_wall_anchoring", formData.nightstandWallAnchoring);
    payload.append("nightstand_final_positioning", formData.nightstandFinalPositioning);
    payload.append("nightstand_packaging_cleanup", formData.nightstandPackagingCleanup);
    payload.append("nightstand_has_product_link", formData.nightstandHasProductLink || "no");
    payload.append("nightstand_product_link", formData.nightstandProductLink || "");
    payload.append("nightstand_notes", formData.notesNightstand);
    payload.append(
      "nightstand_quantity_adder_applied",
      estimateData.nightstandQuantityAdderApplied ? "true" : "false"
    );
    payload.append(
      "nightstand_removal_disposal_requested",
      formData.nightstandExistingFurniture === "removeDispose" ? "true" : "false"
    );
    payload.append(
      "nightstand_manual_review_required",
      estimateData.nightstandManualReviewRequired || estimateData.isManualReviewRequired
        ? "true"
        : "false"
    );
    if (!estimateData.isManualReviewRequired) {
      payload.append("suggested_price", currency(suggestedPrice));
    } else {
      payload.append("suggested_price", "manual_review");
    }
    payload.append("notes", formData.notesNightstand);
  } else if (formData.projectType === "furniture_office_chair_assembly") {
    const suggestedPrice = estimateData.isManualReviewRequired
      ? null
      : Math.round((estimateData.totalMin + estimateData.totalMax) / 2);
    payload.append("office_chair_type", formData.officeChairType);
    payload.append("office_chair_quantity", formData.officeChairQuantity);
    payload.append("office_chair_brand", formData.officeChairBrand);
    payload.append("office_chair_already_in_room", formData.officeChairAlreadyInRoom);
    payload.append("office_chair_existing_furniture", formData.officeChairExistingFurniture);
    payload.append("office_chair_has_adjustable_armrests", formData.officeChairHasAdjustableArmrests);
    payload.append("office_chair_has_headrest_lumbar", formData.officeChairHasHeadrestLumbar);
    payload.append("office_chair_has_reclining_footrest", formData.officeChairHasRecliningFootrest);
    payload.append("office_chair_has_electronic_features", formData.officeChairHasElectronicFeatures);
    payload.append("office_chair_adjustment_testing", formData.officeChairAdjustmentTesting);
    payload.append("office_chair_final_positioning", formData.officeChairFinalPositioning);
    payload.append("office_chair_packaging_cleanup", formData.officeChairPackagingCleanup);
    payload.append("office_chair_has_product_link", formData.officeChairHasProductLink || "no");
    payload.append("office_chair_product_link", formData.officeChairProductLink || "");
    payload.append("office_chair_notes", formData.notesOfficeChair);
    payload.append(
      "office_chair_quantity_adder_applied",
      estimateData.officeChairQuantityAdderApplied ? "true" : "false"
    );
    payload.append(
      "office_chair_removal_disposal_requested",
      formData.officeChairExistingFurniture === "removeDispose" ? "true" : "false"
    );
    payload.append(
      "office_chair_manual_review_required",
      estimateData.officeChairManualReviewRequired || estimateData.isManualReviewRequired
        ? "true"
        : "false"
    );
    if (!estimateData.isManualReviewRequired) {
      payload.append("suggested_price", currency(suggestedPrice));
    } else {
      payload.append("suggested_price", "manual_review");
    }
    payload.append("notes", formData.notesOfficeChair);
  } else if (formData.projectType === "furniture_entertainment_center_assembly") {
    const suggestedPrice = estimateData.isManualReviewRequired
      ? null
      : Math.round((estimateData.totalMin + estimateData.totalMax) / 2);
    payload.append("entertainment_center_type", formData.entertainmentCenterType);
    payload.append("entertainment_center_section_count", formData.entertainmentCenterSectionCount);
    payload.append("entertainment_center_brand", formData.entertainmentCenterBrand);
    payload.append("entertainment_center_already_in_room", formData.entertainmentCenterAlreadyInRoom);
    payload.append("entertainment_center_existing_furniture", formData.entertainmentCenterExistingFurniture);
    payload.append(
      "entertainment_center_has_storage_components",
      formData.entertainmentCenterHasStorageComponents
    );
    payload.append("entertainment_center_has_towers_bridge", formData.entertainmentCenterHasTowersBridge);
    payload.append("entertainment_center_has_glass", formData.entertainmentCenterHasGlass);
    payload.append(
      "entertainment_center_has_electronic_components",
      formData.entertainmentCenterHasElectronicComponents
    );
    payload.append("entertainment_center_wall_anchoring", formData.entertainmentCenterWallAnchoring);
    payload.append("entertainment_center_tv_placement", formData.entertainmentCenterTvPlacement);
    payload.append("entertainment_center_final_positioning", formData.entertainmentCenterFinalPositioning);
    payload.append("entertainment_center_packaging_cleanup", formData.entertainmentCenterPackagingCleanup);
    payload.append(
      "entertainment_center_has_product_link",
      formData.entertainmentCenterHasProductLink || "no"
    );
    payload.append("entertainment_center_product_link", formData.entertainmentCenterProductLink || "");
    payload.append("entertainment_center_notes", formData.notesEntertainmentCenter);
    payload.append(
      "entertainment_center_section_adder_applied",
      estimateData.entertainmentCenterSectionAdderApplied ? "true" : "false"
    );
    payload.append(
      "entertainment_center_removal_disposal_requested",
      formData.entertainmentCenterExistingFurniture === "removeDispose" ? "true" : "false"
    );
    payload.append(
      "entertainment_center_manual_review_required",
      estimateData.entertainmentCenterManualReviewRequired || estimateData.isManualReviewRequired
        ? "true"
        : "false"
    );
    if (!estimateData.isManualReviewRequired) {
      payload.append("suggested_price", currency(suggestedPrice));
    } else {
      payload.append("suggested_price", "manual_review");
    }
    payload.append("notes", formData.notesEntertainmentCenter);
  } else if (isPlumbingProject(formData.projectType)) {
    payload.append("plumbing_reason", formData.plumbingReason);
    payload.append("plumbing_location", formData.plumbingLocation);
    payload.append("plumbing_severity", formData.plumbingSeverity);
    payload.append("plumbing_has_fixture", formData.plumbingHasFixture);
    payload.append("plumbing_shutoff_condition", formData.plumbingShutoffCondition);
    payload.append("plumbing_access_difficulty", formData.plumbingAccessDifficulty);
    payload.append("plumbing_visible_damage", formData.plumbingVisibleDamage);

    payload.append("plumbing_loose", formData.plumbingLoose);
    payload.append("plumbing_floor_issue", formData.plumbingFloorIssue);
    payload.append("plumbing_repair_scope", formData.plumbingRepairScope);
    payload.append("plumbing_included", formData.plumbingIncluded);
    payload.append("plumbing_same_size", formData.plumbingSameSize);
    payload.append("plumbing_finish_touchup", formData.plumbingFinishTouchup);
    payload.append("plumbing_leak_damage", formData.plumbingLeakDamage);
    payload.append("plumbing_scope", formData.plumbingScope);
    payload.append("plumbing_area_damage", formData.plumbingAreaDamage);
    payload.append("plumbing_power_ready", formData.plumbingPowerReady);
    payload.append("plumbing_valve_count", formData.plumbingValveCount);
    payload.append("plumbing_valve_access", formData.plumbingValveAccess);
    payload.append("plumbing_valve_condition", formData.plumbingValveCondition);
    payload.append("plumbing_valve_part_of_other_project", formData.plumbingValvePartOfOtherProject);
    payload.append("plumbing_leak_duration", formData.plumbingLeakDuration);
    payload.append("plumbing_affected_surfaces", formData.plumbingAffectedSurfaces);
    payload.append("plumbing_damage_signs", formData.plumbingDamageSigns);
    payload.append("plumbing_open_access_work", formData.plumbingOpenAccessWork);
    payload.append("plumbing_repair_after_stop", formData.plumbingRepairAfterStop);
    payload.append("plumbing_fixture_type", formData.plumbingFixtureType);
    payload.append("plumbing_supply_available", formData.plumbingSupplyAvailable);
    payload.append("plumbing_drain_available", formData.plumbingDrainAvailable);
    payload.append("plumbing_opening_needed", formData.plumbingOpeningNeeded);

    payload.append("notes", formData.plumbingNotes);
  } else {
    payload.append("damage_location", formData.damageLocation);
    payload.append("damage_size", formData.damageSize);
    payload.append("scope_context", formData.scopeContext);
    payload.append("texture", formData.texture);
    payload.append("paint_required", formData.paintRequired);
    payload.append("paint_area", formData.paintBlend);
    payload.append("paint_available", formData.paintAvailable);
    payload.append("insulation", formData.insulation);
    payload.append("work_height", formData.ceilingHeight);
    payload.append("obstacles", formData.obstacles);
    payload.append("notes", formData.notes);
  }

  payload.append("estimated_materials", `${currency(estimateData.minMaterials)} - ${currency(estimateData.maxMaterials)}`);
  payload.append("estimated_labor", `${currency(estimateData.laborMin)} - ${currency(estimateData.laborMax)}`);
  payload.append(
    "estimated_total_range",
    estimateData.isManualReviewRequired
      ? "personalized_review_required"
      : `${currency(estimateData.totalMin)} - ${currency(estimateData.totalMax)}`
  );
  payload.append("estimated_hours", `${estimateData.hours} hours`);
  payload.append("materials_considered", (estimateData.materialsList || []).join(", "));
  payload.append(
    "calculation_summary",
    [...(estimateData.adjustments || []), ...(estimateData.internalAdjustments || [])].join(" | ")
  );
  payload.append("_subject", `${leadType} LEAD - ${formData.projectDisplayName} - ${leadMeta.serviceZone.toUpperCase()} - ${leadMeta.leadPriority.toUpperCase()}`);

  // Add payment details if this is a paid lead
  if (leadType === "PAID" && additionalFormData) {
    payload.append("payment_status", additionalFormData.paymentStatus || "completed");
    payload.append("payment_method", additionalFormData.paymentMethod || "stripe");
    payload.append("working_price", `$${additionalFormData.workingPrice}`);
  }

  const files = getUploadedFiles();
  if (files && files.length > 0) {
    for (let i = 0; i < files.length; i++) {
      payload.append("attachments", files[i]);
    }
  }

  const response = await fetch(FORMSPREE_ENDPOINT, {
    method: "POST",
    body: payload,
    headers: { Accept: "application/json" }
  });

  if (!response.ok) throw new Error("Submission failed.");
  return response;
}

function validateStep(step) {
  if (step === 1) {
    clearValidation(validationStep1);
    if (!projectType.value) {
      showValidation(validationStep1, "Please select a project type before continuing.");
      return false;
    }
  }

  if (step === 2) {
    clearValidation(validationStep2);

    const fullName = document.getElementById("fullName").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const email = document.getElementById("email").value.trim();
    const zipcode = document.getElementById("zipcode").value.trim();

    if (!fullName || !phone || !email || !zipcode) {
      showValidation(validationStep2, "Please complete name, phone, email, and ZIP code before continuing.");
      return false;
    }

    // Validate full name - at least 2 characters and contains only letters, spaces, and hyphens
    if (fullName.length < 2 || !/^[a-zA-Z\s\-']+$/.test(fullName)) {
      showValidation(validationStep2, "Please enter a valid full name.");
      return false;
    }

    // Validate phone - at least 10 digits (allows formatting like (123) 456-7890)
    const phoneDigitsOnly = phone.replace(/\D/g, "");
    if (phoneDigitsOnly.length < 10) {
      showValidation(validationStep2, "Please enter a valid phone number with at least 10 digits.");
      return false;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showValidation(validationStep2, "Please enter a valid email address.");
      return false;
    }

    // Validate ZIP code - 5 or 9 digits (allows ZIP+4 format)
    const zipcodeDigitsOnly = zipcode.replace(/\D/g, "");
    if (zipcodeDigitsOnly.length !== 5 && zipcodeDigitsOnly.length !== 9) {
      showValidation(validationStep2, "Please enter a valid ZIP code (5 or 9 digits).");
      return false;
    }
  }

  if (step === 3) {
    clearValidation(validationStep3);

    if (projectType.value === "paint_one_room" && getSelectedPaintScopes().length === 0) {
      showValidation(validationStep3, "Please select at least one area to paint before continuing.");
      return false;
    }

    if (projectType.value === "tv_mount_install") {
      if (!mountType.value || !wallType.value || !tvSize.value || !mountProvided.value || !existingOutlet.value) {
        showValidation(validationStep3, "Please complete the basic TV mount questions before continuing.");
        return false;
      }
    }

    if (projectType.value === "furniture_dresser_assembly") {
      if (
        !dresserSize?.value ||
        !dresserBrand?.value ||
        !dresserAlreadyInRoom?.value ||
        !dresserWallAnchoring?.value
      ) {
        showValidation(validationStep3, "Please complete the dresser assembly basics before continuing.");
        return false;
      }

      const showCarry = ["no", "notSure"].includes(dresserAlreadyInRoom.value);
      if (showCarry && !dresserCarryStairs?.value) {
        showValidation(validationStep3, "Please tell us if the dresser needs to be carried upstairs or downstairs.");
        return false;
      }

      if (
        ["yes", "notSure"].includes(dresserWallAnchoring.value) &&
        !dresserWallType?.value
      ) {
        showValidation(validationStep3, "Please select the wall type for anchoring.");
        return false;
      }
    }

    if (projectType.value === "furniture_bed_frame_assembly") {
      if (!bedType?.value || !bedBrand?.value || !bedAlreadyInRoom?.value || !bedOldFurniture?.value) {
        showValidation(validationStep3, "Please complete the bed frame basics before continuing.");
        return false;
      }
    }

    if (projectType.value === "furniture_tv_stand_assembly") {
      if (
        !tvStandSize?.value ||
        !tvStandBrand?.value ||
        !tvStandAlreadyInRoom?.value ||
        !tvStandOldFurniture?.value
      ) {
        showValidation(validationStep3, "Please complete the TV stand basics before continuing.");
        return false;
      }
    }

    if (projectType.value === "furniture_desk_assembly") {
      if (
        !deskType?.value ||
        !deskBrand?.value ||
        !deskAlreadyInRoom?.value ||
        !deskOldFurniture?.value
      ) {
        showValidation(validationStep3, "Please complete the desk basics before continuing.");
        return false;
      }
    }

    if (projectType.value === "furniture_dining_table_assembly") {
      if (
        !diningTableSize?.value ||
        !diningTableChairQuantity?.value ||
        !diningTableBrand?.value ||
        !diningTableAlreadyInRoom?.value ||
        !diningTableExistingTable?.value
      ) {
        showValidation(validationStep3, "Please complete the dining table basics before continuing.");
        return false;
      }
    }

    if (projectType.value === "furniture_bookcase_assembly") {
      if (
        !bookcaseProjectType?.value ||
        !bookcaseSize?.value ||
        !bookcaseQuantity?.value ||
        !bookcaseBrand?.value ||
        !bookcaseAlreadyInRoom?.value ||
        !bookcaseExistingFurniture?.value
      ) {
        showValidation(validationStep3, "Please complete the bookshelf / bookcase basics before continuing.");
        return false;
      }
    }

    if (projectType.value === "furniture_coffee_table_assembly") {
      if (
        !coffeeTableSize?.value ||
        !coffeeTableBrand?.value ||
        !coffeeTableAlreadyInRoom?.value ||
        !coffeeTableExistingTable?.value
      ) {
        showValidation(validationStep3, "Please complete the coffee table basics before continuing.");
        return false;
      }
    }

    if (projectType.value === "furniture_nightstand_assembly") {
      if (
        !nightstandSize?.value ||
        !nightstandQuantity?.value ||
        !nightstandBrand?.value ||
        !nightstandAlreadyInRoom?.value ||
        !nightstandExistingFurniture?.value
      ) {
        showValidation(validationStep3, "Please complete the nightstand basics before continuing.");
        return false;
      }
    }

    if (projectType.value === "furniture_office_chair_assembly") {
      if (
        !officeChairType?.value ||
        !officeChairQuantity?.value ||
        !officeChairBrand?.value ||
        !officeChairAlreadyInRoom?.value ||
        !officeChairExistingFurniture?.value
      ) {
        showValidation(validationStep3, "Please complete the office chair basics before continuing.");
        return false;
      }
    }

    if (projectType.value === "furniture_entertainment_center_assembly") {
      if (
        !entertainmentCenterType?.value ||
        !entertainmentCenterSectionCount?.value ||
        !entertainmentCenterBrand?.value ||
        !entertainmentCenterAlreadyInRoom?.value ||
        !entertainmentCenterExistingFurniture?.value
      ) {
        showValidation(
          validationStep3,
          "Please complete the entertainment center basics before continuing."
        );
        return false;
      }
    }
  }

  if (step === 4) {
    clearValidation(validationStep4);

    if (projectType.value === "furniture_dresser_assembly") {
      if (
        dresserHasProductLink?.value === "yes" &&
        dresserProductLink?.value.trim() &&
        !isSoftValidProductUrl(dresserProductLink.value)
      ) {
        showValidation(validationStep4, "Please enter a valid product link, or clear the field to continue.");
        return false;
      }
    }

    if (projectType.value === "furniture_bed_frame_assembly") {
      if (
        bedHasProductLink?.value === "yes" &&
        bedProductLink?.value.trim() &&
        !isSoftValidProductUrl(bedProductLink.value)
      ) {
        showValidation(validationStep4, "Please enter a valid product link, or clear the field to continue.");
        return false;
      }
    }

    if (projectType.value === "furniture_tv_stand_assembly") {
      if (!tvStandHasFireplace?.value) {
        showValidation(validationStep4, "Please tell us whether the TV stand includes a fireplace insert.");
        return false;
      }
      if (
        tvStandHasProductLink?.value === "yes" &&
        tvStandProductLink?.value.trim() &&
        !isSoftValidProductUrl(tvStandProductLink.value)
      ) {
        showValidation(validationStep4, "Please enter a valid product link, or clear the field to continue.");
        return false;
      }
    }

    if (projectType.value === "furniture_desk_assembly") {
      if (
        deskHasProductLink?.value === "yes" &&
        deskProductLink?.value.trim() &&
        !isSoftValidProductUrl(deskProductLink.value)
      ) {
        showValidation(validationStep4, "Please enter a valid product link, or clear the field to continue.");
        return false;
      }
    }

    if (projectType.value === "furniture_dining_table_assembly") {
      if (
        diningTableHasProductLink?.value === "yes" &&
        diningTableProductLink?.value.trim() &&
        !isSoftValidProductUrl(diningTableProductLink.value)
      ) {
        showValidation(validationStep4, "Please enter a valid product link, or clear the field to continue.");
        return false;
      }
    }

    if (projectType.value === "furniture_bookcase_assembly") {
      if (
        bookcaseHasProductLink?.value === "yes" &&
        bookcaseProductLink?.value.trim() &&
        !isSoftValidProductUrl(bookcaseProductLink.value)
      ) {
        showValidation(validationStep4, "Please enter a valid product link, or clear the field to continue.");
        return false;
      }
    }

    if (projectType.value === "furniture_coffee_table_assembly") {
      if (
        coffeeTableHasProductLink?.value === "yes" &&
        coffeeTableProductLink?.value.trim() &&
        !isSoftValidProductUrl(coffeeTableProductLink.value)
      ) {
        showValidation(validationStep4, "Please enter a valid product link, or clear the field to continue.");
        return false;
      }
    }

    if (projectType.value === "furniture_nightstand_assembly") {
      if (
        nightstandHasProductLink?.value === "yes" &&
        nightstandProductLink?.value.trim() &&
        !isSoftValidProductUrl(nightstandProductLink.value)
      ) {
        showValidation(validationStep4, "Please enter a valid product link, or clear the field to continue.");
        return false;
      }
    }

    if (projectType.value === "furniture_office_chair_assembly") {
      if (
        officeChairHasProductLink?.value === "yes" &&
        officeChairProductLink?.value.trim() &&
        !isSoftValidProductUrl(officeChairProductLink.value)
      ) {
        showValidation(validationStep4, "Please enter a valid product link, or clear the field to continue.");
        return false;
      }
    }

    if (projectType.value === "furniture_entertainment_center_assembly") {
      if (
        entertainmentCenterHasProductLink?.value === "yes" &&
        entertainmentCenterProductLink?.value.trim() &&
        !isSoftValidProductUrl(entertainmentCenterProductLink.value)
      ) {
        showValidation(validationStep4, "Please enter a valid product link, or clear the field to continue.");
        return false;
      }
    }
  }

  return true;
}

function renderEstimate(estimateData, formData) {
  resultsProjectName.textContent = `Project Type: ${formData.projectDisplayName}`;
  breakdownList.innerHTML = "";

  if (estimateData.isAiDesign) {
    if (tradeResultsBlock) tradeResultsBlock.classList.add("hidden");
    if (aiDesignResultsBlock) aiDesignResultsBlock.classList.remove("hidden");
    if (resultsHeading) resultsHeading.textContent = "AI Design Preliminary Ranges";
    if (resultsIntro) {
      resultsIntro.textContent =
        "Based on your answers and ZIP code, here are three localized preliminary finish ranges. Select one level to continue.";
    }
    if (resultsDisclaimer) {
      resultsDisclaimer.innerHTML =
        "These are <strong>preliminary localized ranges</strong> for review. They are not a final quote. Consultation will compare the AI design with the real space and refine the appropriate project level. Placeholder factors may be in use until approved pricing data is loaded.";
    }

    if (aiDesignZipDisplay) aiDesignZipDisplay.textContent = estimateData.zipcode || formData.zipcode || "—";
    if (aiDesignFactorDisplay) aiDesignFactorDisplay.textContent = `x${Number(estimateData.locationFactor).toFixed(2)}`;
    if (aiDesignFactorSource) {
      aiDesignFactorSource.textContent =
        estimateData.locationFactorSource === "temp_review_default"
          ? "(temporary review default — ZIP table not populated yet)"
          : `(${estimateData.locationFactorSource})`;
    }
    if (aiDesignReviewBanner) {
      aiDesignReviewBanner.classList.toggle(
        "hidden",
        estimateData.locationFactorSource !== "temp_review_default" &&
          typeof AI_DESIGN_FINISH_LEVELS.essential.adjustment === "number" &&
          estimateData.configuredLocationFactor != null
      );
    }

    if (aiRangeEssential && estimateData.ranges?.essential) {
      aiRangeEssential.textContent = `${currency(estimateData.ranges.essential.min)} – ${currency(estimateData.ranges.essential.max)}`;
    }
    if (aiRangeEnhanced && estimateData.ranges?.enhanced) {
      aiRangeEnhanced.textContent = `${currency(estimateData.ranges.enhanced.min)} – ${currency(estimateData.ranges.enhanced.max)}`;
    }
    if (aiRangePremium && estimateData.ranges?.premium) {
      aiRangePremium.textContent = `${currency(estimateData.ranges.premium.min)} – ${currency(estimateData.ranges.premium.max)}`;
    }

    syncAiFinishCardSelection(estimateData.selectedFinishLevel);
    updateAiDesignSelectedPriceDisplay(estimateData);
  } else {
    if (tradeResultsBlock) tradeResultsBlock.classList.remove("hidden");
    if (aiDesignResultsBlock) aiDesignResultsBlock.classList.add("hidden");

    if (estimateData.isManualReviewRequired) {
      if (resultsHeading) {
        resultsHeading.textContent = estimateData.manualReviewHeading || "Personalized Estimate Required";
      }
      if (resultsIntro) {
        resultsIntro.textContent =
          estimateData.manualReviewIntro ||
          "This Murphy bed project needs a personalized Tamay review before pricing can be confirmed.";
      }
      if (resultsDisclaimer) {
        resultsDisclaimer.innerHTML =
          estimateData.manualReviewDisclaimer ||
          "Please submit your product link, photos, and assembly manual with <strong>Get My Exact Quote</strong> so Tamay Enterprises can review installation conditions and confirm pricing.";
      }

      materialsOutput.textContent = "Estimated Materials: Personalized review";
      laborOutput.textContent = "Estimated Labor: Personalized review";
      totalOutput.textContent = "Estimated Total Range: Personalized review required";
      workingPriceOutput.textContent = "Get My Exact Quote";

      if (payNowBtn) payNowBtn.disabled = true;
      if (hotLeadBtn) {
        hotLeadBtn.disabled = false;
        hotLeadBtn.textContent = "Get My Exact Quote";
      }
    } else {
      if (resultsHeading) resultsHeading.textContent = "Project Estimate";
      if (resultsIntro) {
        resultsIntro.textContent =
          "Based on the information provided, here is your estimate range and your clear working price for scheduling.";
      }
      if (resultsDisclaimer) {
        resultsDisclaimer.innerHTML =
          'This is a <strong>preliminary estimate</strong> based only on the information provided. Final pricing may vary depending on hidden conditions, actual access, protection needs, paint matching, existing texture, additional structural issues, and on-site review.';
      }

      materialsOutput.textContent = `Estimated Materials: ${currency(estimateData.minMaterials)} - ${currency(estimateData.maxMaterials)}`;
      laborOutput.textContent = `Estimated Labor: ${currency(estimateData.laborMin)} - ${currency(estimateData.laborMax)}`;
      totalOutput.textContent = `Estimated Total Range: ${currency(estimateData.totalMin)} - ${currency(estimateData.totalMax)}`;

      const workingPrice = Math.round((estimateData.totalMin + estimateData.totalMax) / 2);
      workingPriceOutput.textContent = currency(workingPrice);

      if (payNowBtn) payNowBtn.disabled = false;
      if (hotLeadBtn) hotLeadBtn.disabled = false;
    }
  }

  const summaryItems =
    estimateData.isAiDesign || estimateData.isManualReviewRequired
      ? []
      : [
          `Estimated crew time: ${estimateData.hours} hours`,
          `Materials considered: ${(estimateData.materialsList || []).join(", ")}`
        ];

  [...summaryItems, ...estimateData.adjustments].forEach((item) => {
    if (!item) return;
    const li = document.createElement("li");
    li.textContent = item;
    breakdownList.appendChild(li);
  });
}

function syncAiFinishCardSelection(selectedKey) {
  if (!aiDesignFinishGrid) return;
  aiDesignFinishGrid.querySelectorAll(".ai-finish-card").forEach((card) => {
    const isSelected = card.dataset.finish === selectedKey;
    card.setAttribute("aria-pressed", isSelected ? "true" : "false");
    card.classList.toggle("selected", isSelected);
  });
}

function updateAiDesignSelectedPriceDisplay(estimateData) {
  const selected = estimateData?.selectedFinishLevel && estimateData.ranges?.[estimateData.selectedFinishLevel];
  if (!selected) {
    if (aiDesignWorkingPriceOutput) aiDesignWorkingPriceOutput.textContent = "Select a finish level";
    if (aiDesignSelectionNote) {
      aiDesignSelectionNote.textContent =
        "Choose Essential, Enhanced, or Premium above to continue with Pay Deposit & Schedule or Get My Exact Quote.";
    }
    if (payNowBtn) payNowBtn.disabled = true;
    if (hotLeadBtn) hotLeadBtn.disabled = true;
    return;
  }

  const workingPrice = Math.round((selected.min + selected.max) / 2);
  if (aiDesignWorkingPriceOutput) aiDesignWorkingPriceOutput.textContent = currency(workingPrice);
  if (aiDesignSelectionNote) {
    aiDesignSelectionNote.textContent = `${selected.label} selected. Booking price uses the midpoint of that localized range.`;
  }
  if (payNowBtn) payNowBtn.disabled = false;
  if (hotLeadBtn) hotLeadBtn.disabled = false;
}

function selectAiFinishLevel(finishKey) {
  if (!latestEstimate?.isAiDesign || !latestEstimate.ranges?.[finishKey]) return;

  selectedAiFinishLevel = finishKey;
  latestEstimate.selectedFinishLevel = finishKey;
  latestEstimate.selectedFinishLabel = latestEstimate.ranges[finishKey].label;
  latestEstimate.totalMin = latestEstimate.ranges[finishKey].min;
  latestEstimate.totalMax = latestEstimate.ranges[finishKey].max;

  syncAiFinishCardSelection(finishKey);
  updateAiDesignSelectedPriceDisplay(latestEstimate);
}

function getWorkingPriceFromEstimate(estimateData) {
  if (!estimateData) return 0;
  if (estimateData.isManualReviewRequired) return 0;
  if (estimateData.isAiDesign) {
    const key = estimateData.selectedFinishLevel;
    const range = key ? estimateData.ranges?.[key] : null;
    if (!range) return 0;
    return Math.round((range.min + range.max) / 2);
  }
  return Math.round((estimateData.totalMin + estimateData.totalMax) / 2);
}

function resetExperience() {
  form.reset();

  clearValidation(validationStep1);
  clearValidation(validationStep2);
  clearValidation(validationStep3);
  clearValidation(validationStep4);

  latestEstimate = null;
  coldLeadSubmitted = false;
  hotLeadSubmitted = false;
  selectedAiFinishLevel = null;

  if (hotLeadBtn) {
    hotLeadBtn.disabled = false;
    hotLeadBtn.textContent = "Get My Exact Quote";
  }

  if (doneBtn) {
    doneBtn.disabled = false;
  }

  if (payNowBtn) {
    payNowBtn.disabled = false;
  }

  breakdownList.innerHTML = "";
  if (tradeResultsBlock) tradeResultsBlock.classList.remove("hidden");
  if (aiDesignResultsBlock) aiDesignResultsBlock.classList.add("hidden");

  setSelectedProject("drywall_patch_wall_repair", "Drywall Patch / Wall Repair");
  updateDrywallContextUI();
  updateLightingConditionalFields();
  updateTvMountConditionalFields();
  updatePaintConditionalFields();
  updateDresserConditionalFields();
  updateBedFrameConditionalFields();
  updateTvStandConditionalFields();
  updateDeskConditionalFields();
  updateDiningTableConditionalFields();
  updateBookcaseConditionalFields();
  updateCoffeeTableConditionalFields();
  updateNightstandConditionalFields();
  updateOfficeChairConditionalFields();
  updateEntertainmentCenterConditionalFields();
  updatePlumbingConditionalUI();
  updatePropertyTypeMessage();
  hideAllEndStates();
  stepper.classList.remove("hidden");
  showStep(1, { scrollMode: "hero" });
}

if (startEstimateCta && selectProjectSection) {
  startEstimateCta.addEventListener("click", (e) => {
    e.preventDefault();
    selectProjectSection.scrollIntoView({ behavior: "smooth", block: "start" });
    selectProjectSection.classList.remove("is-emphasized");
    // Restart emphasis animation
    void selectProjectSection.offsetWidth;
    selectProjectSection.classList.add("is-emphasized");
    window.setTimeout(() => {
      selectProjectSection.classList.remove("is-emphasized");
    }, 900);
    if (history.replaceState) {
      history.replaceState(null, "", "#selectProjectSection");
    }
  });
}

projectSelectorTrigger.addEventListener("click", (e) => {
  e.stopPropagation();
  toggleProjectSelector();
});

document.addEventListener("click", (e) => {
  if (!projectSelectorShell.contains(e.target)) {
    projectSelectorShell.classList.remove("open");
    projectSelectorTrigger.setAttribute("aria-expanded", "false");
  }
});

drywallProjectOption.addEventListener("click", () => {
  setSelectedProject("drywall_patch_wall_repair", "Drywall Patch / Wall Repair");
});

lightingProjectOption.addEventListener("click", () => {
  setSelectedProject("lighting_add_replace", "Add or Replace a Light Fixture");
});

paintProjectOption.addEventListener("click", () => {
  setSelectedProject("paint_one_room", "Paint One Room");
});

if (aiDesignProjectOption) {
  aiDesignProjectOption.addEventListener("click", () => {
    setSelectedProject("ai_design", "AI Design");
  });
}

if (dresserAssemblyProjectOption) {
  dresserAssemblyProjectOption.addEventListener("click", () => {
    setSelectedProject("furniture_dresser_assembly", "Dresser Assembly");
  });
}

if (bedFrameAssemblyProjectOption) {
  bedFrameAssemblyProjectOption.addEventListener("click", () => {
    setSelectedProject("furniture_bed_frame_assembly", "Bed Frame Assembly");
  });
}

if (tvStandAssemblyProjectOption) {
  tvStandAssemblyProjectOption.addEventListener("click", () => {
    setSelectedProject("furniture_tv_stand_assembly", "TV Stand Assembly");
  });
}

if (deskAssemblyProjectOption) {
  deskAssemblyProjectOption.addEventListener("click", () => {
    setSelectedProject("furniture_desk_assembly", "Desk Assembly");
  });
}

if (diningTableAssemblyProjectOption) {
  diningTableAssemblyProjectOption.addEventListener("click", () => {
    setSelectedProject("furniture_dining_table_assembly", "Dining Table Assembly");
  });
}

if (bookcaseAssemblyProjectOption) {
  bookcaseAssemblyProjectOption.addEventListener("click", () => {
    setSelectedProject("furniture_bookcase_assembly", "Bookshelf / Bookcase Assembly");
  });
}

if (coffeeTableAssemblyProjectOption) {
  coffeeTableAssemblyProjectOption.addEventListener("click", () => {
    setSelectedProject("furniture_coffee_table_assembly", "Coffee Table Assembly");
  });
}

if (nightstandAssemblyProjectOption) {
  nightstandAssemblyProjectOption.addEventListener("click", () => {
    setSelectedProject("furniture_nightstand_assembly", "Nightstand Assembly");
  });
}

if (officeChairAssemblyProjectOption) {
  officeChairAssemblyProjectOption.addEventListener("click", () => {
    setSelectedProject("furniture_office_chair_assembly", "Office Chair Assembly");
  });
}

if (entertainmentCenterAssemblyProjectOption) {
  entertainmentCenterAssemblyProjectOption.addEventListener("click", () => {
    setSelectedProject("furniture_entertainment_center_assembly", "Entertainment Center Assembly");
  });
}

plumbingFaucetProjectOption.addEventListener("click", () => {
  setSelectedProject("plumbing_replace_faucet", "Replace Faucet");
});

plumbingToiletProjectOption.addEventListener("click", () => {
  setSelectedProject("plumbing_replace_toilet", "Replace Toilet");
});

plumbingVanityProjectOption.addEventListener("click", () => {
  setSelectedProject("plumbing_replace_vanity", "Replace Vanity");
});

plumbingDisposalProjectOption.addEventListener("click", () => {
  setSelectedProject("plumbing_replace_garbage_disposal", "Replace Garbage Disposal");
});

tvMountProjectOption.addEventListener("click", () => {
  setSelectedProject("tv_mount_install", "TV Mount Installation");
});

plumbingShutoffProjectOption.addEventListener("click", () => {
  setSelectedProject("plumbing_replace_shutoff_valves", "Replace Shutoff Valves");
});

plumbingLeakProjectOption.addEventListener("click", () => {
  setSelectedProject("plumbing_fix_active_leak", "Fix Active Leak");
});

plumbingNewFixtureProjectOption.addEventListener("click", () => {
  setSelectedProject("plumbing_install_new_fixture", "Install New Plumbing Fixture");
});

propertyTypeGlobal.addEventListener("change", updatePropertyTypeMessage);

damageLocation.addEventListener("change", updateDrywallContextUI);

lightingType.addEventListener("change", updateLightingConditionalFields);
lightingLocation.addEventListener("change", updateLightingConditionalFields);
accessDifficulty.addEventListener("change", updateLightingConditionalFields);
wireRun.addEventListener("change", updateLightingConditionalFields);
atticAccess.addEventListener("change", updateLightingConditionalFields);
repairIncluded.addEventListener("change", updateLightingConditionalFields);
paintAfterRepair.addEventListener("change", updateLightingConditionalFields);

paintScopeCheckboxes.forEach((cb) => cb.addEventListener("change", updatePaintConditionalFields));
paintYearBuilt.addEventListener("change", updatePaintConditionalFields);
wireConceal.addEventListener("change", updateTvMountConditionalFields);
powerWork.addEventListener("change", updateTvMountConditionalFields);

if (dresserSize) dresserSize.addEventListener("change", updateDresserConditionalFields);
if (dresserAlreadyInRoom) dresserAlreadyInRoom.addEventListener("change", updateDresserConditionalFields);
if (dresserWallAnchoring) dresserWallAnchoring.addEventListener("change", updateDresserConditionalFields);
if (dresserHasProductLink) dresserHasProductLink.addEventListener("change", updateDresserConditionalFields);
if (bedHasProductLink) bedHasProductLink.addEventListener("change", updateBedFrameConditionalFields);
if (bedType) bedType.addEventListener("change", updateBedFrameConditionalFields);
if (tvStandHasProductLink) tvStandHasProductLink.addEventListener("change", updateTvStandConditionalFields);
if (deskHasProductLink) deskHasProductLink.addEventListener("change", updateDeskConditionalFields);
if (deskType) deskType.addEventListener("change", updateDeskConditionalFields);
if (diningTableHasProductLink) {
  diningTableHasProductLink.addEventListener("change", updateDiningTableConditionalFields);
}
if (bookcaseHasProductLink) {
  bookcaseHasProductLink.addEventListener("change", updateBookcaseConditionalFields);
}
if (bookcaseProjectType) bookcaseProjectType.addEventListener("change", updateBookcaseConditionalFields);
if (bookcaseQuantity) bookcaseQuantity.addEventListener("change", updateBookcaseConditionalFields);
if (coffeeTableHasProductLink) {
  coffeeTableHasProductLink.addEventListener("change", updateCoffeeTableConditionalFields);
}
if (nightstandHasProductLink) {
  nightstandHasProductLink.addEventListener("change", updateNightstandConditionalFields);
}
if (nightstandQuantity) nightstandQuantity.addEventListener("change", updateNightstandConditionalFields);
if (officeChairHasProductLink) {
  officeChairHasProductLink.addEventListener("change", updateOfficeChairConditionalFields);
}
if (officeChairQuantity) officeChairQuantity.addEventListener("change", updateOfficeChairConditionalFields);
if (entertainmentCenterHasProductLink) {
  entertainmentCenterHasProductLink.addEventListener("change", updateEntertainmentCenterConditionalFields);
}
if (entertainmentCenterSectionCount) {
  entertainmentCenterSectionCount.addEventListener("change", updateEntertainmentCenterConditionalFields);
}

setupAccordions();
updateDresserConditionalFields();
updateBedFrameConditionalFields();
updateTvStandConditionalFields();
updateDeskConditionalFields();
updateDiningTableConditionalFields();
updateBookcaseConditionalFields();
updateCoffeeTableConditionalFields();
updateNightstandConditionalFields();
updateOfficeChairConditionalFields();
updateEntertainmentCenterConditionalFields();

nextToStep2.addEventListener("click", () => {
  if (validateStep(1)) showStep(2);
});

backToStep1.addEventListener("click", () => {
  showStep(1);
});

nextToStep3.addEventListener("click", () => {
  if (validateStep(2)) showStep(3);
});

backToStep2.addEventListener("click", () => {
  showStep(2);
});

nextToStep4.addEventListener("click", () => {
  if (validateStep(3)) showStep(4);
});

backToStep3.addEventListener("click", () => {
  showStep(3);
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (!validateStep(4)) return;

  const formData = getFormData();

  if (formData.projectType === "lighting_add_replace") {
    latestEstimate = calculateLightingEstimate(formData);
  } else if (formData.projectType === "paint_one_room") {
    latestEstimate = calculatePaintEstimate(formData);
  } else if (formData.projectType === "tv_mount_install") {
    latestEstimate = calculateTvMountEstimate(formData);
  } else if (formData.projectType === "ai_design") {
    selectedAiFinishLevel = null;
    latestEstimate = calculateAiDesignEstimate(formData);
  } else if (formData.projectType === "furniture_dresser_assembly") {
    latestEstimate = calculateDresserAssemblyEstimate(formData);
  } else if (formData.projectType === "furniture_bed_frame_assembly") {
    latestEstimate = calculateBedFrameAssemblyEstimate(formData);
  } else if (formData.projectType === "furniture_tv_stand_assembly") {
    latestEstimate = calculateTvStandAssemblyEstimate(formData);
  } else if (formData.projectType === "furniture_desk_assembly") {
    latestEstimate = calculateDeskAssemblyEstimate(formData);
  } else if (formData.projectType === "furniture_dining_table_assembly") {
    latestEstimate = calculateDiningTableAssemblyEstimate(formData);
  } else if (formData.projectType === "furniture_bookcase_assembly") {
    latestEstimate = calculateBookcaseAssemblyEstimate(formData);
  } else if (formData.projectType === "furniture_coffee_table_assembly") {
    latestEstimate = calculateCoffeeTableAssemblyEstimate(formData);
  } else if (formData.projectType === "furniture_nightstand_assembly") {
    latestEstimate = calculateNightstandAssemblyEstimate(formData);
  } else if (formData.projectType === "furniture_office_chair_assembly") {
    latestEstimate = calculateOfficeChairAssemblyEstimate(formData);
  } else if (formData.projectType === "furniture_entertainment_center_assembly") {
    latestEstimate = calculateEntertainmentCenterAssemblyEstimate(formData);
  } else if (isPlumbingProject(formData.projectType)) {
    latestEstimate = calculatePlumbingEstimate(formData);
  } else {
    latestEstimate = calculateDrywallEstimate(formData);
  }

  renderEstimate(latestEstimate, formData);
  function updatePlumbingConditionalUI() {
  const type = projectType.value;

  hideAllPlumbingSubsections();

  if (!isPlumbingProject(type)) return;

  plumbingBasicsSection.classList.remove("hidden");
  plumbingDetailsSection.classList.remove("hidden");
  showPlumbingSectionsByProject(type);
}

function calculatePlumbingEstimate(formData) {
  const leadMeta = classifyLead(formData);
  const adjustments = [];
  const internalAdjustments = [];

  internalAdjustments.push(`Service zone: ${leadMeta.serviceZone}`);
  internalAdjustments.push(`Distance band: ${leadMeta.distanceBand}`);
  internalAdjustments.push(`Lead priority: ${leadMeta.leadPriority}`);

  let minMaterials = 0;
  let maxMaterials = 0;
  let laborMin = 0;
  let laborMax = 0;
  let hours = 0;
  let materialsList = [];

  if (formData.projectType === "plumbing_replace_faucet") {
    const cfg = PRICING.plumbing.faucet;

    laborMin += cfg.baseLaborMin;
    laborMax += cfg.baseLaborMax;
    hours += cfg.hours;
    materialsList = cfg.materials;
    adjustments.push("Base faucet replacement");

    if (formData.plumbingHasFixture === "no") {
      minMaterials += cfg.fixtureAllowanceMin;
      maxMaterials += cfg.fixtureAllowanceMax;
      adjustments.push("Fixture allowance included");
    } else if (formData.plumbingHasFixture === "notSure") {
      minMaterials += cfg.fixtureAllowanceMin * 0.5;
      maxMaterials += cfg.fixtureAllowanceMax * 0.7;
      adjustments.push("Fixture allowance may be needed");
    }

    if (formData.plumbingShutoffCondition === "no") {
      laborMin += cfg.shutoffAddLaborMin;
      laborMax += cfg.shutoffAddLaborMax;
      minMaterials += cfg.shutoffAddMatMin;
      maxMaterials += cfg.shutoffAddMatMax;
      adjustments.push("Shutoff valves may need replacement");
    } else if (formData.plumbingShutoffCondition === "notSure") {
      laborMin += 30;
      laborMax += 60;
      minMaterials += 10;
      maxMaterials += 25;
      adjustments.push("Shutoff condition to be confirmed");
    }

    if (formData.plumbingSeverity === "active") {
      laborMin += cfg.activeIssueAddLaborMin;
      laborMax += cfg.activeIssueAddLaborMax;
      adjustments.push("Active plumbing issue adjustment");
    } else if (formData.plumbingSeverity === "damage") {
      laborMin += 60;
      laborMax += 120;
      adjustments.push("Possible surrounding damage adjustment");
    }

    const accessAdj = cfg.access[formData.plumbingAccessDifficulty] || cfg.access.notSure;
    laborMin += accessAdj.laborMin;
    laborMax += accessAdj.laborMax;
    if (formData.plumbingAccessDifficulty !== "easy") {
      adjustments.push("Access difficulty adjustment");
    }

    if (formData.plumbingVisibleDamage === "minor") {
      laborMin += 40;
      laborMax += 90;
      minMaterials += 15;
      maxMaterials += 40;
      adjustments.push("Minor visible damage");
    } else if (formData.plumbingVisibleDamage === "major") {
      laborMin += 100;
      laborMax += 220;
      minMaterials += 35;
      maxMaterials += 90;
      adjustments.push("Major visible damage");
    } else if (formData.plumbingVisibleDamage === "notSure") {
      laborMin += 50;
      laborMax += 110;
      minMaterials += 20;
      maxMaterials += 50;
      adjustments.push("Visible damage to be confirmed");
    }
  }

  else if (formData.projectType === "plumbing_replace_toilet") {
    const cfg = PRICING.plumbing.toilet;

    laborMin += cfg.baseLaborMin;
    laborMax += cfg.baseLaborMax;
    hours += cfg.hours;
    minMaterials += 25;
    maxMaterials += 60;
    materialsList = cfg.materials;
    adjustments.push("Base toilet replacement");

    if (formData.plumbingHasFixture === "no") {
      minMaterials += cfg.fixtureAllowanceMin;
      maxMaterials += cfg.fixtureAllowanceMax;
      adjustments.push("Toilet fixture allowance included");
    } else if (formData.plumbingHasFixture === "notSure") {
      minMaterials += 60;
      maxMaterials += 140;
      adjustments.push("Fixture allowance may be needed");
    }

    const floorAdj = cfg.floorIssue[formData.plumbingFloorIssue] || cfg.floorIssue.notSure;
    laborMin += floorAdj.laborMin;
    laborMax += floorAdj.laborMax;
    minMaterials += floorAdj.matMin;
    maxMaterials += floorAdj.matMax;
    if (formData.plumbingFloorIssue !== "no") {
      adjustments.push("Floor condition adjustment");
    }

    const looseAdj = cfg.loose[formData.plumbingLoose] || cfg.loose.notSure;
    laborMin += looseAdj.laborMin;
    laborMax += looseAdj.laborMax;
    if (formData.plumbingLoose !== "no") {
      adjustments.push("Loose / rocking toilet adjustment");
    }

    const accessAdj = cfg.access[formData.plumbingAccessDifficulty] || cfg.access.notSure;
    laborMin += accessAdj.laborMin;
    laborMax += accessAdj.laborMax;
    if (formData.plumbingAccessDifficulty !== "easy") {
      adjustments.push("Access difficulty adjustment");
    }

    if (formData.plumbingRepairScope === "includeRepairsIfNeeded") {
      laborMin += 60;
      laborMax += 140;
      minMaterials += 20;
      maxMaterials += 60;
      adjustments.push("Surrounding repairs allowed if needed");
    }

    if (formData.plumbingSeverity === "active") {
      laborMin += 80;
      laborMax += 160;
      adjustments.push("Active issue adjustment");
    } else if (formData.plumbingSeverity === "damage") {
      laborMin += 50;
      laborMax += 110;
      adjustments.push("Possible surrounding damage");
    }
  }

  else if (formData.projectType === "plumbing_replace_vanity") {
    const cfg = PRICING.plumbing.vanity;

    laborMin += cfg.baseLaborMin;
    laborMax += cfg.baseLaborMax;
    hours += cfg.hours;
    minMaterials += 35;
    maxMaterials += 90;
    materialsList = cfg.materials;
    adjustments.push("Base vanity replacement");

    if (formData.plumbingHasFixture === "no") {
      minMaterials += cfg.fixtureAllowanceMin;
      maxMaterials += cfg.fixtureAllowanceMax;
      adjustments.push("Vanity allowance included");
    } else if (formData.plumbingHasFixture === "notSure") {
      minMaterials += 80;
      maxMaterials += 180;
      adjustments.push("Vanity allowance may be needed");
    }

    const sameSizeAdj = cfg.sameSize[formData.plumbingSameSize] || cfg.sameSize.notSure;
    laborMin += sameSizeAdj.laborMin;
    laborMax += sameSizeAdj.laborMax;
    if (formData.plumbingSameSize !== "yes") {
      adjustments.push("Size / fit adjustment");
    }

    const touchAdj = cfg.touchup[formData.plumbingFinishTouchup] || cfg.touchup.notSure;
    laborMin += touchAdj.laborMin;
    laborMax += touchAdj.laborMax;
    if (formData.plumbingFinishTouchup !== "no") {
      adjustments.push("Finish touch-up adjustment");
    }

    const leakAdj = cfg.leakDamage[formData.plumbingLeakDamage] || cfg.leakDamage.notSure;
    laborMin += leakAdj.laborMin;
    laborMax += leakAdj.laborMax;
    minMaterials += leakAdj.matMin;
    maxMaterials += leakAdj.matMax;
    if (formData.plumbingLeakDamage !== "no") {
      adjustments.push("Leak / water damage adjustment");
    }

    if (formData.plumbingScope === "includeRelatedPlumbing") {
      laborMin += 70;
      laborMax += 150;
      minMaterials += 20;
      maxMaterials += 50;
      adjustments.push("Related plumbing components allowed");
    }

    if (formData.plumbingIncluded === "vanityTop") {
      laborMin += 40;
      laborMax += 80;
      adjustments.push("Vanity with top");
    } else if (formData.plumbingIncluded === "vanityTopFaucet") {
      laborMin += 90;
      laborMax += 180;
      adjustments.push("Vanity with top and faucet");
    }
  }

  else if (formData.projectType === "plumbing_replace_garbage_disposal") {
    const cfg = PRICING.plumbing.garbageDisposal;

    laborMin += cfg.baseLaborMin;
    laborMax += cfg.baseLaborMax;
    hours += cfg.hours;
    minMaterials += 20;
    maxMaterials += 50;
    materialsList = cfg.materials;
    adjustments.push("Base garbage disposal replacement");

    if (formData.plumbingHasFixture === "no") {
      minMaterials += cfg.fixtureAllowanceMin;
      maxMaterials += cfg.fixtureAllowanceMax;
      adjustments.push("Garbage disposal allowance included");
    } else if (formData.plumbingHasFixture === "notSure") {
      minMaterials += 60;
      maxMaterials += 140;
      adjustments.push("Fixture allowance may be needed");
    }

    const areaAdj = cfg.areaDamage[formData.plumbingAreaDamage] || cfg.areaDamage.notSure;
    laborMin += areaAdj.laborMin;
    laborMax += areaAdj.laborMax;
    if (formData.plumbingAreaDamage !== "no") {
      adjustments.push("Sink area damage adjustment");
    }

    const powerAdj = cfg.powerReady[formData.plumbingPowerReady] || cfg.powerReady.notSure;
    laborMin += powerAdj.laborMin;
    laborMax += powerAdj.laborMax;
    minMaterials += powerAdj.matMin;
    maxMaterials += powerAdj.matMax;
    if (formData.plumbingPowerReady !== "yes") {
      adjustments.push("Power readiness adjustment");
    }

    const accessAdj = cfg.access[formData.plumbingAccessDifficulty] || cfg.access.notSure;
    laborMin += accessAdj.laborMin;
    laborMax += accessAdj.laborMax;
    if (formData.plumbingAccessDifficulty !== "easy") {
      adjustments.push("Access difficulty adjustment");
    }

    if (formData.plumbingScope === "includeSinkAreaIssuesIfNeeded") {
      laborMin += 60;
      laborMax += 130;
      minMaterials += 15;
      maxMaterials += 40;
      adjustments.push("Sink-area issues allowed if needed");
    }
  }

  else if (formData.projectType === "plumbing_replace_shutoff_valves") {
    const cfg = PRICING.plumbing.shutoff;
    const valveCount = formData.plumbingValveCount === "4plus" ? 4 : parseInt(formData.plumbingValveCount || "1", 10);

    let laborMultiplier = 1;
    if (valveCount === 2) {
      laborMultiplier = 1 + cfg.secondValveMultiplier;
    } else if (valveCount >= 3) {
      laborMultiplier = 1 + cfg.secondValveMultiplier + ((valveCount - 2) * cfg.extraValveMultiplier);
    }

    laborMin += cfg.baseOneLaborMin * laborMultiplier;
    laborMax += cfg.baseOneLaborMax * laborMultiplier;
    hours += 1.5 * laborMultiplier;
    minMaterials += cfg.baseMatMin * valveCount;
    maxMaterials += cfg.baseMatMax * valveCount;
    materialsList = cfg.materials;
    adjustments.push(`Base shutoff valve replacement for ${valveCount} valve(s)`);

    const accessAdj = cfg.access[formData.plumbingValveAccess] || cfg.access.moderate;
    laborMin += accessAdj.laborMin;
    laborMax += accessAdj.laborMax;
    if (formData.plumbingValveAccess !== "easy") {
      adjustments.push("Valve access adjustment");
    }

    const condAdj = cfg.condition[formData.plumbingValveCondition] || cfg.condition.notSure;
    laborMin += condAdj.laborMin;
    laborMax += condAdj.laborMax;
    if (formData.plumbingValveCondition !== "normal") {
      adjustments.push("Valve condition adjustment");
    }

    if (formData.plumbingValvePartOfOtherProject === "yes") {
      laborMin -= 40;
      laborMax -= 40;
      adjustments.push("Bundled with another plumbing project");
    }

    if (formData.plumbingScope === "includeNearbyIssuesIfNeeded") {
      laborMin += 50;
      laborMax += 120;
      minMaterials += 10;
      maxMaterials += 35;
      adjustments.push("Nearby plumbing issues allowed if needed");
    }
  }

  else if (formData.projectType === "plumbing_fix_active_leak") {
    const cfg = PRICING.plumbing.leak;
    const accessType = (cfg.access[formData.plumbingAccessDifficulty] || cfg.access.notSure).type;

    if (accessType === "accessible") {
      laborMin += cfg.accessibleLaborMin;
      laborMax += cfg.accessibleLaborMax;
      minMaterials += cfg.accessibleMatMin;
      maxMaterials += cfg.accessibleMatMax;
      hours += cfg.accessibleHours;
      adjustments.push("Accessible leak repair base");
    } else {
      laborMin += cfg.behindWallLaborMin;
      laborMax += cfg.behindWallLaborMax;
      minMaterials += cfg.behindWallMatMin;
      maxMaterials += cfg.behindWallMatMax;
      hours += cfg.behindWallHours;
      adjustments.push("Concealed / behind-wall leak base");
    }

    const accessAdj = cfg.access[formData.plumbingAccessDifficulty] || cfg.access.notSure;
    laborMin += accessAdj.laborMin || 0;
    laborMax += accessAdj.laborMax || 0;

    const durationAdj = cfg.duration[formData.plumbingLeakDuration] || cfg.duration.notSure;
    laborMin += durationAdj.laborMin;
    laborMax += durationAdj.laborMax;
    if (formData.plumbingLeakDuration !== "today") {
      adjustments.push("Leak duration adjustment");
    }

    const surfAdj = cfg.affectedSurfaces[formData.plumbingAffectedSurfaces] || cfg.affectedSurfaces.notSure;
    laborMin += surfAdj.laborMin;
    laborMax += surfAdj.laborMax;
    if (formData.plumbingAffectedSurfaces !== "no") {
      adjustments.push("Affected surfaces adjustment");
    }

    const dmgAdj = cfg.damageSigns[formData.plumbingDamageSigns] || cfg.damageSigns.notSure;
    laborMin += dmgAdj.laborMin;
    laborMax += dmgAdj.laborMax;
    if (formData.plumbingDamageSigns !== "no") {
      adjustments.push("Damage signs adjustment");
    }

    const openAdj = cfg.openAccessWork[formData.plumbingOpenAccessWork] || cfg.openAccessWork.notSure;
    laborMin += openAdj.laborMin;
    laborMax += openAdj.laborMax;
    if (formData.plumbingOpenAccessWork !== "no") {
      adjustments.push("Opening / access work allowed");
    }

    const repairAdj = cfg.repairAfterStop[formData.plumbingRepairAfterStop] || cfg.repairAfterStop.notSure;
    laborMin += repairAdj.laborMin;
    laborMax += repairAdj.laborMax;
    if (formData.plumbingRepairAfterStop !== "no") {
      adjustments.push("Post-leak repairs allowed");
    }
  }

  else if (formData.projectType === "plumbing_install_new_fixture") {
    const cfg = PRICING.plumbing.newFixture;

    laborMin += cfg.baseLaborMin;
    laborMax += cfg.baseLaborMax;
    hours += cfg.hours;
    minMaterials += 30;
    maxMaterials += 80;
    materialsList = cfg.materials;
    adjustments.push("Base new plumbing fixture installation");

    if (formData.plumbingHasFixture === "no") {
      minMaterials += cfg.fixtureAllowanceMin;
      maxMaterials += cfg.fixtureAllowanceMax;
      adjustments.push("Fixture allowance included");
    } else if (formData.plumbingHasFixture === "notSure") {
      minMaterials += 40;
      maxMaterials += 100;
      adjustments.push("Fixture allowance may be needed");
    }

    const supplyAdj = cfg.supplyAvailable[formData.plumbingSupplyAvailable] || cfg.supplyAvailable.notSure;
    laborMin += supplyAdj.laborMin;
    laborMax += supplyAdj.laborMax;
    if (formData.plumbingSupplyAvailable !== "yes") {
      adjustments.push("Water supply adjustment");
    }

    const drainAdj = cfg.drainAvailable[formData.plumbingDrainAvailable] || cfg.drainAvailable.notSure;
    laborMin += drainAdj.laborMin;
    laborMax += drainAdj.laborMax;
    if (formData.plumbingDrainAvailable !== "yes") {
      adjustments.push("Drain line adjustment");
    }

    const openingAdj = cfg.openingNeeded[formData.plumbingOpeningNeeded] || cfg.openingNeeded.notSure;
    laborMin += openingAdj.laborMin;
    laborMax += openingAdj.laborMax;
    if (formData.plumbingOpeningNeeded !== "no") {
      adjustments.push("Opening work adjustment");
    }

    const accessAdj = cfg.access[formData.plumbingAccessDifficulty] || cfg.access.notSure;
    laborMin += accessAdj.laborMin;
    laborMax += accessAdj.laborMax;
    if (formData.plumbingAccessDifficulty !== "easy") {
      adjustments.push("Access difficulty adjustment");
    }

    const repairAdj = cfg.repairScope[formData.plumbingRepairScope] || cfg.repairScope.installOnly;
    laborMin += repairAdj.laborMin;
    laborMax += repairAdj.laborMax;
    if (formData.plumbingRepairScope === "includeFinishRepairsIfNeeded") {
      adjustments.push("Finish repairs allowed if needed");
    }

    if (formData.plumbingSeverity === "openingLikelyNeeded") {
      laborMin += 70;
      laborMax += 140;
      adjustments.push("Likely opening / layout complexity");
    } else if (formData.plumbingSeverity === "somePlumbingNeeded") {
      laborMin += 50;
      laborMax += 110;
      adjustments.push("Some new plumbing work needed");
    }

    if (formData.plumbingFixtureType) {
      adjustments.push(`Fixture type: ${formData.plumbingFixtureType}`);
    }
  }

  minMaterials = Math.max(0, minMaterials);
  maxMaterials = Math.max(minMaterials, maxMaterials);
  laborMin = Math.max(0, laborMin);
  laborMax = Math.max(laborMin, laborMax);

  const totalMin = minMaterials + laborMin;
  const totalMax = maxMaterials + laborMax;

  return applyMarketAndPropertyAdjustments(
    {
      hours: Math.round(hours * 10) / 10,
      minMaterials,
      maxMaterials,
      laborMin,
      laborMax,
      totalMin,
      totalMax,
      materialsList,
      adjustments,
      internalAdjustments,
      leadMeta
    },
    formData,
    leadMeta
  );
}
  showStep(5);

  if (!coldLeadSubmitted) {
    try {
      await submitLead("COLD", latestEstimate);
      coldLeadSubmitted = true;
    } catch (error) {
      console.error(error);
    }
  }
});

hotLeadBtn.addEventListener("click", async () => {
  if (!latestEstimate) return;

  if (latestEstimate.isAiDesign && !latestEstimate.selectedFinishLevel) {
    alert("Please select Essential, Enhanced, or Premium before requesting an exact quote.");
    return;
  }

  if (hotLeadSubmitted) {
    showHotCompletion();
    return;
  }

  hotLeadBtn.disabled = true;
  hotLeadBtn.textContent = "Sending...";
  if (payNowBtn) payNowBtn.disabled = true;
  doneBtn.disabled = true;

  try {
    await submitLead("HOT", latestEstimate);
    hotLeadSubmitted = true;
    showHotCompletion();
  } catch (error) {
    console.error(error);
    hotLeadBtn.disabled = false;
    if (payNowBtn) payNowBtn.disabled = false;
    hotLeadBtn.textContent = "Get My Exact Quote";
    doneBtn.disabled = false;
    alert("We could not submit your request right now. Please try again.");
  }
});

doneBtn.addEventListener("click", () => {
  resetExperience();
});

if (aiDesignFinishGrid) {
  aiDesignFinishGrid.addEventListener("click", (e) => {
    const card = e.target.closest(".ai-finish-card");
    if (!card) return;
    selectAiFinishLevel(card.dataset.finish);
  });
}

// PAYMENT FLOW HANDLERS
if (payNowBtn) {
  payNowBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    e.stopPropagation();

    // Verify we have an estimate
    if (!latestEstimate) {
      alert("No estimate available");
      return;
    }

    if (latestEstimate.isAiDesign && !latestEstimate.selectedFinishLevel) {
      alert("Please select Essential, Enhanced, or Premium before scheduling.");
      return;
    }

    if (latestEstimate.isManualReviewRequired) {
      alert("This Murphy bed project needs a personalized estimate. Please use Get My Exact Quote.");
      return;
    }

    // Get form data from Step 2
    const fullName = document.getElementById("fullName")?.value || "";
    const email = document.getElementById("email")?.value || "";
    const phone = document.getElementById("phone")?.value || "";
    const zipcode = document.getElementById("zipcode")?.value || "";
    const city = document.getElementById("city")?.value || "";

    if (!fullName || !email || !phone) {
      alert("Please fill in your name, email, and phone number");
      return;
    }

    const workingPrice = getWorkingPriceFromEstimate(latestEstimate);
    if (!workingPrice) {
      alert("Unable to determine booking price. Please select a finish level.");
      return;
    }

    // Build URL with parameters for the scheduler
    const params = new URLSearchParams({
      name: fullName,
      email: email,
      phone: phone,
      zip: zipcode,
      address: city,
      projectType: projectType.value,
      projectDisplayName: projectDisplayName.value,
      workingPrice: `$${workingPrice}`,
      finishLevel: latestEstimate.selectedFinishLevel || "",
      finishLabel: latestEstimate.selectedFinishLabel || ""
    });
    
    // Scheduler lives next to index on whatever origin hosts the app (Render, GitHub Pages, localhost).
    const schedulerPage = new URL("scheduler.html", window.location.href);
    schedulerPage.search = params.toString();
    window.location.href = schedulerPage.toString();
  });
}

// Submit payment button
if (submitPaymentBtn) {
  submitPaymentBtn.addEventListener("click", async (e) => {
    if (window.stripePayment && window.stripePayment.handlePaymentSubmit) {
      await window.stripePayment.handlePaymentSubmit(e);
    }
  });
}

// Cancel payment button
if (cancelPaymentBtn) {
  cancelPaymentBtn.addEventListener("click", (e) => {
    e.preventDefault();
    // Just hide payment section if it was shown
    const paymentSection = document.getElementById("paymentSection");
    if (paymentSection) {
      paymentSection.classList.add("hidden");
    }
  });
}

// Function to submit form with payment info
async function submitFormWithPayment(paymentMethod) {
  try {
    const formData = {
      fullName: document.getElementById("fullName")?.value,
      email: document.getElementById("email")?.value,
      phone: document.getElementById("phone")?.value,
      zipcode: document.getElementById("zipcode")?.value,
      city: document.getElementById("city")?.value,
      propertyType: document.getElementById("propertyType")?.value,
      ownerStatus: document.getElementById("ownerStatus")?.value,
      timeline: document.getElementById("timeline")?.value,
      projectType: projectType.value,
      projectDisplayName: projectDisplayName.value,
      paymentMethod: paymentMethod,
      paymentStatus: "completed",
      workingPrice: Math.round(
        (latestEstimate.totalMin + latestEstimate.totalMax) / 2
      ),
      estimateDetails: JSON.stringify(latestEstimate),
    };

    await submitLead("PAID", latestEstimate, formData);

    // Show payment completion screen
    if (paymentSection) {
      paymentSection.classList.add("hidden");
    }

    // Redirect to scheduler or show confirmation
    stepper.classList.add("hidden");
    showPaymentCompletion();
  } catch (error) {
    console.error("Error submitting form with payment:", error);
    alert("Failed to complete your request. Please try again.");
  }
}

// Show payment completion screen
function showPaymentCompletion() {
  const completionScreen = document.getElementById("paymentCompletionScreen");
  if (completionScreen) {
    completionScreen.classList.remove("hidden");
  }
}

function updatePlumbingConditionalUI() {
  const type = projectType.value;

  hideAllPlumbingSubsections();

  if (!isPlumbingProject(type)) return;

  plumbingBasicsSection.classList.remove("hidden");
  plumbingDetailsSection.classList.remove("hidden");
  showPlumbingSectionsByProject(type);
}

function calculatePlumbingEstimate(formData) {
  const leadMeta = classifyLead(formData);
  const adjustments = [];
  const internalAdjustments = [];

  internalAdjustments.push(`Service zone: ${leadMeta.serviceZone}`);
  internalAdjustments.push(`Distance band: ${leadMeta.distanceBand}`);
  internalAdjustments.push(`Lead priority: ${leadMeta.leadPriority}`);

  let minMaterials = 0;
  let maxMaterials = 0;
  let laborMin = 0;
  let laborMax = 0;
  let hours = 0;
  let materialsList = [];

  if (formData.projectType === "plumbing_replace_faucet") {
    const cfg = PRICING.plumbing.faucet;

    laborMin += cfg.baseLaborMin;
    laborMax += cfg.baseLaborMax;
    hours += cfg.hours;
    materialsList = cfg.materials;
    adjustments.push("Base faucet replacement");

    if (formData.plumbingHasFixture === "no") {
      minMaterials += cfg.fixtureAllowanceMin;
      maxMaterials += cfg.fixtureAllowanceMax;
      adjustments.push("Fixture allowance included");
    } else if (formData.plumbingHasFixture === "notSure") {
      minMaterials += cfg.fixtureAllowanceMin * 0.5;
      maxMaterials += cfg.fixtureAllowanceMax * 0.7;
      adjustments.push("Fixture allowance may be needed");
    }

    if (formData.plumbingShutoffCondition === "no") {
      laborMin += cfg.shutoffAddLaborMin;
      laborMax += cfg.shutoffAddLaborMax;
      minMaterials += cfg.shutoffAddMatMin;
      maxMaterials += cfg.shutoffAddMatMax;
      adjustments.push("Shutoff valves may need replacement");
    } else if (formData.plumbingShutoffCondition === "notSure") {
      laborMin += 30;
      laborMax += 60;
      minMaterials += 10;
      maxMaterials += 25;
      adjustments.push("Shutoff condition to be confirmed");
    }

    if (formData.plumbingSeverity === "active") {
      laborMin += cfg.activeIssueAddLaborMin;
      laborMax += cfg.activeIssueAddLaborMax;
      adjustments.push("Active plumbing issue adjustment");
    } else if (formData.plumbingSeverity === "damage") {
      laborMin += 60;
      laborMax += 120;
      adjustments.push("Possible surrounding damage adjustment");
    }

    const accessAdj = cfg.access[formData.plumbingAccessDifficulty] || cfg.access.notSure;
    laborMin += accessAdj.laborMin;
    laborMax += accessAdj.laborMax;
    if (formData.plumbingAccessDifficulty !== "easy") {
      adjustments.push("Access difficulty adjustment");
    }

    if (formData.plumbingVisibleDamage === "minor") {
      laborMin += 40;
      laborMax += 90;
      minMaterials += 15;
      maxMaterials += 40;
      adjustments.push("Minor visible damage");
    } else if (formData.plumbingVisibleDamage === "major") {
      laborMin += 100;
      laborMax += 220;
      minMaterials += 35;
      maxMaterials += 90;
      adjustments.push("Major visible damage");
    } else if (formData.plumbingVisibleDamage === "notSure") {
      laborMin += 50;
      laborMax += 110;
      minMaterials += 20;
      maxMaterials += 50;
      adjustments.push("Visible damage to be confirmed");
    }
  }

  else if (formData.projectType === "plumbing_replace_toilet") {
    const cfg = PRICING.plumbing.toilet;

    laborMin += cfg.baseLaborMin;
    laborMax += cfg.baseLaborMax;
    hours += cfg.hours;
    minMaterials += 25;
    maxMaterials += 60;
    materialsList = cfg.materials;
    adjustments.push("Base toilet replacement");

    if (formData.plumbingHasFixture === "no") {
      minMaterials += cfg.fixtureAllowanceMin;
      maxMaterials += cfg.fixtureAllowanceMax;
      adjustments.push("Toilet fixture allowance included");
    } else if (formData.plumbingHasFixture === "notSure") {
      minMaterials += 60;
      maxMaterials += 140;
      adjustments.push("Fixture allowance may be needed");
    }

    const floorAdj = cfg.floorIssue[formData.plumbingFloorIssue] || cfg.floorIssue.notSure;
    laborMin += floorAdj.laborMin;
    laborMax += floorAdj.laborMax;
    minMaterials += floorAdj.matMin;
    maxMaterials += floorAdj.matMax;
    if (formData.plumbingFloorIssue !== "no") {
      adjustments.push("Floor condition adjustment");
    }

    const looseAdj = cfg.loose[formData.plumbingLoose] || cfg.loose.notSure;
    laborMin += looseAdj.laborMin;
    laborMax += looseAdj.laborMax;
    if (formData.plumbingLoose !== "no") {
      adjustments.push("Loose / rocking toilet adjustment");
    }

    const accessAdj = cfg.access[formData.plumbingAccessDifficulty] || cfg.access.notSure;
    laborMin += accessAdj.laborMin;
    laborMax += accessAdj.laborMax;
    if (formData.plumbingAccessDifficulty !== "easy") {
      adjustments.push("Access difficulty adjustment");
    }

    if (formData.plumbingRepairScope === "includeRepairsIfNeeded") {
      laborMin += 60;
      laborMax += 140;
      minMaterials += 20;
      maxMaterials += 60;
      adjustments.push("Surrounding repairs allowed if needed");
    }

    if (formData.plumbingSeverity === "active") {
      laborMin += 80;
      laborMax += 160;
      adjustments.push("Active issue adjustment");
    } else if (formData.plumbingSeverity === "damage") {
      laborMin += 50;
      laborMax += 110;
      adjustments.push("Possible surrounding damage");
    }
  }

  else if (formData.projectType === "plumbing_replace_vanity") {
    const cfg = PRICING.plumbing.vanity;

    laborMin += cfg.baseLaborMin;
    laborMax += cfg.baseLaborMax;
    hours += cfg.hours;
    minMaterials += 35;
    maxMaterials += 90;
    materialsList = cfg.materials;
    adjustments.push("Base vanity replacement");

    if (formData.plumbingHasFixture === "no") {
      minMaterials += cfg.fixtureAllowanceMin;
      maxMaterials += cfg.fixtureAllowanceMax;
      adjustments.push("Vanity allowance included");
    } else if (formData.plumbingHasFixture === "notSure") {
      minMaterials += 80;
      maxMaterials += 180;
      adjustments.push("Vanity allowance may be needed");
    }

    const sameSizeAdj = cfg.sameSize[formData.plumbingSameSize] || cfg.sameSize.notSure;
    laborMin += sameSizeAdj.laborMin;
    laborMax += sameSizeAdj.laborMax;
    if (formData.plumbingSameSize !== "yes") {
      adjustments.push("Size / fit adjustment");
    }

    const touchAdj = cfg.touchup[formData.plumbingFinishTouchup] || cfg.touchup.notSure;
    laborMin += touchAdj.laborMin;
    laborMax += touchAdj.laborMax;
    if (formData.plumbingFinishTouchup !== "no") {
      adjustments.push("Finish touch-up adjustment");
    }

    const leakAdj = cfg.leakDamage[formData.plumbingLeakDamage] || cfg.leakDamage.notSure;
    laborMin += leakAdj.laborMin;
    laborMax += leakAdj.laborMax;
    minMaterials += leakAdj.matMin;
    maxMaterials += leakAdj.matMax;
    if (formData.plumbingLeakDamage !== "no") {
      adjustments.push("Leak / water damage adjustment");
    }

    if (formData.plumbingScope === "includeRelatedPlumbing") {
      laborMin += 70;
      laborMax += 150;
      minMaterials += 20;
      maxMaterials += 50;
      adjustments.push("Related plumbing components allowed");
    }

    if (formData.plumbingIncluded === "vanityTop") {
      laborMin += 40;
      laborMax += 80;
      adjustments.push("Vanity with top");
    } else if (formData.plumbingIncluded === "vanityTopFaucet") {
      laborMin += 90;
      laborMax += 180;
      adjustments.push("Vanity with top and faucet");
    }
  }

  else if (formData.projectType === "plumbing_replace_garbage_disposal") {
    const cfg = PRICING.plumbing.garbageDisposal;

    laborMin += cfg.baseLaborMin;
    laborMax += cfg.baseLaborMax;
    hours += cfg.hours;
    minMaterials += 20;
    maxMaterials += 50;
    materialsList = cfg.materials;
    adjustments.push("Base garbage disposal replacement");

    if (formData.plumbingHasFixture === "no") {
      minMaterials += cfg.fixtureAllowanceMin;
      maxMaterials += cfg.fixtureAllowanceMax;
      adjustments.push("Garbage disposal allowance included");
    } else if (formData.plumbingHasFixture === "notSure") {
      minMaterials += 60;
      maxMaterials += 140;
      adjustments.push("Fixture allowance may be needed");
    }

    const areaAdj = cfg.areaDamage[formData.plumbingAreaDamage] || cfg.areaDamage.notSure;
    laborMin += areaAdj.laborMin;
    laborMax += areaAdj.laborMax;
    if (formData.plumbingAreaDamage !== "no") {
      adjustments.push("Sink area damage adjustment");
    }

    const powerAdj = cfg.powerReady[formData.plumbingPowerReady] || cfg.powerReady.notSure;
    laborMin += powerAdj.laborMin;
    laborMax += powerAdj.laborMax;
    minMaterials += powerAdj.matMin;
    maxMaterials += powerAdj.matMax;
    if (formData.plumbingPowerReady !== "yes") {
      adjustments.push("Power readiness adjustment");
    }

    const accessAdj = cfg.access[formData.plumbingAccessDifficulty] || cfg.access.notSure;
    laborMin += accessAdj.laborMin;
    laborMax += accessAdj.laborMax;
    if (formData.plumbingAccessDifficulty !== "easy") {
      adjustments.push("Access difficulty adjustment");
    }

    if (formData.plumbingScope === "includeSinkAreaIssuesIfNeeded") {
      laborMin += 60;
      laborMax += 130;
      minMaterials += 15;
      maxMaterials += 40;
      adjustments.push("Sink-area issues allowed if needed");
    }
  }

  else if (formData.projectType === "plumbing_replace_shutoff_valves") {
    const cfg = PRICING.plumbing.shutoff;
    const valveCount = formData.plumbingValveCount === "4plus" ? 4 : parseInt(formData.plumbingValveCount || "1", 10);

    let laborMultiplier = 1;
    if (valveCount === 2) {
      laborMultiplier = 1 + cfg.secondValveMultiplier;
    } else if (valveCount >= 3) {
      laborMultiplier = 1 + cfg.secondValveMultiplier + ((valveCount - 2) * cfg.extraValveMultiplier);
    }

    laborMin += cfg.baseOneLaborMin * laborMultiplier;
    laborMax += cfg.baseOneLaborMax * laborMultiplier;
    hours += 1.5 * laborMultiplier;
    minMaterials += cfg.baseMatMin * valveCount;
    maxMaterials += cfg.baseMatMax * valveCount;
    materialsList = cfg.materials;
    adjustments.push(`Base shutoff valve replacement for ${valveCount} valve(s)`);

    const accessAdj = cfg.access[formData.plumbingValveAccess] || cfg.access.moderate;
    laborMin += accessAdj.laborMin;
    laborMax += accessAdj.laborMax;
    if (formData.plumbingValveAccess !== "easy") {
      adjustments.push("Valve access adjustment");
    }

    const condAdj = cfg.condition[formData.plumbingValveCondition] || cfg.condition.notSure;
    laborMin += condAdj.laborMin;
    laborMax += condAdj.laborMax;
    if (formData.plumbingValveCondition !== "normal") {
      adjustments.push("Valve condition adjustment");
    }

    if (formData.plumbingValvePartOfOtherProject === "yes") {
      laborMin -= 40;
      laborMax -= 40;
      adjustments.push("Bundled with another plumbing project");
    }

    if (formData.plumbingScope === "includeNearbyIssuesIfNeeded") {
      laborMin += 50;
      laborMax += 120;
      minMaterials += 10;
      maxMaterials += 35;
      adjustments.push("Nearby plumbing issues allowed if needed");
    }
  }

  else if (formData.projectType === "plumbing_fix_active_leak") {
    const cfg = PRICING.plumbing.leak;
    const accessType = (cfg.access[formData.plumbingAccessDifficulty] || cfg.access.notSure).type;

    if (accessType === "accessible") {
      laborMin += cfg.accessibleLaborMin;
      laborMax += cfg.accessibleLaborMax;
      minMaterials += cfg.accessibleMatMin;
      maxMaterials += cfg.accessibleMatMax;
      hours += cfg.accessibleHours;
      adjustments.push("Accessible leak repair base");
    } else {
      laborMin += cfg.behindWallLaborMin;
      laborMax += cfg.behindWallLaborMax;
      minMaterials += cfg.behindWallMatMin;
      maxMaterials += cfg.behindWallMatMax;
      hours += cfg.behindWallHours;
      adjustments.push("Concealed / behind-wall leak base");
    }

    const accessAdj = cfg.access[formData.plumbingAccessDifficulty] || cfg.access.notSure;
    laborMin += accessAdj.laborMin || 0;
    laborMax += accessAdj.laborMax || 0;

    const durationAdj = cfg.duration[formData.plumbingLeakDuration] || cfg.duration.notSure;
    laborMin += durationAdj.laborMin;
    laborMax += durationAdj.laborMax;
    if (formData.plumbingLeakDuration !== "today") {
      adjustments.push("Leak duration adjustment");
    }

    const surfAdj = cfg.affectedSurfaces[formData.plumbingAffectedSurfaces] || cfg.affectedSurfaces.notSure;
    laborMin += surfAdj.laborMin;
    laborMax += surfAdj.laborMax;
    if (formData.plumbingAffectedSurfaces !== "no") {
      adjustments.push("Affected surfaces adjustment");
    }

    const dmgAdj = cfg.damageSigns[formData.plumbingDamageSigns] || cfg.damageSigns.notSure;
    laborMin += dmgAdj.laborMin;
    laborMax += dmgAdj.laborMax;
    if (formData.plumbingDamageSigns !== "no") {
      adjustments.push("Damage signs adjustment");
    }

    const openAdj = cfg.openAccessWork[formData.plumbingOpenAccessWork] || cfg.openAccessWork.notSure;
    laborMin += openAdj.laborMin;
    laborMax += openAdj.laborMax;
    if (formData.plumbingOpenAccessWork !== "no") {
      adjustments.push("Opening / access work allowed");
    }

    const repairAdj = cfg.repairAfterStop[formData.plumbingRepairAfterStop] || cfg.repairAfterStop.notSure;
    laborMin += repairAdj.laborMin;
    laborMax += repairAdj.laborMax;
    if (formData.plumbingRepairAfterStop !== "no") {
      adjustments.push("Post-leak repairs allowed");
    }
  }

  else if (formData.projectType === "plumbing_install_new_fixture") {
    const cfg = PRICING.plumbing.newFixture;

    laborMin += cfg.baseLaborMin;
    laborMax += cfg.baseLaborMax;
    hours += cfg.hours;
    minMaterials += 30;
    maxMaterials += 80;
    materialsList = cfg.materials;
    adjustments.push("Base new plumbing fixture installation");

    if (formData.plumbingHasFixture === "no") {
      minMaterials += cfg.fixtureAllowanceMin;
      maxMaterials += cfg.fixtureAllowanceMax;
      adjustments.push("Fixture allowance included");
    } else if (formData.plumbingHasFixture === "notSure") {
      minMaterials += 40;
      maxMaterials += 100;
      adjustments.push("Fixture allowance may be needed");
    }

    const supplyAdj = cfg.supplyAvailable[formData.plumbingSupplyAvailable] || cfg.supplyAvailable.notSure;
    laborMin += supplyAdj.laborMin;
    laborMax += supplyAdj.laborMax;
    if (formData.plumbingSupplyAvailable !== "yes") {
      adjustments.push("Water supply adjustment");
    }

    const drainAdj = cfg.drainAvailable[formData.plumbingDrainAvailable] || cfg.drainAvailable.notSure;
    laborMin += drainAdj.laborMin;
    laborMax += drainAdj.laborMax;
    if (formData.plumbingDrainAvailable !== "yes") {
      adjustments.push("Drain line adjustment");
    }

    const openingAdj = cfg.openingNeeded[formData.plumbingOpeningNeeded] || cfg.openingNeeded.notSure;
    laborMin += openingAdj.laborMin;
    laborMax += openingAdj.laborMax;
    if (formData.plumbingOpeningNeeded !== "no") {
      adjustments.push("Opening work adjustment");
    }

    const accessAdj = cfg.access[formData.plumbingAccessDifficulty] || cfg.access.notSure;
    laborMin += accessAdj.laborMin;
    laborMax += accessAdj.laborMax;
    if (formData.plumbingAccessDifficulty !== "easy") {
      adjustments.push("Access difficulty adjustment");
    }

    const repairAdj = cfg.repairScope[formData.plumbingRepairScope] || cfg.repairScope.installOnly;
    laborMin += repairAdj.laborMin;
    laborMax += repairAdj.laborMax;
    if (formData.plumbingRepairScope === "includeFinishRepairsIfNeeded") {
      adjustments.push("Finish repairs allowed if needed");
    }

    if (formData.plumbingSeverity === "openingLikelyNeeded") {
      laborMin += 70;
      laborMax += 140;
      adjustments.push("Likely opening / layout complexity");
    } else if (formData.plumbingSeverity === "somePlumbingNeeded") {
      laborMin += 50;
      laborMax += 110;
      adjustments.push("Some new plumbing work needed");
    }

    if (formData.plumbingFixtureType) {
      adjustments.push(`Fixture type: ${formData.plumbingFixtureType}`);
    }
  }

  minMaterials = Math.max(0, minMaterials);
  maxMaterials = Math.max(minMaterials, maxMaterials);
  laborMin = Math.max(0, laborMin);
  laborMax = Math.max(laborMin, laborMax);

  const totalMin = minMaterials + laborMin;
  const totalMax = maxMaterials + laborMax;

  return applyMarketAndPropertyAdjustments(
    {
      hours: Math.round(hours * 10) / 10,
      minMaterials,
      maxMaterials,
      laborMin,
      laborMax,
      totalMin,
      totalMax,
      materialsList,
      adjustments,
      internalAdjustments,
      leadMeta
    },
    formData,
    leadMeta
  );
}
startNewFromHot.addEventListener("click", resetExperience);
startNewFromDone.addEventListener("click", resetExperience);

const startNewFromPayment = document.getElementById("startNewFromPayment");
if (startNewFromPayment) {
  startNewFromPayment.addEventListener("click", resetExperience);
}

updateDrywallContextUI();
updateLightingConditionalFields();
updatePaintConditionalFields();
updatePlumbingConditionalUI();
updatePropertyTypeMessage();
hideAllEndStates();
showStep(1, { scrollMode: "none" });
