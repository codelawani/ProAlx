# How to setup WakaTime for vim
> *The following instructions assume you have* `vim` *installed. If u do not you can install it with:*
> 
> `sudo apt-get install vim`

1. Copy and paste this entire script into your bash terminal and **Enter**. The script will install [Wakatime](https://wakatime.com) and prompt you for your API key.
    
    ```bash
    sudo apt-get update && \
    sudo apt-get install -y curl && \ 
    # Download and run wakatime installation script(vim)
    curl -fsSL https://raw.githubusercontent.com/angelofdeity/wakatime/main/install_wakatime_vim -o install_wakatime_vim && \
    chmod +x install_wakatime_vim && \
    sudo ./install_wakatime_vim && \
    rm install_wakatime_vim
    ```
    
    ![](https://cdn.hashnode.com/res/hashnode/image/upload/v1686606898488/b3aa604c-fbc1-411c-bfcf-05fc5ec63140.png )
    
    Always be cautious when running scripts from the internet. You can review the script [here](https://raw.githubusercontent.com/angelofdeity/wakatime/main/install_wakatime_vim).
    
2. If the plugin manager isn't already installed, you will see this prompt. It may take about 2 to 3 mins for it to install. So pls hang tight 😄
    
    ![](https://cdn.hashnode.com/res/hashnode/image/upload/v1686591940045/8d8d7ef5-9b10-4a0e-83b9-dff22f39bf0a.png )
    
    Upon successful installation. `vim` is automatically started and you are prompted for your Wakatime API key. You can get your API key [here](https://wakatime.com/settings/api-key) if you are logged in
    
    <details data-node-type="hn-details-summary"><summary>What is an API key?</summary><div data-type="detailsContent"><em>Think of the API key as a special code that allows Vim and WakaTime to communicate with each other. It's like a secret password that Vim uses to securely connect to WakaTime and send information about your coding activity. By entering your API key, you're granting Vim permission to share your coding data with WakaTime, so you can track and analyze your coding habits. </em><a target="_blank" rel="noopener noreferrer nofollow" href="https://www.google.com/search?q=api+key" style="pointer-events: none"><em>Learn more</em></a><em> </em>:)</div></details>
    
    *Note: If you are not logged in, you will be prompted to log in or sign up and then redirected to a page containing your API key. You can also get your API key from your email after signing up.*
    
    Otherwise, navigate to your Wakatime [settings](https://wakatime.com/settings/account) as shown below
    
    ![](https://cdn.hashnode.com/res/hashnode/image/upload/v1686602923413/9fd412d2-5c85-4b09-a002-082eda8fbb9b.png )
    
3. You can now paste your API key and **Enter**.
    
    > *You may not be prompted if you have already installed wakatime and have a* `.wakatime.cfg` *file in your home directory. So it means that you are already connected.*
    
    ![](https://cdn.hashnode.com/res/hashnode/image/upload/v1686595422078/2457c06e-1dfb-4f95-b20a-beaca5438d04.png )
    
4. Success!! 🎉🎉
    
    ![](https://cdn.hashnode.com/res/hashnode/image/upload/v1686602591422/d31c8936-ce9b-4fa2-b77d-1f986cca5b3c.png )
    
5. Now figure out how to quit `vim` 😁 or restart your pc 🙂
    
    ![](https://cdn.hashnode.com/res/hashnode/image/upload/v1686604422673/2ffadf3c-f4a7-43c8-afad-6809a3855350.png )
