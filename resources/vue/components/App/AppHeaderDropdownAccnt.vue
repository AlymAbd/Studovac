<template>
  <CDropdown variant="nav-item">
    <CDropdownToggle placement="bottom-end" class="py-0" :caret="false">
      <CAvatar :src="avatar" size="md" />
    </CDropdownToggle>
    <CDropdownMenu class="pt-0">
      <CDropdownHeader component="h6" class="bg-light fw-semibold py-2">
        Аккаунт
      </CDropdownHeader>
      <!-- <CDropdownDivider /> -->
      <!-- <CDropdownItem> <CIcon icon="cil-bell" /> Смены </CDropdownItem> -->
      <!-- <CDropdownItem> <CIcon icon="cil-task" /> Мои задачи </CDropdownItem> -->
      <!-- <CDropdownItem> -->
      <!-- <CIcon icon="cil-comment-square" /> Мои комментарии -->
      <!-- </CDropdownItem> -->
      <!-- <CDropdownDivider /> -->
      <CDropdownItem @click="logout">
        <CIcon icon="cil-lock-locked" /> Выйти
      </CDropdownItem>
    </CDropdownMenu>
  </CDropdown>
</template>

<script>
import avatar from '@/assets/images/avatars/default.png'
export default {
  name: 'AppHeaderDropdownAccnt',
  setup() {
    return {
      avatar: avatar,
      itemsCount: 42,
    }
  },
  methods: {
    logout() {
      this.$store
        .dispatch('auth/logout')
        .then(() => {
          this.$router.push({ name: 'Home' })
        })
        .catch(() => {
          this.$router.push({ name: 'Home' })
        })
    },
  },
}
</script>
