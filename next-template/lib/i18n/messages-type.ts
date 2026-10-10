export type UserListColumnKey =
  | "id"
  | "firstName"
  | "lastName"
  | "email"
  | "phone"
  | "username"
  | "role"
  | "status"
  | "department"
  | "city"
  | "country"
  | "company"
  | "title"
  | "joined"
  | "lastSeen"
  | "language"
  | "timezone"
  | "plan"
  | "score"
  | "orders"
  | "balance"
  | "verified"
  | "manager"
  | "team"
  | "note"

export type Messages = {
  auth: {
    defaults: { email: string; password: string }
    login: {
      title: string
      description: string
      email: string
      password: string
      showPassword: string
      hidePassword: string
      remember: string
      submit: string
      forgot: string
    }
    forgot: {
      title: string
      description: string
      sent: string
      submit: string
      back: string
    }
  }
  layout: {
    nav: {
      dashboard: string
      insights: string
      aiChat: string
      users: string
      profile: string
      usersCard: string
      usersList: string
      usersCreate: string
      usersEdit: string
      blog: string
      blogPosts: string
      blogCreate: string
      blogEdit: string
      tickets: string
      ticketsInbox: string
      ticketsCreate: string
    }
    settings: {
      side: string
      top: string
      right: string
      footer: string
      dark: string
      density: string
      family: string
      size: string
    }
  }
  users: {
    list: {
      addNew: string
      formSubmit: string
      excel: string
      search: string
      empty: string
      confirmed: string
      notConfirmed: string
      selectPlaceholder: string
      kpiTotal: string
      kpiActive: string
      kpiPending: string
      kpiPassive: string
      kpiAdmins: string
      kpiBadgeTotal: string
      kpiBadgeActive: string
      kpiBadgePending: string
      kpiBadgePassive: string
      kpiBadgeAdmins: string
      edit: string
      delete: string
      actions: string
      actionsMenu: string
      toast: { deleting: string; deleted: string; deleteFailed: string }
      name: string
      selectAll: string
      selectRow: string
      clearFilters: string
      columnMenu: {
        sortAsc: string
        sortDesc: string
        clearSort: string
        search: string
        selectAll: string
        clearFilter: string
        empty: string
      }
      columns: Record<UserListColumnKey, string>
    }
    card: {
      title: string
      search: string
      roleAll: string
      statusAll: string
      departmentAll: string
      copy: string
      copied: string
      deleteConfirmTitle: string
      deleteConfirmHint: string
      yes: string
      no: string
    }
    create: {
      account: string
      tabs: { profile: string; billing: string; security: string; notifications: string }
      picture: { title: string; hint: string; action: string; remove: string; initials: string }
      form: {
        title: string
        name: string
        nameHint: string
        kicker: string
        pageTitle: string
        pageHint: string
        email: string
        company: string
        country: string
        phone: string
        birthday: string
        submit: string
        verified: string
        emailHint: string
        phoneHint: string
        noteHint: string
        unsaved: string
        reset: string
        save: string
      }
      notifications: {
        kicker: string
        pageTitle: string
        muteTitle: string
        muteHint: string
        muteDurations: Record<"1h" | "2h" | "4h" | "8h", string>
        matrixTitle: string
        enableAll: string
        disableAll: string
        colType: string
        colEmail: string
        colInApp: string
        colPush: string
        rows: { id: string; title: string }[]
        requiredBadge: string
        digestTitle: string
        digestInstantTitle: string
        digestInstantHint: string
        digestDailyTitle: string
        digestDailyHint: string
        digestWeeklyTitle: string
        digestWeeklyHint: string
        quietTitle: string
        quietHint: string
        reset: string
        save: string
      }
      security: {
        kicker: string
        pageTitle: string
        passwordTitle: string
        current: string
        next: string
        confirm: string
        required: string
        strength: string
        strengthWeak: string
        strengthFair: string
        strengthStrong: string
        reqTitle: string
        reqMin: string
        reqUpper: string
        reqNumber: string
        reqSpecial: string
        lastChanged: string
        cancel: string
        save: string
        showPassword: string
        hidePassword: string
        twoFactorTitle: string
        twoFactorHint: string
        twoFactorOn: string
        backupCodes: string
        pauseTitle: string
        pauseHint: string
        pause: string
        deleteTitle: string
        deleteHint: string
        delete: string
      }
      billing: {
        kicker: string
        pageTitle: string
        pageHint: string
        summaries: { label: string; action: string }[]
        methodsTitle: string
        addMethod: string
        makeDefault: string
        edit: string
        defaultBadge: string
        historyTitle: string
        columns: [string, string, string, string]
        statusLabel: { pending: string; paid: string; cancelled: string }
        addCard: {
          title: string
          hint: string
          number: string
          numberHint: string
          name: string
          nameHint: string
          expiry: string
          cvv: string
          nickname: string
          nicknamePlaceholder: string
          defaultTitle: string
          defaultHint: string
          saveTitle: string
          saveHint: string
          cancel: string
          submit: string
          previewLabel: string
          previewHolder: string
          previewExpiry: string
          previewCvv: string
          saving: string
          saved: string
          saveFailed: string
          numberError: string
          nameError: string
          expiryError: string
          cvvError: string
        }
      }
    }
  }
  aiChat: {
    search: string
    newChat: string
    placeholder: string
    send: string
    attach: string
    greeting: string
    greetingHint: string
    suggestions: { id: string; title: string; detail: string }[]
  }
}
