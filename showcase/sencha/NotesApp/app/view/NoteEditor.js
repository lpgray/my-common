Ext.define("NotesApp.view.NoteEditor", {
    extend: "Ext.form.Panel",
    requires: "Ext.form.FieldSet",
    alias: "widget.noteeditorview",
    config:{
      scrollable:'vertical',
      items : [
        {
          xtype : 'toolbar',
          docked : 'top',
          title : 'Edit Note',
          items : [
            {
              xtype : 'button',
              ui : 'back',
              text : 'Back',
              itemId : 'btnBack'
            },
            {
              xtype : 'spacer'
            },
            {
              xtype : 'button',
              ui : 'action',
              text : 'Save',
              itemId : 'btnSave'
            },
          ]
        },
        {
          xtype : 'toolbar',
          docked : 'bottom',
          items : [
            {
              xtype : 'button',
              iconCls : 'trash',
              iconMask : true,
              itemId : 'btnDel'
            }
          ]
        },
        {
          xtype : 'fieldset',
          items : [
            {
              xtype : 'textfield',
              name : 'title',
              label : 'Title',
              required : true  
            },
            {
              xtype : 'textareafield',
              name : 'narrative',
              label : 'Narrative'
            }
          ]
        }
      ],
      listeners : [
        {
          delegate : '#btnSave',
          event : 'tap',
          fn : 'onBtnSaveTap'
        },
        {
          delegate : '#btnBack',
          event : 'tap',
          fn : 'onBtnBackTap'
        },
        {
          delegate : '#btnDel',
          event : 'tap',
          fn : 'onBtnDelTap'
        },
      ]
    },
    // initialize: function () {
        // this.callParent(arguments);
// 
        // var backButton = {
            // xtype: "button",
            // ui: "back",
            // text: "Home",
            // handler : this.onBtnBackTap,
            // scope: this
        // };
// 
        // var saveButton = {
            // xtype: "button",
            // ui: "action",
            // text: "Save",
            // handler : this.onBtnSaveTap,
            // scope: this // 这个不要漏掉
        // };
// 
        // var topToolbar = {
            // xtype: "toolbar",
            // docked: "top",
            // title: "Edit Note",
            // items: [
                // backButton,
                // { xtype: "spacer" },
                // saveButton
            // ]
        // };
// 
        // var deleteButton = {
            // xtype: "button",
            // iconCls: "trash",
            // iconMask: true,
            // handler : this.onBtnDelTap,
            // scope: this
        // };
// 
        // var bottomToolbar = {
            // xtype: "toolbar",
            // docked: "bottom",
            // items: [
                // deleteButton
            // ]
        // };
// 
        // var noteTitleEditor = {
            // xtype: 'textfield',
            // name: 'title',
            // label: 'Title',
            // required: true
        // };
// 
        // var noteNarrativeEditor = {
            // xtype: 'textareafield',
            // name: 'narrative',
            // label: 'Narrative'
        // };
// 
        // this.add([
            // topToolbar,
            // { xtype: "fieldset",
                // items: [noteTitleEditor, noteNarrativeEditor]
            // },
            // bottomToolbar
        // ]);
    // },
    
    onBtnSaveTap : function(){
      this.fireEvent("saveNoteCommand", this);
    },
    
    onBtnBackTap : function(){
      this.fireEvent("backCommand", this);
    },
    
    onBtnDelTap : function(){
      this.fireEvent("delCommand", this);
    }
});