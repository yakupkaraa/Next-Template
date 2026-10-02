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
    }
    create: {
      account: string
      tabs: { profile: string; billing: string; security: string; notifications: string }
      picture: { title: string; hint: string; action: string; initials: string }
      form: {
        title: string
        name: string
        nameHint: string
        email: string
        company: string
        country: string
        phone: string
        birthday: string
        submit: string
      }
      notifications: {
        title: string
        hint: string
        items: { id: string; title: string; detail: string; enabled: boolean }[]
      }
      security: {
        passwordTitle: string
        current: string
        next: string
        confirm: string
        save: string
        accountTitle: string
        pauseTitle: string
        pauseHint: string
        pause: string
        deleteTitle: string
        deleteHint: string
        delete: string
      }
      billing: {
        summaries: { label: string; action: string }[]
        methodsTitle: string
        addMethod: string
        makeDefault: string
        edit: string
        defaultBadge: string
        historyTitle: string
        columns: [string, string, string, string]
        statusLabel: { pending: string; paid: string; cancelled: string }
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
