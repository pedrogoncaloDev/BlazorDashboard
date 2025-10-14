using System;
using Microsoft.AspNetCore.Components;

public class ThemeService
{
    public bool IsDarkMode { get; private set; } = false;
    public event Action? OnThemeChanged;

    public void ToggleTheme()
    {
        IsDarkMode = !IsDarkMode;
        OnThemeChanged?.Invoke();
    }

    public void SetTheme(bool isDarkMode)
    {
        IsDarkMode = isDarkMode;
        OnThemeChanged?.Invoke();
    }
}