// 画面切り替え機能
function showScreen(screenId) {
    // 全ての画面を非表示にする
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => {
        screen.classList.remove('active');
    });

    // 指定された画面を表示する
    let targetScreen = null;
    if (typeof screenId === 'number' || (/^\d+$/.test(screenId))) {
        targetScreen = document.getElementById(`screen${screenId}`);
    } else {
        targetScreen = document.getElementById(`screen_${screenId}`);
    }
    if (targetScreen) {
        targetScreen.classList.add('active');
        // 画面の一番上にスクロール
        window.scrollTo(0, 0);
    }

    // シニア用マッチング一覧描画
    if (screenId === 'senior_matching' || screenId === 'senior_home') {
        renderSeniorMatchingList();
    }
    // シニア用報酬一覧描画
    if (screenId === 'senior_payment') {
        renderSeniorPaymentList();
    }
}

// シニア用マッチング一覧のダミーデータ描画
function renderSeniorMatchingList() {
    const list = document.getElementById('senior-matching-list');
    if (!list) return;
    // ダミーデータ
    const data = [
        {
            parent: '山田 太郎',
            date: '2025年1月20日 10:00-13:00',
            childAge: '2-3歳',
            request: 'アレルギー対応希望',
            status: '承認待ち'
        },
        {
            parent: '鈴木 花子',
            date: '2025年1月22日 15:00-18:00',
            childAge: '4-6歳',
            request: '特になし',
            status: '確定'
        }
    ];
    list.innerHTML = data.map(item => `
        <div class="matching-card">
            <div class="matching-info">
                <div><strong>親御様:</strong> ${item.parent}</div>
                <div><strong>日時:</strong> ${item.date}</div>
                <div><strong>お子様年齢:</strong> ${item.childAge}</div>
                <div><strong>要望:</strong> ${item.request}</div>
                <div><strong>状態:</strong> ${item.status}</div>
            </div>
        </div>
    `).join('');
}

// シニア用報酬一覧のダミーデータ描画
function renderSeniorPaymentList() {
    const list = document.getElementById('senior-payment-list');
    if (!list) return;
    // ダミーデータ
    const data = [
        {
            date: '2025年1月15日',
            amount: '3,000円',
            detail: '山田 太郎様 3時間'
        },
        {
            date: '2025年1月22日',
            amount: '4,000円',
            detail: '鈴木 花子様 4時間'
        }
    ];
    list.innerHTML = data.map(item => `
        <div class="payment-card">
            <div class="payment-info">
                <div><strong>日付:</strong> ${item.date}</div>
                <div><strong>金額:</strong> ${item.amount}</div>
                <div><strong>内容:</strong> ${item.detail}</div>
            </div>
        </div>
    `).join('');
}

// フォームバリデーション
function validateForm(formId) {
    const form = document.getElementById(formId);
    const inputs = form.querySelectorAll('input[required], select[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.style.borderColor = '#e74c3c';
            isValid = false;
        } else {
            input.style.borderColor = '#e0d5d0';
        }
    });

    return isValid;
}

// 入力フィールドのリアルタイムバリデーション
document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('input, select, textarea');

    inputs.forEach(input => {
        input.addEventListener('input', function() {
            if (this.value.trim()) {
                this.style.borderColor = '#b792a3';
            } else {
                this.style.borderColor = '#e0d5d0';
            }
        });

        input.addEventListener('focus', function() {
            this.style.borderColor = '#b792a3';
        });

        input.addEventListener('blur', function() {
            if (!this.value.trim()) {
                this.style.borderColor = '#e0d5d0';
            }
        });
    });
});

// チェックボックスの動作
document.addEventListener('DOMContentLoaded', function() {
    const checkboxItems = document.querySelectorAll('.checkbox-item');

    checkboxItems.forEach(item => {
        const checkbox = item.querySelector('input[type="checkbox"]');

        item.addEventListener('click', function(e) {
            if (e.target !== checkbox) {
                checkbox.checked = !checkbox.checked;
                updateCheckboxStyle(item, checkbox.checked);
            }
        });

        checkbox.addEventListener('change', function() {
            updateCheckboxStyle(item, this.checked);
        });
    });
});

function updateCheckboxStyle(item, isChecked) {
    if (isChecked) {
        item.style.borderColor = '#b792a3';
        item.style.backgroundColor = 'rgba(183, 146, 163, 0.1)';
    } else {
        item.style.borderColor = '#e0d5d0';
        item.style.backgroundColor = 'transparent';
    }
}

// ラジオボタンの動作
document.addEventListener('DOMContentLoaded', function() {
    const paymentOptions = document.querySelectorAll('.payment-option');

    paymentOptions.forEach(option => {
        const radio = option.querySelector('input[type="radio"]');

        option.addEventListener('click', function(e) {
            if (e.target !== radio) {
                radio.checked = true;
                updatePaymentOptions();
            }
        });

        radio.addEventListener('change', function() {
            updatePaymentOptions();
        });
    });
});

function updatePaymentOptions() {
    const paymentOptions = document.querySelectorAll('.payment-option');

    paymentOptions.forEach(option => {
        const radio = option.querySelector('input[type="radio"]');
        if (radio.checked) {
            option.style.borderColor = '#b792a3';
            option.style.backgroundColor = 'rgba(183, 146, 163, 0.1)';
        } else {
            option.style.borderColor = '#e0d5d0';
            option.style.backgroundColor = 'transparent';
        }
    });

    // クレジットカード情報の表示/非表示
    const cardInfo = document.querySelector('.card-info');
    const creditRadio = document.querySelector('input[value="credit"]');

    if (cardInfo && creditRadio) {
        if (creditRadio.checked) {
            cardInfo.style.display = 'block';
        } else {
            cardInfo.style.display = 'none';
        }
    }
}

// ボタンのクリック効果
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.primary-btn, .secondary-btn, .user-btn');

    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // ローディング状態を追加
            this.classList.add('loading');

            // 少し遅延してローディング状態を解除
            setTimeout(() => {
                this.classList.remove('loading');
            }, 500);
        });
    });
});

// 日時入力のデフォルト値設定
document.addEventListener('DOMContentLoaded', function() {
    const datetimeInput = document.getElementById('datetime');
    if (datetimeInput) {
        // 現在時刻から1時間後をデフォルトに設定
        const now = new Date();
        now.setHours(now.getHours() + 1);
        const formattedDate = now.toISOString().slice(0, 16);
        datetimeInput.value = formattedDate;
    }
});

// スムーズスクロール
function smoothScrollTo(element) {
    element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

// エラーハンドリング
function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: #e74c3c;
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        z-index: 1000;
        animation: slideDown 0.3s ease-out;
    `;

    document.body.appendChild(errorDiv);

    setTimeout(() => {
        errorDiv.remove();
    }, 3000);
}

// 成功メッセージ
function showSuccess(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = message;
    successDiv.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: #27ae60;
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        z-index: 1000;
        animation: slideDown 0.3s ease-out;
    `;

    document.body.appendChild(successDiv);

    setTimeout(() => {
        successDiv.remove();
    }, 3000);
}

// アニメーション用CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes slideDown {
        from {
            transform: translateX(-50%) translateY(-100%);
            opacity: 0;
        }
        to {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

// フォーム送信時の処理
function handleFormSubmit(event, nextScreen) {
    event.preventDefault();

    // バリデーション（簡単な例）
    const currentScreen = event.target.closest('.screen');
    const requiredInputs = currentScreen.querySelectorAll('input[required], select[required]');
    let isValid = true;

    requiredInputs.forEach(input => {
        if (!input.value.trim()) {
            input.style.borderColor = '#e74c3c';
            isValid = false;
        }
    });

    if (isValid) {
        showSuccess('情報が正常に送信されました');
        setTimeout(() => {
            showScreen(nextScreen);
        }, 1000);
    } else {
        showError('必須項目を入力してください');
    }
}

// タッチデバイス対応
document.addEventListener('DOMContentLoaded', function() {
    // タッチデバイスでのホバー効果の調整
    if ('ontouchstart' in window) {
        const hoverElements = document.querySelectorAll('.user-btn, .checkbox-item, .payment-option');

        hoverElements.forEach(element => {
            element.addEventListener('touchstart', function() {
                this.classList.add('touch-active');
            });

            element.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.classList.remove('touch-active');
                }, 150);
            });
        });
    }
});

// アクセシビリティ対応
document.addEventListener('DOMContentLoaded', function() {
    // キーボードナビゲーション
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            const focusedElement = document.activeElement;

            if (focusedElement.classList.contains('user-btn') ||
                focusedElement.classList.contains('checkbox-item') ||
                focusedElement.classList.contains('payment-option')) {
                e.preventDefault();
                focusedElement.click();
            }
        }
    });

    // フォーカス可能な要素にtabindex追加
    const interactiveElements = document.querySelectorAll('.user-btn, .checkbox-item, .payment-option');
    interactiveElements.forEach(element => {
        if (!element.hasAttribute('tabindex')) {
            element.setAttribute('tabindex', '0');
        }
    });
});
